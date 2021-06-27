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

contract FakeUSDT is HRC20("Fake USDT", "USDT", 2, 10 ** 9 * (10 ** 2)) {
    constructor() public {
        uint _initialSupply  = maxSupply() / 100 * 50;
        _mint(msg.sender, _initialSupply);
    }
    
    address tokenTPS;
    
    
    /* 
    in local evm
    address admin =         0xE2147F68728Ed5939591990f15943a04493B84f5;
    address lee =           0xd6cbeC12015F8e5F0881a60908858E67738022c8;
    address zhang =         0x7D1F37e65504b81d802D1a047e0392E82eA3C0c7;
    address redeem =        0x9cCf614fe59A57B874F49278233917b0031313a1;
        
    address pnode =         0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
    address sh1 = 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db;
    address sh2 = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
    address sh3 = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
    address sh4 = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;
    address sh5 = 0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678;
    address sh6 = 0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7;
    address sh7 = 0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C;
    address sh8 = 0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC;
    address sh9 = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
    address g_1 =       0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C;
    address g_2 =       0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB;
    address g_3 =       0x583031D1113aD414F02576BD6afaBfb302140225;
    address g_4 =       0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
    address g_5 =       0x41e4385C57E31D5f876D4227878d9C4Ed74C3352;
    address g_6 =       0x53cdd18209B3d96F8D7806d7671aF4011993A2e5;
    
    
    */
    
    address admin =     0xC048d30D209bbcD0319037d3ea6764774D3875E5;
    address lee =       0x094A83F46Dd0Ab5bF11EBb1088560a5B16Cb9A8D;
    address zhang =     0x1Fc9a67CeB0DC0ae508941DEC5bf7F3a5B0c544a;
    address redeem =    0x042E933965A4236A0D84c894274e5869d26d4de4;
        
    address pnode =     0x82bC5Cd564EA21642910796aE7Ec675772AE642F;

    address sh1 =       0x8eECD63101878DAF5879495f85ca7067a5e63969;
    address sh2 =       0x50F390FE885bf0A68c49054367C1b763EAfE59D1;
    address sh3 =       0x146a522C1985B72d9b04a1E73Df579823376e39A;
    address sh4 =       0xa300f601a4A479Ed74c0204b90331597128387d3;
    address sh5 =       0xe5a308Be4D5ecd55d590f7b7Fb490038aa53b2b7;
    address sh6 =       0xd27Da575AC9f178aaa1D9D113b7e2895865B39F2;
    address sh7 =       0x231a713dC82d39aC050dc50F379eC0c431945256;
    address sh8 =       0x79938398F8C55B483977856b123350c8e1d71109;
    address sh9 =       0x04577360A1093199e46D5E5404DC20325A337e87;
    // sh1
    address g1 =       0x64297e2f974041514dF4A9326BB2e03400cdE622;
    address g2 =       0x6ab63c36879C16A89ec81A3CFD928f50a2793F63;
    address g3 =       0x0c2018C37c2EC91020e73897fB5Ae48e0C936bD3;
    address g4 =       0xdFBa160135351c39349F2Bae4B1a39Ccc55A9A7A;
    address g5 =       0x540a68E421f5FB90826d54EC820FAE868570743e;
    address g6 =       0xD4DeB4566756daEDaDDd8571af3FA76AA24Eb199;
     // g1
    address g10 =      0xC63493B07ba1E028E952A7FFc738F2f82fECcC8a;
    address g11 =      0x1f06CE392b96f82211E0Cb6C477B165f064ece1B;
    address g12 =      0xD434F9c8bF8f4F55815FD9551EDd1f2033f494AD;
    address g13 =      0xcfC89d81B0906D5C76037510b6ffd1030FD4BD6b;
    address g14 =      0xFC8CaFA73B13D0cA5Fa0f68eDD7324Fc7ff11a0f;
    address g15 =      0x29bD405C7fCF764332CdCF7441EA972c701a43DD;
    address g16 =      0x26dFf1d7f42CB2B2DD137F8105C451276Ae79791;
    address g17 =      0x510e88E5Fe67e502Ae42bA2E45Bb4BaA682f54d8;
    address g18 =      0x73aB977975a7204A03684CD9dC2b32bc6644f2AD;
    address g19 =      0xcab55593141D94312202974De8626E4B8320e746;
    address g20 =      0xaEfd764a7c8405cBC5ffaf874B7f44A9a6a52d1a;
    address g21 =      0x1670157F9AD02B0A287c13b8aADcA9A0400a423e;
    address g22 =      0xf1C126199a7023A9990C4fFD08bB96a669138Ad2;
    address g23 =      0x17764816633399B8045EACCc3e58E6c185D3C738;
    address g24 =      0xe53c5ebDf454dBFBf8dAE88922867e9dd5F5D3Ed;
    address g25 =      0x330165D7c5dCB995E2d151bAB4fA3643BAbB56FC;
    address g26 =      0xc9fDA9c14b37deb6E072373ce018767FeEeE9B16;
    address g27 =      0xAc3Da5e081383D024887D8827Ca442d332996b74;
    address g28 =      0x86E1F96CFE48b91a6B6B6229033dDBFa9687EfEf;
    address g29 =      0xe01637921aE1E1D67c93cd2F958b430B1DD483f7;
    address g30 =      0xeE8136aBbF5913be2f74377eAb9024b2a5EE5813;
    address g31 =      0x65b8CCe9449C4924b28831A26a9Bd24f6285b667;
    address g32 =      0x40A9371a69F4e8C94bd0Cc63a4c82ad2bf5fc6F2;
    address g33 =      0x5342453b53f930FAFF7A04AeeB868e191B168634;
    address g34 =      0x6C00F3ab2aECFAcf3b17A47aF013fC6Cb58F5Dc1;
    address g35 =      0x1C314Edc905FD07Ac4e952206F5F993B7cC789e2;
    address g36 =      0xD9416cBa46B7E1E335BE67b5B9b01021aAdE6531;
    address g37 =      0x5c35ae31456F705Bf3d782816A0e00585791422E;
    address g38 =      0x6670a3c0e7a1E60023307a714d11B433b4f8C975;
    address g39 =      0xA80B1bc73a14d83041C6a90A19F5B18A7542d86E;
    address g40 =      0xaBEb2b0613Ba7C54dEAF8e68295dD133CbDf3cf2;
    // g1
    address g41 =      0xD2CF5D1bE3F9BB8F7941B664E285f55AAf31F887;
    address g42 =      0xa1b61ef0dC8f4aE0C14B07461D5a37673ed014f0;
    address g43 =      0x45AaD2Ed3b5FbD4D08e213668A38dB79AB535Dd7;
    address g44 =      0xB2230b00d5379088D55e82e4ab54D9733cc5B97E;
    address g45 =      0xcB380c92BE9b81bdAAaCC4e2f2691813195eFfa0;
    address g46 =      0xBEb2F6365e3e9F956cFA51C95772d272698A2B3B;
    address g47 =      0x209EC581670C9F5c639E82D7B9Be2E467Ccbe94B;
    address g48 =      0x4783dc5a8BdEe67798c9128EfFb8cC2030e4c524;
    address g49 =      0x39259D71f17A2BAa2E501E38C7A89e3F9CD74939;
    address g50 =      0xd0EdC6667a0c93c9aE189b0c705f73800B0F63A3;
    // g2
    address g51 =      0x5bFbC31e854B4f23835D1245E22042De21EFb7Ee;
    address g52 =      0xfd59B3E586c90d588C3BAfcEec9cd3edfdA653f5;
    address g53 =      0x5E3Da773033Fe2B2330Fc43153e6642614c135d8;
    address g54 =      0xC0DD7e8bEFc122f3D23Ee4f919581686fc83817d;
    address g55 =      0xAD84713AC4afCf3FE27d3C33e2A0307691fc9F4b;
    address g56 =      0x968b674E5FAfB79b0d6446a8408f90f79EC3530C;
    address g57 =      0xe5F46D3593e2771D85318eBB748E8961E6fC9e56;
    address g58 =      0x56f2009B9Bc93AFb4dc366C103de9Fb1E44964a2;
    address g59 =      0xB73723547D91cCD0A84950e35b234C66b2b2AaD5;
    address g60 =      0x39DEC51A572790ee7719E150959023939A4ED9ad;
    // g3
    address g61 =      0xe8D4F827ddcA5994DcDc5c59b7bf9066AC3DC343;
    address g62 =      0xEEA07Ff706aC94721B1B08Edbf69bdD2dA4bfB58;
    address g63 =      0xE6a7E61b193c4b183009B860866Da745F1Bea029;
    address g64 =      0x3F9c57C56Cb82F6a751e57Db3a1F988cF95fbeCa;
    address g65 =      0xF218cAC10BeA55B407De0D6e78ccFF96819B345A;
    address g66 =      0xFaEb65e6dA53BBaA4C2d6B03a3d639E3add31C6b;
    address g67 =      0x65754B13802438875F80606721BBAD271dA72C77;
    address g68 =      0x157066DaD9a84341baDb542A1DB8cB72C51d3f17;
    address g69 =      0x35DcA6089696D924Cae0350981729DE638616116;
    address g70 =      0x1176e1bB2e4db150F04204CE6cEAb92b22eaf2D9;
    // g4
    address g71 =      0xcC747B27e79F4bcc8269eB56B470077086bbEFA7;
    address g72 =      0x26eaB3630e0665DB4D475080e942C6F8AfF5B580;
    address g73 =      0x9323C2781585Ef22F804527FD42a9a02F2EeA3ad;
    address g74 =      0x8E955798d2f74e7B4F84eE31fC1E1169C85D4a31;
    address g75 =      0x3D5Ed0DFc58cd4c7b4869f772EbD5a4219ea3b00;
    address g76 =      0x3B0387290a992191aBE6A577Dfe842ec0e885b4B;
    address g77 =      0x43215b03af682507f20c8c18344919449DEBB22B;
    address g78 =      0x86402492658c12a78064514943c73Ed50fd3E04f;
    address g79 =      0xEB22a53C17d3e3f2B58649A2Fa7a8B72659dfAf0;
    address g80 =      0xF0E4E37d8a2De9284d493ec5e3DAE5FBc4102509;
    // g5
    address g81 =      0x180f31cda8aB6722e8AB2E4c510f6e22236401ad;
    address g82 =      0x86e902f640b3FF6065Fc4adb0c312ee74dAb7516;
    address g83 =      0xb7DD4b7f2263847DA551598024c94b2cF54b6933;
    address g84 =      0x41AAE80e2a1ca25698adb15937601b3D24D5d409;
    address g85 =      0x5a1a1C2fB6Caa9CBfDCE0E39174E3fA0321D6BdB;
    address g86 =      0xE2147F68728Ed5939591990f15943a04493B84f5;
    address g87 =      0x9cCf614fe59A57B874F49278233917b0031313a1;
    address g88 =      0x7D1F37e65504b81d802D1a047e0392E82eA3C0c7;
    address g89 =      0xd6cbeC12015F8e5F0881a60908858E67738022c8;

    address[] pnode_s = [
        sh1,
        sh2,
        sh3,
        sh4,
        sh5,
        sh6,
        sh7,
        sh8,
        sh9
    ];
    address[] sh1_s = [
        g1,
        g2,
        g3,
        g4,
        g5,
        g6
    ];
    address[] g1_s = [
        g10,
        g11,
        g12,
        g13,
        g14,
        g15,
        g16,
        g17,
        g18,
        g19,
        g20,
        g21,
        g22,
        g23,
        g24,
        g25,
        g26,
        g27,
        g28,
        g29,
        g30
    ];
    address[] g2_s = [
        g31,
        g32,
        g33,
        g34,
        g35,
        g36,
        g37,
        g38,
        g39,
        g40
    ];
    address[] g3_s = [
        g41,
        g42,
        g43,
        g44,
        g45,
        g46,
        g47,
        g48,
        g49,
        g50
    ];
    address[] g4_s = [
        g51,
        g52,
        g53,
        g54,
        g55,
        g56,
        g57,
        g58,
        g59,
        g60
    ];
    address[] g5_s = [
        g61,
        g62,
        g63,
        g64,
        g65,
        g66,
        g67,
        g68,
        g69,
        g70
    ];
    
    address[] g6_s = [
        g71,
        g72,
        g73,
        g74,
        g75,
        g76,
        g77,
        g78,
        g79,
        g80
    ];
    address[] g10_s = [
        g81,
        g82,
        g83,
        g84,
        g85,
        g86,
        g87,
        g88,
        g89
    ];
    mapping(string=>bool) called;
    modifier needTps {
        require(tokenTPS!=address(0), "undefined_tps_contract");
        _;
    }
    
    function _initAddress(address account,uint amountUSDT,uint amountTPS) internal {
        _mint(account, amountUSDT);
        ITLB10(tokenTPS)._test_mint(account, amountTPS);
    }
    
    function _deposit(address account, address referal, uint amount) internal needTps {
        _approve(account, tokenTPS, amount);
        ITLB10(tokenTPS)._test_deposit(account, referal, amount);   
    }
    
    function _buyMiner(address account, address referal, uint amount) internal needTps {
        _approve(account, tokenTPS, amount);
        ITLB10(tokenTPS)._test_buyMiner(account,referal,amount);
    }
    
    function _init(address tpsContract) public {
        require(called["_init"]!=true, "ALREADY_CALLED"); 
        called["_init"] = true;
        
        tokenTPS = tpsContract;
        ITLB10(tokenTPS)._testSetAdmin(admin,lee,zhang,redeem);
        uint amountUSDT = 10000 * 10 ** 2;
        uint amountTPS = 10000 * 10 ** 4;
        _initAddress(pnode,amountUSDT,amountTPS);
        for(uint i = 0; i<pnode_s.length; i++) _initAddress(pnode_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<sh1_s.length; i++) _initAddress(sh1_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g1_s.length; i++) _initAddress(g1_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g2_s.length; i++) _initAddress(g2_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g3_s.length; i++) _initAddress(g3_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g4_s.length; i++) _initAddress(g4_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g5_s.length; i++) _initAddress(g5_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g6_s.length; i++) _initAddress(g6_s[i],amountUSDT,amountTPS);
        for(uint i = 0; i<g10_s.length; i++) _initAddress(g10_s[i],amountUSDT,amountTPS);
        
        // uint amount = 200 * 10 ** 2;
        // _deposit(pnode,admin,amount);
    }
    
    function _init_1() public needTps {
        require(called["_init_1"]!=true, "ALREADY_CALLED"); 
        called["_init_1"] = true;
        
        uint amount = 200 * 10 ** 2;
        _deposit(pnode,admin,amount);
        for(uint i=0; i<pnode_s.length;i++)  _deposit(pnode_s[i],pnode,amount);
        for(uint i=0; i<sh1_s.length; i++)    _deposit(sh1_s[i], sh1, amount);
    }
    function _init_g1() public needTps {
        require(called["_init_g1"]!=true, "ALREADY_CALLED"); 
        called["_init_g1"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g1_s.length; i++)    _deposit(g1_s[i], g1, amount);
    }
    function _init_g2() public needTps {
        require(called["_init_g2"]!=true, "ALREADY_CALLED"); 
        called["_init_g2"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g2_s.length; i++)    _deposit(g2_s[i], g2, amount);
    }
    function _init_g3() public needTps {
        require(called["_init_g3"]!=true, "ALREADY_CALLED"); 
        called["_init_g3"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g3_s.length; i++)    _deposit(g3_s[i], g3, amount);
    }
    function _init_g4() public needTps {
        require(called["_init_g4"]!=true, "ALREADY_CALLED"); 
        called["_init_g4"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g4_s.length; i++)    _deposit(g4_s[i], g4, amount);
    }
    function _init_g5() public needTps {
        require(called["_init_g5"]!=true, "ALREADY_CALLED"); 
        called["_init_g5"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g5_s.length; i++)    _deposit(g5_s[i], g5, amount);
    }
    function _init_g6() public needTps {
        require(called["_init_g6"]!=true, "ALREADY_CALLED"); 
        called["_init_g6"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g6_s.length; i++)    _deposit(g6_s[i], g4, amount);
    }
    function _init_g7() public needTps {
        require(called["_init_g7"]!=true, "ALREADY_CALLED"); 
        called["_init_g7"] = true;
        uint amount = 200 * 10 ** 2;
        for(uint i=0; i<g10_s.length; i++)    _deposit(g10_s[i], g4, amount);
    }
    
    function _miner_1() public needTps {
        uint amount = ITLB10(tokenTPS).minerPrice(1);
        _buyMiner(g6,sh9,amount);
    }
    
    function _test2_price() public needTps view returns(uint) {
        uint amount = ITLB10(tokenTPS).minerPrice(1);
        return amount;
    }
}