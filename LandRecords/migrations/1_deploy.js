
const fs = require('fs');
const path = require('path');
const UserRecords = artifacts.require("UserRecords");
const LandManagementSystem = artifacts.require("LandManagementSystem");
const TransactionHistory = artifacts.require("TransactionHistory")

module.exports = async function (deployer) {
  await deployer.deploy(TransactionHistory);
  const transactionInstance = await TransactionHistory.deployed();
  await deployer.deploy(UserRecords , transactionInstance.address);
  const userRecordsInstance = await UserRecords.deployed();
  await deployer.deploy(LandManagementSystem, userRecordsInstance.address , transactionInstance.address);
  const landRecordsInstance = await LandManagementSystem.deployed();
  const addressFilePath = "../LandRecordsManagement/src/contract/" + 'MyContract_address.json';
  const addressObject = {
    Land_address: landRecordsInstance.address,
    User_address : userRecordsInstance.address,
    TransactionHistory_address : transactionInstance.address
  };
  fs.writeFileSync(addressFilePath, JSON.stringify(addressObject));
};
