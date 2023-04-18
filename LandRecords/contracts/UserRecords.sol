// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract UserRecords {
    struct UserData {
        string name;
        string dateOfBirth;
        string aadharNumber;
        string profilePhoto;
        string officialDocument;
        bool isVerified;
        address my;
    }

    mapping(address =>  UserData) public userDataMap;
    mapping(string => bool) public AadharNumber;
    mapping(string => UserData) public aadToUser;
    mapping(string => uint256[]) public landIdsMap;
    mapping(address => bool) private governmentOfficials;

    UserData[] private userRecords;
    address private admin;

    constructor(){
          admin = msg.sender;
    }


     event LogDebug(string message);

     modifier onlyAdmin() {
        require(msg.sender == admin,"You are not authorized to perform this action.");
        _;
    }
    function isUserVerified(address user) public view returns (bool) {
        return userDataMap[user].isVerified;
    }

    function addUser(string memory _name,string memory _dateOfBirth,string memory _aadharNumber,string memory _profilePhoto,string memory _officialDocument) public {
        require(msg.sender != address(0), "Invalid user address");
        require(AadharNumber[_aadharNumber] == false, "User already exists");
        userRecords.push(UserData({
            name: _name,
            dateOfBirth: _dateOfBirth,
            aadharNumber: _aadharNumber,
            profilePhoto: _profilePhoto,
            officialDocument: _officialDocument,
            isVerified: false,
            my: msg.sender
        }));
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

    function getAadharNumber(address user) public view returns (string memory) {
        return userDataMap[user].aadharNumber;
    }

    function updateLandIds(address user, uint256 id) public {
        landIdsMap[userDataMap[user].aadharNumber].push(id);
    }

    function userLandVerified(address _user) public view returns (bool) {
        return userDataMap[_user].isVerified;
    }

    function verifyUser(address _user) public {
        require(isCurrentGovernmentOfficial() , "Only goverment officals can verify the user");
        userDataMap[_user].isVerified = true;
    }

     function addGovernmentOfficial(address _officialAddress) public onlyAdmin {
        governmentOfficials[_officialAddress] = true;
    }

    function removeGovernmentOfficial(address _officialAddress) public onlyAdmin {
        delete governmentOfficials[_officialAddress];
    }

    function isGovernmentOfficial(address _officialAddress) public view returns (bool) {
        return governmentOfficials[_officialAddress];
    }

    function isCurrentGovernmentOfficial() public view returns (bool) {
        return governmentOfficials[msg.sender];
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

     function isAdmin() public view returns(bool){
        return msg.sender ==  admin;
    }

      function whoIsAdmin() public view returns (address) {
        return admin;
    }

    function getAllUsers() public view returns(UserData[] memory , bool[] memory ){
          bool[] memory govt = new bool[](userRecords.length);
            for(uint256 i = 0;i<userRecords.length;i++){
                     govt[i] = isGovernmentOfficial(userRecords[i].my);
            }
        return  (userRecords  , govt);
    }


}
