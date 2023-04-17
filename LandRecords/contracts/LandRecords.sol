// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract LandManagementSystem {
    struct Location {
        string state;
        string district;
        string village;
        string tehsil;
        string pincode;
        string latitude;
        string longitude;
        uint256 area;
    }
    struct LandRecord {
        uint256 id;
        address owner;
        string name;
        uint256 mutationNumber;
        Location location;
        string recordHash;
        uint256 price;
        bool isForSale;
        bool isVerified;
    }
    struct UserData {
        string name;
        string dateOfBirth;
        string aadharNumber;
        string profilePhoto;
        string officialDocument;
        bool isVerified;
        address my;
    }

    mapping(address => UserData) private userDataMap;
    mapping(string => bool) private AadharNumber;
    mapping(string => UserData) private aadToUser;
    mapping(string => uint256[]) private landIdsMap;
    mapping(uint256 => LandRecord) private landRecords;
    mapping(address => bool) private governmentOfficials;
    mapping(uint256 => bool) private _mutationNumbers;

    uint256 public totalLands = 0;

    address private admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyVerifiedUser() {
        require(userDataMap[msg.sender].isVerified, "User not verified");
        _;
    }

    function addUser(
        string memory _name,
        string memory _dateOfBirth,
        string memory _aadharNumber,
        string memory _profilePhoto,
        string memory _officialDocument
    ) public {
        require(msg.sender != address(0), "Invalid user address");
        require(AadharNumber[_aadharNumber] == false, "User already exists");
        userDataMap[msg.sender] = UserData({
            name: _name,
            dateOfBirth: _dateOfBirth,
            aadharNumber: _aadharNumber,
            profilePhoto: _profilePhoto,
            officialDocument: _officialDocument,
            isVerified: false,
            my: msg.sender
        });
        AadharNumber[_aadharNumber] = true;
        aadToUser[_aadharNumber] = userDataMap[msg.sender];
    }

    function getOwnProfile()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            bool,
            address,
            uint256[] memory
        )
    {
        require(msg.sender == address(0), "Invalid user address");
        UserData memory user = userDataMap[msg.sender];

        return (
            user.name,
            user.dateOfBirth,
            user.profilePhoto,
            user.officialDocument,
            user.isVerified,
            user.my,
            landIdsMap[user.aadharNumber]
        );
    }

    function getUserProfile(
        string memory _aadharNumber
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            bool,
            address,
            uint256[] memory
        )
    {
        UserData memory user = aadToUser[_aadharNumber];

        return (
            user.name,
            user.dateOfBirth,
            user.profilePhoto,
            user.officialDocument,
            user.isVerified,
            user.my,
            landIdsMap[user.aadharNumber]
        );
    }

    function removeLandFromUser(address user, uint256 landId) internal {
        uint256[] storage userLandIds = landIdsMap[
            userDataMap[user].aadharNumber
        ];
        for (uint i = 0; i < userLandIds.length; i++) {
            if (userLandIds[i] == landId) {
                userLandIds[i] = userLandIds[userLandIds.length - 1];
                userLandIds.pop();
                return;
            }
        }
    }

    event LandForSale(uint256 indexed id, address indexed owner, uint256 price);
    event LandSold(uint256 indexed id, address indexed buyer, uint256 price);

    event LogDebug(string message);

    function isAdmin() public returns (bool) {
        bool result = msg.sender == admin;
        if (result) {
            emit LogDebug("isAdmin is true");
        } else {
            emit LogDebug("isAdmin is false");
        }
        return result;
    }

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    modifier onlyOwner(uint256 _id) {
        require(
            msg.sender == landRecords[_id].owner,
            "You are not the owner of the land"
        );
        _;
    }
    modifier onlyGovernmentOfficial() {
        require(
            governmentOfficials[msg.sender],
            "You are not a government official."
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "You are not authorized to perform this action."
        );
        _;
    }

    function addLandRecord(
        string memory _name,
        uint256 _mutationNumber,
        Location memory _location,
        string memory _recordHash,
        uint256 _price,
        bool _isForSale
    ) public onlyVerifiedUser {
        require(bytes(_name).length > 0, "Name cannot be empty.");
        require(bytes(_location.state).length > 0, "State cannot be empty.");
        require(
            bytes(_location.district).length > 0,
            "District cannot be empty."
        );
        require(bytes(_location.tehsil).length > 0, "Tehsil cannot be empty.");
        require(
            bytes(_location.village).length > 0,
            "Village cannot be empty."
        );
        require(
            bytes(_location.pincode).length > 0,
            "Pincode cannot be empty."
        );
        require(
            bytes(_location.latitude).length > 0,
            "Latitude cannot be empty."
        );
        require(
            bytes(_location.longitude).length > 0,
            "Longitude cannot be empty."
        );
        require(_location.area > 0, "Area cannot be empty.");
        require(bytes(_recordHash).length > 0, "Record hash cannot be empty.");
        require(
            !_mutationNumbers[_mutationNumber],
            "Land with this mutation number already exists"
        );

        landRecords[totalLands] = LandRecord(
            totalLands,
            msg.sender,
            _name,
            _mutationNumber,
            _location,
            _recordHash,
            _price,
            _isForSale,
            false
        );
        totalLands++;
        _mutationNumbers[_mutationNumber] = true;
        landIdsMap[userDataMap[msg.sender].aadharNumber].push(totalLands - 1);
    }

    function getLandRecord(
        uint256 _id
    )
        public
        view
        onlyVerifiedUser
        returns (
            uint256,
            string memory,
            Location memory,
            string memory,
            bool,
            bool,
            uint256
        )
    {
        require(_id < totalLands && _id >= 0, "Invalid _id of the land");
        LandRecord memory record = landRecords[_id];
        return (
            record.id,
            record.name,
            record.location,
            record.recordHash,
            record.isVerified,
            record.isForSale,
            record.price
        );
    }

    function verifyUser(address _user) public onlyGovernmentOfficial {
        require(
            userDataMap[_user].isVerified == false,
            "This land record is already verified."
        );
        userDataMap[_user].isVerified = true;
    }

    function verifyLandRecord(uint256 _id) public onlyGovernmentOfficial {
        require(
            landRecords[_id].isVerified == false,
            "This land record is already verified."
        );
        landRecords[_id].isVerified = true;
    }

    function buyLand(uint256 _id) public payable onlyVerifiedUser {
        require(
            landRecords[_id].isVerified,
            "Land is not verified by the officials"
        );
        require(landRecords[_id].isForSale, "Land is not for sale");
        require(msg.value == landRecords[_id].price, "Incorrect amount sent");

        transferOwnership(_id, msg.sender);

        emit LandSold(_id, msg.sender, landRecords[_id].price);
    }

    function sellLand(
        uint256 _id,
        uint256 _price
    ) public onlyVerifiedUser onlyOwner(_id) {
        require(
            landRecords[_id].isVerified,
            "Land is not verified by the officials"
        );
        require(_id >= 0 && _id < totalLands, "Invalid Land iD");

        landRecords[_id].isForSale = true;
        landRecords[_id].price = _price;

        emit LandForSale(_id, landRecords[_id].owner, _price);
    }

    function transferOwnership(
        uint256 _id,
        address newOwner
    ) public onlyOwner(_id) onlyVerifiedUser {
        require(newOwner != address(0), "Invalid address");
        require(
            landRecords[_id].owner != newOwner,
            "You can't transfer the ownership to yourself"
        );
        removeLandFromUser(landRecords[_id].owner, _id);
        landRecords[_id].owner = newOwner;
        landRecords[_id].isForSale = false;
        emit OwnershipTransferred(landRecords[_id].owner, newOwner);
    }

    function addGovernmentOfficial(address _officialAddress) public onlyAdmin {
        governmentOfficials[_officialAddress] = true;
    }

    function removeGovernmentOfficial(
        address _officialAddress
    ) public onlyAdmin {
        delete governmentOfficials[_officialAddress];
    }

    function isGovernmentOfficial(
        address _officialAddress
    ) public view returns (bool) {
        return governmentOfficials[_officialAddress];
    }

    function isCurrentGovernmentOfficial() public view returns (bool) {
        return governmentOfficials[msg.sender];
    }

    // Get all verified land records
    function getAllLandRecords()
        public
        view
        onlyVerifiedUser
        returns (LandRecord[] memory)
    {
        LandRecord[] memory rcs = new LandRecord[](totalLands);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            rcs[index] = landRecords[i];
            index++;
        }

        return rcs;
    }

    // Get all unverified land records

    // Get all land records for the current user
    function getLandRecordsForCurrentUser(
        address _user
    ) public view onlyVerifiedUser returns (LandRecord[] memory) {
        uint256 userCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == _user) {
                userCount++;
            }
        }

        LandRecord[] memory userRecords = new LandRecord[](userCount);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == _user) {
                userRecords[index] = landRecords[i];
                index++;
            }
        }

        return userRecords;
    }

    function whoIsAdmin() public view returns (address) {
        return admin;
    }
}
