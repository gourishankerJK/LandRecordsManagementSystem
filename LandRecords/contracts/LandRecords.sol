// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "./UserRecords.sol";

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
    mapping(uint256 => LandRecord) private landRecordsMutation;

    mapping(uint256 => bool) private _mutationNumbers;

    uint256 public totalLands = 0;

    UserRecords public userRecords;

    constructor(address _contractUserRecords) {
        userRecords = UserRecords(_contractUserRecords);
    }

    event LandForSale(uint256 indexed id, address indexed owner, uint256 price);
    event LandSold(uint256 indexed id, address indexed buyer, uint256 price);

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
            userRecords.isGovernmentOfficial(msg.sender),
            "You are not a government official."
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
        require(userRecords.isUserVerified(msg.sender), "User not verified");
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
        landRecordsMutation[_mutationNumber] = LandRecord(
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
        userRecords.updateLandIds(msg.sender, totalLands - 1);
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
        require(userRecords.isUserVerified(msg.sender), "User not verified");
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
            userRecords.userLandVerified(_user) == false,
            "This land record is already verified."
        );
        userRecords.verifyUser(_user);
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
            landRecordsMutation[_id].isVerified,
            "Land is not verified by the officials"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        require(landRecordsMutation[_id].isForSale, "Land is not for sale");
        require(msg.value == landRecordsMutation[_id].price, "Incorrect amount sent");

        transferOwnership(_id, msg.sender);

        emit LandSold(_id, msg.sender, landRecordsMutation[_id].price);
    }

    function sellLand(uint256 _id, uint256 _price) public onlyOwner(_id) {
        require(
            landRecordsMutation[_id].isVerified,
            "Land is not verified by the officials"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        require(_id >= 0 , "Invalid Land iD");

        landRecordsMutation[_id].isForSale = true;
        landRecordsMutation[_id].price = _price;
        landRecords[landRecordsMutation[_id]._id].isForSale = true;
        landRecords[landRecordsMutation[_id]._id].price = _price;
        emit LandForSale(_id, landRecordsMutation[_id].owner, _price);
    }

    function transferOwnership(
        uint256 _id,
        address newOwner
    ) public onlyOwner(_id) {
        require(newOwner != address(0), "Invalid address");
        require(
            landRecordsMutation[_id].owner != newOwner,
            "You can't transfer the ownership to yourself"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        userRecords.removeLandFromUser(landRecordsMutation[_id].owner, _id);
        landRecordsMutation[_id].owner = newOwner;
        landRecordsMutation[_id].isForSale = false;
        landRecords[landRecordsMutation[_id]._id].owner = newOwner;
        landRecords[landRecordsMutation[_id]._id].isForSale = false;
        emit OwnershipTransferred(landRecordsMutation[_id].owner, newOwner);
    }

    function getAllLandRecords() public view returns (LandRecord[] memory) {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
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
    function getLandRecordsForCurrentUser()
        public
        view
        returns (LandRecord[] memory)
    {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        uint256 userCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == msg.sender) {
                userCount++;
            }
        }

        LandRecord[] memory ur = new LandRecord[](userCount);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == msg.sender) {
                ur[index] = landRecords[i];
                index++;
            }
        }

        return ur;
    }

    function getLandRecordsExceptForCurrentUser()
        public
        view
        returns (LandRecord[] memory)
    {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        uint256 userCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner != msg.sender) {
                userCount++;
            }
        }

        LandRecord[] memory ur = new LandRecord[](userCount);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner != msg.sender) {
                ur[index] = landRecords[i];
                index++;
            }
        }

        return ur;
    }

    function getVerifiedLandRecordsForCurrentUser(
        address _user
    ) public view returns (LandRecord[] memory) {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        uint256 userCount = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == _user && landRecords[i].isVerified) {
                userCount++;
            }
        }

        LandRecord[] memory ur = new LandRecord[](userCount);
        uint256 index = 0;
        for (uint256 i = 0; i < totalLands; i++) {
            if (landRecords[i].owner == _user) {
                ur[index] = landRecords[i];
                index++;
            }
        }

        return ur;
    }
}
