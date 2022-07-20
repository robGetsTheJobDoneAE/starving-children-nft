// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./ThoughtsAndPrayers.sol";
import "./Vendor.sol";

library InfoForURI {
    struct data {
        string name;
        address creator;
        uint256 price; // Can be 0 if donatable
        uint8 editions;
        uint8 editionsMinted;
        bool initialized; // Whether or not the NFT has been initialized
    }
}

contract StarvingChildren is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    using InfoForURI for InfoForURI.data;

    ThoughtsAndPrayers tap;

    Counters.Counter private _tokenIdCounter;

    mapping(string => InfoForURI.data) existingURIs;

    constructor(address tokenAddress) ERC721("StarvingChildren", "SVC") {
        tap = ThoughtsAndPrayers(tokenAddress);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function nameForURI(string memory uri) public view returns (string memory) {
        return existingURIs[uri].name;
    }

    function creatorForURI(string memory uri) public view returns (address) {
        return existingURIs[uri].creator;
    }

    function priceForURI(string memory uri) public view returns (uint256) {
        return existingURIs[uri].price;
    }

    function editionsForURI(string memory uri) public view returns (uint8) {
        return existingURIs[uri].editions;
    }

    function editionsMintedForURI(string memory uri)
        public
        view
        returns (uint8)
    {
        return existingURIs[uri].editionsMinted;
    }

    function initializedForURI(string memory uri) public view returns (bool) {
        return existingURIs[uri].initialized;
    }

    event InitializeNFT(
        string name,
        address creator,
        uint256 price,
        uint8 editions,
        string uri
    );

    function initializeNFT(
        string memory name,
        uint256 price,
        uint8 editions,
        string memory uri
    ) public {
        require(
            !existingURIs[uri].initialized,
            "NFT has already been initialized"
        );
        existingURIs[uri].name = name;
        existingURIs[uri].creator = msg.sender;
        existingURIs[uri].price = price;
        existingURIs[uri].editions = editions;
        existingURIs[uri].editionsMinted = 0;
        existingURIs[uri].initialized = true;

        emit InitializeNFT(name, msg.sender, price, editions, uri);
    }

    event PayToMint(uint8 editionsMinted, address mintedTo, string uri);

    function payToMint(string memory uri) public returns (uint256) {
        require(
            existingURIs[uri].initialized,
            "This NFT needs to be initialized before minting"
        );
        require(
            existingURIs[uri].editionsMinted < existingURIs[uri].editions,
            "All editions of this NFT have already been minted"
        );

        bool sent = tap.transferFrom(
            msg.sender,
            existingURIs[uri].creator,
            existingURIs[uri].price
        );
        require(sent, "Failed to transfer token from sender");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[uri].editionsMinted += 1;

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, uri);

        emit PayToMint(existingURIs[uri].editionsMinted, msg.sender, uri);

        return newItemId;
    }
}
