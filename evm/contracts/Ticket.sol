// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721, ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Ticket is ERC721URIStorage, Ownable {
    uint256 public nextTicketId = 1;

    constructor(address eventOrganizer) ERC721("EventTicket", "TIX") Ownable(eventOrganizer) {}

    function mintTicket(address to, string memory metadataUri) external onlyOwner returns (uint256) {
        uint256 tokenId = nextTicketId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataUri);
        return tokenId;
    }
}