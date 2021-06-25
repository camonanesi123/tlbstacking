// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface ITLB {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function setAdmin(address admin,address lee,address zhang,address redeem) public onlyOwner;
    function getAdmin() public view onlyOwner returns(address,address,address,address);
    function basicInfoAdmin() public view onlyOwner returns(uint,uint,uint);
    function amountForDeposit(uint amount) public view returns(uint256);
    function amountForWithdraw(address account) public view returns(uint256);
    function withdrawable(address sender) public view returns(bool, uint, uint, uint, uint, uint);
    function checkInsurance() public;
    function basicInfo(address account) public view returns(uint[14] memory,address);
    function minerPrice(uint8 tier) public view returns(uint);
    function pendingTLB(address account) public view returns(uint);
    function withdrawTLBFromPool() public;
    function deposit(address referalLink, uint amount) public;
    function withdraw() public;
    function minerInfo(address miner) public view returns(uint,MineType,bool);
    function startMine() public;
    function setMineType(MineType mineType) public;
    function buyMiner(address referalLink, uint amountUsdt, MineType mineType) public returns(uint);
    function minerList() public view returns(uint, MinerInfo[] memory);
    function buy(uint amountUsdt) public;
    function cancelBuyOrder() public;
    function sell(uint amountTps) public;
    function cancelSellOrder() public;
    function orderHistory() public view returns(OrderTx[] memory);
}