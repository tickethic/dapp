// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "../contracts/Artist.sol";
import "forge-std/Test.sol";

contract ArtistTest is Test {

    function testSafeMintArtist() public {
        address user = address(0x123);
        Artist artistContract = new Artist();
        vm.prank(user);
        uint256 artistId = artistContract.mintArtist("Test Artist", "ipfs://testartist");
        (string memory name, string memory metadataURI) = artistContract.getArtistInfo(artistId);
        assertEq(name, "Test Artist");
        assertEq(metadataURI, "ipfs://testartist");
    }
}
