// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract Tap is ERC20, Ownable, Pausable {
    mapping(address => uint256) lastAccessTime;
    uint256 public waitTime = 1 minutes;
    struct Participant {
        bool registered; // if true, that person already registered
    }

    mapping(address => Participant) public participants;
    uint256 public numParticipants;

    constructor() ERC20("Tap", "TAP") {
        _mint(msg.sender, 10000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    modifier onlyOnce() {
        if (participants[msg.sender].registered) {
            revert("Declined::Only once per address");
        }
        _;
    }

    function allowedToWithdraw(address _address) public view returns (bool) {
        if (lastAccessTime[_address] == 0) {
            return true;
        } else if (block.timestamp >= lastAccessTime[_address]) {
            return true;
        }
        return false;
    }

    function requestTokens() public onlyOnce whenNotPaused {
        require(allowedToWithdraw(msg.sender));
        _mint(msg.sender, 10);
        lastAccessTime[msg.sender] = block.timestamp + waitTime;
        Participant storage p = participants[msg.sender];
        p.registered = true;
        numParticipants++;
    }
}
