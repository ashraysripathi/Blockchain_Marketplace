// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./Fiducia.sol";

contract Cantina {
    Fiducia private _token;

    function doStuff(address recv) external returns (address) {
        address from = msg.sender;
        _token.transferFrom(from, recv, 100);
    }

    struct details {
        uint256 completedComissions;
        bool isActive;
    }
    struct productStruct {
        uint256 id;
        uint256 price;
        address owner;
        bool purchased;
        string name;
    }
    struct commissionStruct {
        uint256 id;
        uint256 rate;
        uint256 timeHour;
        address requestor;
        address fulfiller;
        uint256 requestStatus;
        uint256 paymentStatus;
        uint256 completionStatus;
    }
    string str;

    constructor(Fiducia token) {
        str = "Ashray A Sripathi";
        _token = token;
    }

    function getValue() public view returns (string memory) {
        return str;
    }

    mapping(address => uint256) public userType;

    mapping(address => details) public userDetails;
    mapping(uint256 => productStruct) public prodDetails;
    mapping(uint256 => commissionStruct) public comissionDetails;

    uint256 public nrComissions = 0;
    uint256 public nrProducts = 0;

    modifier onlyCreator() {
        require(userType[msg.sender] == 1);
        _;
    }
    modifier onlyCustomer() {
        require(userType[msg.sender] == 2);
        _;
    }

    function registerCreator() public payable {
        address creator = msg.sender;
        userType[creator] = 1;
        uint256 deposit = msg.value;
        if (deposit < 10) {
            revert();
        }
    }

    function registerCustomer() public {
        address customer = msg.sender;
        userType[customer] = 2;
    }

    function payComission(uint256 _id) public payable onlyCustomer {
        address creator = comissionDetails[_id].fulfiller;
        require(comissionDetails[_id].requestor == msg.sender);
        address customer = msg.sender;
        uint256 amount = comissionDetails[_id].rate *
            comissionDetails[_id].timeHour;
        comissionDetails[_id].paymentStatus = 1;
        payable(creator).transfer(amount);
        address from = msg.sender;
        _token.transferFrom(from, creator, amount);
    }

    function requestCommission(
        uint256 _rate,
        uint256 _hrs,
        address _creator
    ) public onlyCustomer {
        comissionDetails[nrComissions].id = nrComissions;
        comissionDetails[nrComissions].requestor = msg.sender;
        comissionDetails[nrComissions].fulfiller = _creator;
        comissionDetails[nrComissions].rate = _rate;
        comissionDetails[nrComissions].timeHour = _hrs;
        comissionDetails[nrComissions].requestStatus = 0;
        comissionDetails[nrComissions].completionStatus = 0;
        nrComissions++;
    }

    function responseCommission(uint256 _id) public onlyCreator {
        require(comissionDetails[_id].fulfiller == msg.sender);
        comissionDetails[_id].requestStatus = 1;
    }

    function completeCommission(uint256 _id) public {
        require(comissionDetails[_id].fulfiller == msg.sender);
        require(comissionDetails[_id].paymentStatus == 1);
        comissionDetails[_id].completionStatus = 1;
    }

    function createListing(uint256 _price, string memory _name)
        public
        onlyCreator
    {
        require(_price > 0);
        require(bytes(_name).length > 0);
        address creator = msg.sender;
        prodDetails[nrProducts].id = nrProducts;
        prodDetails[nrProducts].price = _price;
        prodDetails[nrProducts].owner = creator;
        prodDetails[nrProducts].purchased = false;
        prodDetails[nrProducts].name = _name;
        nrProducts++;
    }

    function buy(uint256 _productID) public payable onlyCustomer {
        uint256 _price = prodDetails[_productID].price;
        //require(msg.value >= _price);
        require(!prodDetails[_productID].purchased);
        address _creator = prodDetails[_productID].owner;
        prodDetails[_productID].owner = msg.sender;
        prodDetails[_productID].purchased = true;
        //(payable(_creator)).transfer(msg.value);

        address from = msg.sender;
        _token.transferFrom(from, _creator, _price);
    }

    function balanceOfSC() public returns (uint256) {
        return address(this).balance;
    }
}
