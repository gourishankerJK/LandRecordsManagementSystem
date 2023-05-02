// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "./UserRecords.sol";
import "./Transaction.sol";

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
        address owner;
        string name;
        uint256 mutationNumber;
        Location location;
        string recordHash;
        uint256 price;
        bool isForSale;
        int32 isVerified;
    }
    mapping(uint256 => LandRecord) private landRecordsMutation;
    mapping(uint256 => bool) private _mutationNumbers;
    uint256[] private MutationNumbers;
    uint256 public totalLands = 0;
    uint256 private M = 10 ** 18;
    UserRecords public userRecords;
    TransactionHistory public transaction;

    constructor(address _contractUserRecords, address _contractTransaction) {
        userRecords = UserRecords(_contractUserRecords);
        transaction = TransactionHistory(_contractTransaction);
    }

    modifier onlyOwner(uint256 _mutationNumber) {
        require(
            msg.sender == landRecordsMutation[_mutationNumber].owner,
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
        require(_mutationNumber != 0, "Mutation Number can't be zero");

        landRecordsMutation[_mutationNumber] = LandRecord(
            msg.sender,
            _name,
            _mutationNumber,
            _location,
            _recordHash,
            _price,
            _isForSale,
            0
        );
        totalLands++;
        _mutationNumbers[_mutationNumber] = true;
        userRecords.updateLandIds(msg.sender, _mutationNumber);
        transaction.recordTransaction(
            msg.sender,
            msg.sender,
            "Land Record Added",
            block.timestamp,
            "You added a new land record"
        );
        MutationNumbers.push(_mutationNumber);
    }

    function verifyLandRecord(
        uint256 _mutationNumber
    ) public onlyGovernmentOfficial {
        require(
            landRecordsMutation[_mutationNumber].owner  != tx.origin,
            "You can't verify your own land"
        );

        landRecordsMutation[_mutationNumber].isVerified = 1;
        transaction.recordTransaction(
            msg.sender,
            landRecordsMutation[_mutationNumber].owner,
            "Land Verified",
            block.timestamp,
            "You verified this land"
        );
    }

    function rejectLandRecord(
        uint256 _mutationNumber
    ) public onlyGovernmentOfficial {
        require(
            landRecordsMutation[_mutationNumber].isVerified < 1,
            "This land record is already verified. You can't reject"
        );
        landRecordsMutation[_mutationNumber].isVerified = -1;
        transaction.recordTransaction(
            msg.sender,
            landRecordsMutation[_mutationNumber].owner,
            "Land Rejected",
            block.timestamp,
            "You rejected this land"
        );
    }

    function buyLand(uint256 mutationNumber) public payable {
        require(
            landRecordsMutation[mutationNumber].isVerified == 1,
            "Land is not verified by the officials"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        require(
            landRecordsMutation[mutationNumber].isForSale,
            "Land is not for sale"
        );
        require(
            (msg.value) == (landRecordsMutation[mutationNumber].price * M),
            "Incorrect amount sent"
        );

        userRecords.removeLandFromUser(
            landRecordsMutation[mutationNumber].owner,
            mutationNumber
        );

        transaction.recordTransaction(
            msg.sender,
            landRecordsMutation[mutationNumber].owner,
            "BUY",
            block.timestamp,
            "You bought this land"
        );
        payable(landRecordsMutation[mutationNumber].owner).transfer(msg.value);

        userRecords.updateLandIds(msg.sender, mutationNumber);
        landRecordsMutation[mutationNumber].owner = msg.sender;
        landRecordsMutation[mutationNumber].isForSale = false;
    }

    function sellLand(
        uint256 mutationNumber,
        uint256 _price
    ) public onlyOwner(mutationNumber) {
        require(
            landRecordsMutation[mutationNumber].isVerified == 1,
            "Land is not verified by the officials"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        require(mutationNumber >= 0, "Invalid Land iD");

        landRecordsMutation[mutationNumber].isForSale = true;
        landRecordsMutation[mutationNumber].price = _price;

        transaction.recordTransaction(
            msg.sender,
            msg.sender,
            "sell",
            block.timestamp,
            "You made  this land avaiable for sale"
        );
    }

    function getAllLandRecords() public view returns (LandRecord[] memory) {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        LandRecord[] memory rcs = new LandRecord[](totalLands);
        for (uint256 i = 0; i < totalLands; i++) {
            rcs[i] = landRecordsMutation[MutationNumbers[i]];
        }
        return rcs;
    }

    function getLandRecordsExceptForCurrentUser()
        public
        view
        returns (LandRecord[] memory)
    {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        uint256 len = 0;
        uint256 index = 0;
        for (uint256 i = 0; i < MutationNumbers.length; i++) {
            if (landRecordsMutation[MutationNumbers[i]].owner != msg.sender) {
                len++;
            }
        }
        LandRecord[] memory ur = new LandRecord[](len);
        for (uint256 i = 0; i < MutationNumbers.length; i++) {
            if (landRecordsMutation[MutationNumbers[i]].owner != msg.sender) {
                ur[index] = landRecordsMutation[MutationNumbers[i]];
                index++;
            }
        }

        return ur;
    }

    function getLandRecordsForCurrentUser() public view returns (LandRecord[] memory)
    {
        require(userRecords.isUserVerified(msg.sender), "User not verified");
        uint256[] memory temp = userRecords.getMutationNumber(msg.sender);
        LandRecord[] memory ur = new LandRecord[](temp.length);
        for (uint256 i = 0; i < temp.length; i++)
            ur[i] = landRecordsMutation[temp[i]];
        return ur;
    }

    function updateDocument(
        string memory cid,
        uint256 _mutationNumber
    ) public onlyOwner(_mutationNumber) {
        landRecordsMutation[_mutationNumber].recordHash = cid;
        landRecordsMutation[_mutationNumber].isVerified = 0;
    }

    function removeMutationNumber(uint256 value) internal {
        for (uint256 i = 0; i < MutationNumbers.length; i++) {
            if (MutationNumbers[i] == value) {
                for (uint256 j = i; j < MutationNumbers.length - 1; j++) {
                    MutationNumbers[j] = MutationNumbers[j + 1];
                }
                MutationNumbers.pop();
                break;
            }
        }
    }

    function transferOwnership(
        uint256 mutationNumber,
        address newOwner
    ) public onlyOwner(mutationNumber) {
        require(newOwner != address(0), "Invalid address");
        require(
            landRecordsMutation[mutationNumber].owner != newOwner,
            "You can't transfer the ownership to yourself"
        );
        require(userRecords.isUserVerified(msg.sender), "User not verified");

        userRecords.removeLandFromUser(
            landRecordsMutation[mutationNumber].owner,
            mutationNumber
        );
        landRecordsMutation[mutationNumber].owner = newOwner;
        landRecordsMutation[mutationNumber].isForSale = false;


        userRecords.updateLandIds(newOwner, mutationNumber);
        transaction.recordTransaction(
            msg.sender,
            landRecordsMutation[mutationNumber].owner,
            "Transfer Land Record",
            block.timestamp,
            "You transfer this land"
        );
    }
}
