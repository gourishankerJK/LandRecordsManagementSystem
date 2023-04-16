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

    mapping(uint256 => LandRecord) private landRecords;
    mapping(address => bool) private governmentOfficials;
    mapping(uint256 => bool) private _mutationNumbers;

    uint256 public totalLands = 0;

    address private admin;

    constructor() {
        admin = msg.sender;
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
    ) public {
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
    }

    function getLandRecord(
        uint256 _id
    )
        public
        view
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

    function verifyLandRecord(uint256 _id) public onlyGovernmentOfficial {
        require(
            landRecords[_id].isVerified == false,
            "This land record is already verified."
        );
        landRecords[_id].isVerified = true;
    }

    function buyLand(uint256 _id) public payable {
        require(
            landRecords[_id].isVerified,
            "Land is not verified by the officials"
        );
        require(landRecords[_id].isForSale, "Land is not for sale");
        require(msg.value == landRecords[_id].price, "Incorrect amount sent");

        landRecords[_id].owner = msg.sender;
        landRecords[_id].isForSale = false;

        emit LandSold(_id, msg.sender, landRecords[_id].price);
    }

    function sellLand(uint256 _id, uint256 _price) public onlyOwner(_id) {
        require(
            landRecords[_id].isVerified,
            "Land is not verified by the officials"
        );

        landRecords[_id].isForSale = true;
        landRecords[_id].price = _price;

        emit LandForSale(_id, landRecords[_id].owner, _price);
    }

    function transferOwnership(
        uint256 _id,
        address newOwner
    ) public onlyOwner(_id) {
        require(newOwner != address(0), "Invalid address");
        require(
            landRecords[_id].owner != newOwner,
            "You can't transfer the ownership to yourself"
        );

        landRecords[_id].owner = newOwner;

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

    // Get the count of all land records
    function getLandRecordCount() public view returns (uint256) {
        return totalLands;
    }

    // Get all verified land records
    function getVerifiedLandRecords()
        public
        view
        returns (LandRecord[] memory)
    {
        uint256 verifiedCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].isVerified) {
                verifiedCount++;
            }
        }

        LandRecord[] memory verifiedRecords = new LandRecord[](verifiedCount);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].isVerified) {
                verifiedRecords[index] = landRecords[i];
                index++;
            }
        }

        return verifiedRecords;
    }

    // Get all unverified land records
    function getUnverifiedLandRecords()
        public
        view
        returns (LandRecord[] memory)
    {
        uint256 unverifiedCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (!landRecords[i].isVerified) {
                unverifiedCount++;
            }
        }

        LandRecord[] memory unverifiedRecords = new LandRecord[](
            unverifiedCount
        );
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (!landRecords[i].isVerified) {
                unverifiedRecords[index] = landRecords[i];
                index++;
            }
        }

        return unverifiedRecords;
    }

    // Get all land records for the current user
    function getLandRecordsForCurrentUser(
        address _user
    ) public view returns (LandRecord[] memory) {
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

    function getLandIdByMutationNumber(
        uint256 mutationNumber
    ) public view returns (uint256) {
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].mutationNumber == mutationNumber) {
                return landRecords[i].id;
            }
        }
        revert("Land with this mutation number not found");
    }
}
