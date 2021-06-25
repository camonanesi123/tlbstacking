/**********************************************************************

████████████████████████████████████████████████████
█▄─▄▄─██▀▄─██▄─█─▄█▄─▄▄─███▄─██─▄█─▄▄▄▄█▄─▄▄▀█─▄─▄─█
██─▄████─▀─███─▄▀███─▄█▀████─██─██▄▄▄▄─██─██─███─███
▀▄▄▄▀▀▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▄▄▄▀▀▀▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▄▀▀▀▄▄▄▀▀

for testing contract
********************************************************************** */

// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./lib/HRC20.sol";
import "./ITLB10.sol";
import "./lib/TransferHelper.sol";

contract FakeUSDT is HRC20("Fake USDT", "USDT", 18, 10 ** 9 * (10 ** 18)) { 
    constructor() public {
        uint _initialSupply  = maxSupply() / 100 * 50;
        _mint(msg.sender, _initialSupply);
    }
    
    address tokenTPS;
    
    address admin = 0xE2147F68728Ed5939591990f15943a04493B84f5;
    address lee = 0xd6cbeC12015F8e5F0881a60908858E67738022c8;
    address zhang = 0x7D1F37e65504b81d802D1a047e0392E82eA3C0c7;
    address redeem = 0x9cCf614fe59A57B874F49278233917b0031313a1;
        
    address pnode = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address shareholder_1 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
    address shareholder_2 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    address shareholder_3 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
    address shareholder_4 = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
    address shareholder_5 = 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
    address shareholder_6 = 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
    address shareholder_7 = 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;
    address shareholder_8 = 0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC;
    address shareholder_9 = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    address guest_1 = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
    address guest_2 = 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB;
    address guest_3 = 0x583031D1113aD414F02576BD6afaBfb302140225;
    address guest_4 = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
    address guest_5 = 0x41e4385C57E31D5f876D4227878d9C4Ed74C3352;
    address guest_6 = 0x53cdd18209B3d96F8D7806d7671aF4011993A2e5;
    
    address[] addrs = [
        pnode,
        shareholder_1,
        shareholder_2,
        shareholder_3,
        shareholder_4,
        shareholder_5,
        shareholder_6,
        shareholder_7,
        shareholder_8,
        shareholder_9,
        guest_1,
        guest_2,
        guest_3,
        guest_4,
        guest_5,
        guest_6
    ];
     address[] shareholders = [
        shareholder_1,
        shareholder_2,
        shareholder_3,
        shareholder_4,
        shareholder_5,
        shareholder_6,
        shareholder_7,
        shareholder_8,
        shareholder_9
    ];
        
    modifier needTps {
        require(tokenTPS!=address(0), "undefined_tps_contract");
        _;
    }
    function setTps(address tps) public {
        tokenTPS = tps;
    }
    
    function _init() public needTps {
        uint amountUSDT = 10000 * 10 ** 18;
        uint amountTPS = 10000 * 10 ** 4;
        for(uint i = 0; i<addrs.length; i++) {
            _mint(addrs[i], amountUSDT);
            TransferHelper.safeApprove(tokenTPS, addrs[i], amountTPS);
            TransferHelper.safeTransfer(tokenTPS, addrs[i], amountTPS);
        }
    }
    function _test1() public needTps {
        // set preserved address
        ITLB10(tokenTPS).setAdmin(admin,lee,zhang,redeem);
        
        uint amount = 200 * 10 ** 18;
        
        // add pnode with admin referal link
        _approve(pnode, tokenTPS, amount);
        ITLB10(tokenTPS)._debug_deposit(pnode, admin, amount);
        
       for(uint i=0; i<shareholders.length; i++) {
            // add a shareholder with pnode referal link
            _approve(shareholders[i], tokenTPS, amount);
            ITLB10(tokenTPS)._debug_deposit(shareholders[i], pnode, amount);   
       }
       
        
    }
}