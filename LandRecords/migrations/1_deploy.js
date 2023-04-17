
const fs = require('fs');
const path = require('path');
const UserRecords = artifacts.require("UserRecords");
const LandManagementSystem = artifacts.require("LandManagementSystem");

module.exports = async function (deployer) {
  await deployer.deploy(UserRecords);
  const userRecordsInstance = await UserRecords.deployed();
  await deployer.deploy(LandManagementSystem, userRecordsInstance.address);
  const landRecordsInstance = await LandManagementSystem.deployed();
  const addressFilePath = "../LandRecordsManagement/src/contract/" + 'MyContract_address.json';
  const addressObject = {
    Land_address: landRecordsInstance.address,
    User_address : userRecordsInstance.address
  };
  fs.writeFileSync(addressFilePath, JSON.stringify(addressObject));
};
