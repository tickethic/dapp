// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ERC721, ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Artist is ERC721URIStorage, Ownable {
    uint256 public nextArtistId = 1;

    struct ArtistInfo {
        string name;
        string metadataUri;
    }

    mapping(uint256 => ArtistInfo) public artistInfos;
    mapping(address => bool) public hasMintedArtist;

    constructor() ERC721("Artist", "ARTIST") Ownable(msg.sender) {}

    function mintArtist(
        string memory artistName,
        string memory artistMetadataUri
    ) external returns (uint256) {
        require(!hasMintedArtist[msg.sender], "Address has already minted an artist");
        
        uint256 artistId = nextArtistId++;
        _safeMint(msg.sender, artistId);
        _setTokenURI(artistId, artistMetadataUri);
        artistInfos[artistId] = ArtistInfo(artistName, artistMetadataUri);
        hasMintedArtist[msg.sender] = true;
        
        return artistId;
    }

    function getArtistInfo(uint256 artistId) external view returns (string memory name, string memory metadataUri) {
        ArtistInfo storage info = artistInfos[artistId];
        return (info.name, info.metadataUri);
    }

    /**
     * @dev Get all artist IDs that have been minted
     * @return Array of all artist IDs
     */
    function getAllArtistIds() external view returns (uint256[] memory) {
        uint256 totalArtists = nextArtistId - 1;
        uint256[] memory allArtists = new uint256[](totalArtists);
        
        for (uint256 i = 1; i < nextArtistId; i++) {
            allArtists[i - 1] = i;
        }
        
        return allArtists;
    }

    /**
     * @dev Get artist name by ID
     * @param artistId The artist ID
     * @return Artist name
     */
    function getArtistName(uint256 artistId) external view returns (string memory) {
        require(artistId > 0 && artistId < nextArtistId, "Artist does not exist");
        return artistInfos[artistId].name;
    }

    /**
     * @dev Get total number of artists minted
     * @return Total number of artists
     */
    function getTotalArtists() external view returns (uint256) {
        return nextArtistId - 1;
    }

    /**
     * @dev Get artist info by ID (name and owner address)
     * @param artistId The artist ID
     * @return name Artist name
     * @return owner Artist owner address
     * @return metadataUri Artist metadata URI
     */
    function getArtistDetails(uint256 artistId) external view returns (string memory name, address owner, string memory metadataUri) {
        require(artistId > 0 && artistId < nextArtistId, "Artist does not exist");
        ArtistInfo storage info = artistInfos[artistId];
        return (info.name, ownerOf(artistId), info.metadataUri);
    }

    /**
     * @dev Check if an address has already minted an artist
     * @param userAddress The address to check
     * @return True if the address has minted an artist, false otherwise
     */
    function hasAddressMintedArtist(address userAddress) external view returns (bool) {
        return hasMintedArtist[userAddress];
    }

    /**
     * @dev Get the artist ID owned by a specific address (if any)
     * @param userAddress The address to check
     * @return artistId The artist ID owned by the address, or 0 if none
     */
    function getArtistIdByAddress(address userAddress) external view returns (uint256) {
        if (!hasMintedArtist[userAddress]) {
            return 0;
        }
        
        // Find the artist ID owned by this address
        for (uint256 i = 1; i < nextArtistId; i++) {
            if (ownerOf(i) == userAddress) {
                return i;
            }
        }
        
        return 0;
    }
}