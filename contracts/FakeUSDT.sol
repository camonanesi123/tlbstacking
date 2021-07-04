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

contract FakeUSDT is HRC20("Fake USDT", "USDT", 2, 10 ** 12 * (10 ** 2)) {
    /* 
    in local evm
    address admin =         0xE2147F68728Ed5939591990f15943a04493B84f5;
    address lee =           0xd6cbeC12015F8e5F0881a60908858E67738022c8;
    address zhang =         0x7D1F37e65504b81d802D1a047e0392E82eA3C0c7;
    address redeem =        0x9cCf614fe59A57B874F49278233917b0031313a1;
        
    address pnode =         0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address sh1 =           0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
    address sh2 =           0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    address sh3 =           0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
    address sh4 =           0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
    address sh5 =           0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
    address sh6 =           0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
    address sh7 =           0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;
    address sh8 =           0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC;
    address sh9 =           0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    */
    address tokenTPS;
    
    address admin =     0xC048d30D209bbcD0319037d3ea6764774D3875E5;
    address lee =       0x64297e2f974041514dF4A9326BB2e03400cdE622;
    address zhang =     0x6ab63c36879C16A89ec81A3CFD928f50a2793F63;
    address redeem =    0x0c2018C37c2EC91020e73897fB5Ae48e0C936bD3;
        
    address pnode =     0x82bC5Cd564EA21642910796aE7Ec675772AE642F;
    
    address[] sh;
    address[] g1;
    address[] g2;

    mapping(string=>bool) called;
    
    uint limit = 10;
    uint public start = 0;
    
    function _address_init(address tps) public {
        tokenTPS = tps;
        ITLB10(tokenTPS)._test_admin(address(this), admin,lee,zhang,redeem);
        sh = [
            0x8eECD63101878DAF5879495f85ca7067a5e63969,
            0x50F390FE885bf0A68c49054367C1b763EAfE59D1,
            0x146a522C1985B72d9b04a1E73Df579823376e39A,
            0xa300f601a4A479Ed74c0204b90331597128387d3,
            0xe5a308Be4D5ecd55d590f7b7Fb490038aa53b2b7,
            0xd27Da575AC9f178aaa1D9D113b7e2895865B39F2,
            0x231a713dC82d39aC050dc50F379eC0c431945256,
            0x79938398F8C55B483977856b123350c8e1d71109,
            0x04577360A1093199e46D5E5404DC20325A337e87
        ];
        _mint(pnode, 1e6 * 10**2);
        ITLB10(tokenTPS)._test_mint(pnode, 1e6 * 10 ** 4);
        
        _addAccount(pnode,admin);
        uint minerTier = 3;
        uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier);
        
        _mint(pnode, amount);
        
        _approve(pnode, tokenTPS, amount);
        ITLB10(tokenTPS)._test_buyMiner(pnode,admin,minerTier);
        
        for(uint i = 0; i<sh.length; i++) {
            _addAccount(sh[i],pnode);
            amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier) * 2;
             _mint(sh[i], amount);
            _approve(sh[i], tokenTPS, amount);
            
            /*
            
            ITLB10(tokenTPS)._test_buyMiner(sh[i],pnode,minerTier);
            */
        }
    }
    function _addAccount(address account, address referal) internal {
        uint amountUSDT = 1000 * 10 ** 2;
        _mint(account, amountUSDT);
        uint amountTlb = ITLB10(tokenTPS).amountForDeposit(amountUSDT);
        ITLB10(tokenTPS)._test_mint(account, amountTlb);
        _approve(account, tokenTPS, amountUSDT);
        ITLB10(tokenTPS)._test_deposit(account, referal, amountUSDT);
    }
    
    function addAccount(address account, address referal) public {
        _addAccount(account, referal);
    }
    function addMiner(address account, address referal, uint minerTier) public {
        uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier);
        _approve(account, tokenTPS, amount);
        ITLB10(tokenTPS)._test_buyMiner(account, referal, amount);
    }
    /*
    function _addBuy(address account, uint amount) public { 
        _approve(account, tokenTPS, amount);
        ITLB10(tokenTPS)._test_buy(account, amount);
    }
    function _addSellBook() public {
        uint amountTPS = 1000 * 10 ** 4;
        for(uint i = 0; i<sh.length; i++) {
            ITLB10(tokenTPS)._test_sell(sh[i],amountTPS);
        }
    }
    
    function buyMiner(address account, address referal, uint8 tier) internal {
        // uint amount = ITLB10(tokenTPS).minerPrice(tier);
        // _approve(account, tokenTPS, amount);
        // ITLB10(tokenTPS)._test_buyMiner(account,referal,amount);
    }
    
    function minerPrice(uint8 tier) public view returns(uint) {
        // uint amount = ITLB10(tokenTPS).minerPrice(tier);
        // return amount;
    }
    */
    
}