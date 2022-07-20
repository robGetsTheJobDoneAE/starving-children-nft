pragma solidity ^0.8.4;

import "./ThoughtsAndPrayers.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vendor is Ownable {
  ThoughtsAndPrayers tap;

  uint256 public tokensPerEth = 100;

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address tokenAddress) {
    tap = ThoughtsAndPrayers(tokenAddress);
  }

  function buyTokens() public payable returns (uint256 tokenAmount) {
    uint256 amountOfETH = msg.value;
    uint256 amountToBuy = tokensPerEth * amountOfETH;
    uint256 vendorBalance = tap.balanceOf(address(this));
    require(vendorBalance >= amountToBuy, "Vendor contract has not enough tokens in its balance");

    (bool sent) = tap.transfer(msg.sender, amountToBuy);
    require(sent, "Failed to transfer token to user");

    emit BuyTokens(msg.sender, amountOfETH, amountToBuy);

    return amountToBuy;
  }
}