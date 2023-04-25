// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionHistory{

    struct Transaction {
        address from;
        address to;
        string typeOf;
        uint256 date;
        string description;
    }

    mapping(address => Transaction[10]) public transactionHistory;
    mapping(address => uint256) public transactionCount;

    function recordTransaction(address _from , address _to, string memory _typeOf, uint256 _date, string memory _description) public {
        Transaction memory newTransaction =  Transaction(_from , _to, _typeOf, _date, _description);
        uint256 count = transactionCount[_from];
        if (count < 10) {
            transactionHistory[_from][count] = newTransaction;
            transactionCount[_from] = count + 1;
        } else {
            transactionHistory[_from][count % 10] = newTransaction;
            transactionCount[_from] = count + 1;
        }
    }

    function getTransactionHistory() public view returns (Transaction[10] memory) {
        return transactionHistory[msg.sender];
    }
}
