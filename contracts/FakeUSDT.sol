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

contract FakeUSDT is HRC20("Fake USDT", "USDT", 2, 10 ** 9 * (10 ** 2)) { 
    constructor() public {
        uint _initialSupply  = maxSupply() / 100 * 50;
        _mint(msg.sender, _initialSupply);
    }
}