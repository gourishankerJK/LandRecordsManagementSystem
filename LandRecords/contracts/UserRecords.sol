// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract UserRecords {
    struct UserData {
        string name;
        string dateOfBirth;
        uint256 aadharNumber;
        string profilePhoto;
        string officialDocument;
        bool isVerified;
        uint32 role;
        address my;
    }

    string[] private roles = ["user", "govt", "admin"];

    mapping(address => UserData) public userDataMap;
    mapping(uint256 => bool) public AadharNumber;
    mapping(uint256 => UserData) public aadToUser;
    mapping(uint256 => uint256[]) public landIdsMap;
    mapping(string => uint32) private rolesMap;

    address[] private userRecords;

    address private admin;

    constructor() {
        admin = msg.sender;    
        for(uint32 i = 0;i<roles.length;i++) {
            rolesMap[roles[i]] = i+1;
        }
    }

    event LogDebug(string message);

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "You are not authorized to perform this action."
        );
        _;
    }

    function isUserVerified(address user) public view returns (bool) {
        return userDataMap[user].isVerified;
    }

    function addUser(
        string memory _name,
        string memory _dateOfBirth,
        uint256 _aadharNumber,
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
            role: (msg.sender == admin ) ? 13 : 1,
            my: msg.sender
        });
        AadharNumber[_aadharNumber] = true;
        aadToUser[_aadharNumber] = userDataMap[msg.sender];
        userRecords.push(msg.sender);
    }

    function getOwnProfile()
        public
        view
        returns (
            string memory name,
            string memory dateOfBirth,
            uint256 aadharNumber,
            string memory profilePhoto,
            string memory officialDocument,
            bool isVerified,
            uint256 role,
            address my,
            uint256[] memory landIds
        )
    {
        require(msg.sender != address(0), "Invalid user address");

        UserData memory user = userDataMap[msg.sender];
        require(bytes(user.name).length > 0, "Profile not found");

        name = user.name;
        dateOfBirth = user.dateOfBirth;
        aadharNumber = user.aadharNumber;
        profilePhoto = user.profilePhoto;
        officialDocument = user.officialDocument;
        isVerified = user.isVerified;
        role = user.role;
        my = user.my;
        landIds = landIdsMap[user.aadharNumber];
    }

    function getUserProfile(
        uint256 _aadharNumber
    ) public view returns (UserData memory, uint256[] memory) {
        UserData memory user = aadToUser[_aadharNumber];

        return (user, landIdsMap[user.aadharNumber]);
    }

    function getAllUsers() public view returns (UserData[] memory) {
        UserData[] memory temp = new UserData[](
            userRecords.length
        );
        for (uint256 i = 0; i < userRecords.length; i++) {
            temp[i] = userDataMap[userRecords[i]];
        }
        return temp;
    }

    function removeLandFromUser(address user, uint256 landId) public {
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

    function getAadharNumber(address user) public view returns (uint256) {
        return userDataMap[user].aadharNumber;
    }

    function updateLandIds(address user, uint256 id) public {
        landIdsMap[userDataMap[user].aadharNumber].push(id);
    }

    function userLandVerified(address _user) public view returns (bool) {
        return userDataMap[_user].isVerified;
    }

    function verifyUser(address _user) public {
        require(
            isCurrentGovernmentOfficial(),
            "Only goverment officals can verify the user"
        );
        userDataMap[_user].isVerified = true;
        aadToUser[userDataMap[_user].aadharNumber].isVerified = true;
    }

    function addGovernmentOfficial(address _officialAddress) public onlyAdmin {
        userDataMap[_officialAddress].role = userDataMap[_officialAddress].role*10 + 2;
    }

    function checkRole(uint32 oldRole, uint32 funcType, uint32 roleType) internal pure returns(uint32) {
        uint32 newRole = 0;
        uint32 roleFlag = 0;
        while(oldRole != 0) {
            uint32 t = oldRole%10;
            if(t != roleType) newRole = newRole*10 + t;
            else roleFlag = 1;
            oldRole /= 10;
        }
        if(funcType == 1) return roleFlag;
        else return newRole;
    }

    function removeGovernmentOfficial(address _officialAddress) public onlyAdmin {
        userDataMap[_officialAddress].role = checkRole(userDataMap[_officialAddress].role, 2, 2);
    }

    function isGovernmentOfficial(
        address _officialAddress
    ) public view returns (bool) {
        return checkRole(userDataMap[_officialAddress].role, 1, 2) == 1;
    }

    function isCurrentGovernmentOfficial() public view returns (bool) {
        return checkRole(userDataMap[msg.sender].role, 1, 2) == 1;
    }

    function isAdmin(address _u) public returns (bool) {
        bool result = _u == admin;
        if (result) {
            emit LogDebug("isAdmin is true");
        } else {
            emit LogDebug("isAdmin is false");
        }
        return result;
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }

    function whoIsAdmin() public view returns (address) {
        return admin;
    }
}
