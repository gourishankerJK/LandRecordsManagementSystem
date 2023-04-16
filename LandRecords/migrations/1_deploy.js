const fs = require('fs');
const path = require('path');

const MyContract = artifacts.require('LandManagementSystem');

module.exports = async function(deployer, network) {
  await deployer.deploy(MyContract);
  const myContractInstance = await MyContract.deployed();
const addressFilePath = "../LandRecordsManagement/src/contract/" + 'MyContract_address.json';
  const addressObject = {
    address: myContractInstance.address,
    network: network
  };
  fs.writeFileSync(addressFilePath, JSON.stringify(addressObject));
};
