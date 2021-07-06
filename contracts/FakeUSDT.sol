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
    
    constructor(address tps) public {
        tokenTPS = tps;
        ITLB10(tokenTPS)._test_admin(address(this), admin,lee,zhang,redeem);
        
        ITLB10(tokenTPS)._test_buyMiner(admin,0x8eECD63101878DAF5879495f85ca7067a5e63969,0);
        
        uint minerTier = 3;
        uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier);
        _mint(pnode, 1e6 * 10**2);
        _approve(pnode, tokenTPS, amount);
        ITLB10(tokenTPS)._test_mint(pnode, 1e6 * 10 ** 4);
        ITLB10(tokenTPS)._test_buyMiner(pnode,admin,minerTier);
        _addAccount(pnode,admin);
    }
    
    function _address_init() public {
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
        uint minerTier = 3;
        for(uint i = 0; i<sh.length; i++) {
            _addAccount(sh[i],pnode);
            
            uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier) * 2;
             _mint(sh[i], amount);
            _approve(sh[i], tokenTPS, amount);
            ITLB10(tokenTPS)._test_buyMiner(sh[i],pnode,minerTier);
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
    function addBulk(address[] memory addrs, address referal) public {
        for(uint i=0; i<addrs.length; i++) _addAccount(addrs[i], referal);
    }
    function addMiner(address account, address referal, uint minerTier) public {
        uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier);
         _mint(account, amount);
        _approve(account, tokenTPS, amount);
        ITLB10(tokenTPS)._test_buyMiner(account, referal, minerTier);
    }
    function addBulkMiner(address[] memory addrs, address referal, uint minerTier) public {
        uint amount = ITLB10(tokenTPS)._test_MinerPrice(minerTier);
        for(uint i=0; i<addrs.length; i++) {
            _mint(addrs[i], amount);
            _approve(addrs[i], tokenTPS, amount);
            ITLB10(tokenTPS)._test_buyMiner(addrs[i], referal, minerTier);   
        }
    }
    
}