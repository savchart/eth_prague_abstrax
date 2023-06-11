// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);

    function balanceOf(address who) external view returns (uint256);
}

interface AAIPool {
    function deposit(uint256 _amount) external;
}

contract AutoInvest {
    address private _tokenAddress;
    address private _poolAddress;
    uint256 private _investThreshold;

    constructor (address tokenAddress, address poolAddress, uint256 investThreshold) {
        _tokenAddress = tokenAddress;
        _poolAddress = poolAddress;
        _investThreshold = investThreshold;
    }

    function invest() public {
        uint256 balance = IERC20(_tokenAddress).balanceOf(address(this));
        if (balance >= _investThreshold) {
            uint256 excess = balance - _investThreshold;
            require(IERC20(_tokenAddress).transfer(_poolAddress, excess), "AutoInvest: transfer failed");
            AAIPool(_poolAddress).deposit(excess);
        }
    }
}
