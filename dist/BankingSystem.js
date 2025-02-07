"use strict";
// 🏦 Create a banking system where users can create accounts, deposit, withdraw, and check their balance.
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Deposit"] = 0] = "Deposit";
    TransactionType[TransactionType["Withdraw"] = 1] = "Withdraw";
})(TransactionType || (TransactionType = {}));
var accounts = [];
function createAccount(accountNo, firstname, lastname, initialDeposit, isActive) {
    if (isActive === void 0) { isActive = true; }
    var account = {
        accountNo: accountNo,
        firstname: firstname,
        lastname: lastname,
        balance: initialDeposit,
        isActive: isActive,
        transactions: []
    };
    accounts.push(account);
    return account;
}
function processTransaction(accountNo, amount, type) {
    var account = accounts.find(function (account) { return account.accountNo === accountNo; });
    if (!account) {
        return "Account not found";
    }
    if (type === TransactionType.Deposit) {
        account.balance += amount;
        account.transactions.push({ accountNo: accountNo, amount: amount, type: type });
        return "".concat(amount, " deposited into account number ").concat(accountNo);
    }
    else {
        if (account.balance < amount) {
            return "Insufficient funds for withdrawal";
        }
        account.balance -= amount;
        account.transactions.push({ accountNo: accountNo, amount: amount, type: type });
        return "".concat(amount, " withdrawn from account number ").concat(accountNo);
    }
}
function getBalance(accountNo) {
    var account = accounts.find(function (account) { return account.accountNo === accountNo; });
    if (!account) {
        return "Account not found";
    }
    return account.balance;
}
function getTransactionHistory(accountNo) {
    var account = accounts.find(function (account) { return account.accountNo === accountNo; });
    if (!account) {
        return "Account not found";
    }
    return account.transactions;
}
function checkActiveStatus(accountNo) {
    var account = accounts.find(function (account) { return account.accountNo === accountNo; });
    if (!account) {
        return "Account not found";
    }
    return account.isActive;
}
function closeAccount(accountNo) {
    var accountIndex = accounts.findIndex(function (account) { return account.accountNo === accountNo; });
    if (accountIndex === -1) {
        return "Account not found";
    }
    accounts.splice(accountIndex, 1);
    return "Account number ".concat(accountNo, " closed");
}
// Test cases (students should add more)
console.log(createAccount(1, "John", "Smith", 100)); // { accountNo: 1, firstname: "John", lastname: "Smith", balance: 100, isActive: true, transactions: [] }
console.log(processTransaction(1, 50, TransactionType.Deposit)); // "50 deposited into account number 1"
console.log(processTransaction(1, 20, TransactionType.Withdraw)); // "20 withdrawn from account number 1"
console.log(processTransaction(1, 500, TransactionType.Withdraw)); // "Insufficient funds for withdrawal"
console.log(getBalance(1)); // 130
console.log(getTransactionHistory(1)); // [{ accountNo: 1, amount: 50, type: TransactionType.Deposit }, { accountNo: 1, amount: 20, type: TransactionType.Withdraw }]
console.log(checkActiveStatus(1)); // true
console.log(closeAccount(1)); // "Account number 1 closed"
