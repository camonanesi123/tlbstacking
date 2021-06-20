// SPDX-License-Identifier: MIT

import "./lib/TransferHelper.sol";

contract TestPlasma {
    address tokenUSDT = 0xE5f2A565Ee0Aa9836B4c80a07C8b32aAd7978e22;
    address tokenTPS = 0xE2147F68728Ed5939591990f15943a04493B84f5;
    
    
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
    address guest_5 = 0xCE64B62C1595450207c5dE9EFFd3b1cB40472759;
    address guest_6 = 0xFFD7c91397fdE6ff681b6c213124A06C09d4F6f2;
    
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
    
    constructor() public {
    }
    
    function _init() public {
        uint amountUSDT = 10000 * 10 ** 2;
        uint amountTPS = 10000 * 10 ** 4;
        for(uint i = 0; i<addrs.length; i++) {
            TransferHelper.safeApprove(tokenUSDT, addrs[i], amountUSDT);
            TransferHelper.safeTransfer(tokenUSDT, addrs[i], amountUSDT);
            TransferHelper.safeApprove(tokenTPS, addrs[i], amountTPS);
            TransferHelper.safeTransfer(tokenTPS, addrs[i], amountTPS);
        }
    }
        
}