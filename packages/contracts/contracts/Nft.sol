// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Inspired from chase
library InfoForURI {
    struct data {
        string name;
        uint256 price; // Can be 0 if donatable
        uint8 editions;
        uint8 editionsMinted;
        bool initialized;
        mapping(string => bool) trait;
    }
}

contract StavingChildrenNft is ERC721, ERC721URIStorage, Ownable {
    using InfoForURI for InfoForURI.data;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    Tap tap;
    mapping(string => InfoForURI.data) existingURIs;

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    constructor() ERC721("MyToken", "MTK") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
