// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Artist} from "../contracts/Artist.sol";
import {Event} from "../contracts/Event.sol";
import {Organizator} from "../contracts/Organizator.sol";
import {Ticket} from "../contracts/Ticket.sol";
import {Test} from "forge-std/Test.sol";

contract EventTest is Test {
    Event private eventContract;
    Artist private artistContract;
    Ticket private ticketContract;
    Organizator private organizatorContract;

    address owner = address(this);
    address organizer = address(0xB1);
    address buyer = address(0xC1);

    address artist1 = address(0xA1);
    address artist2 = address(0xA2);
    address artist3 = address(0xA3);

    uint256 ticketPrice = 1 ether;
    uint256 totalTickets = 2;

    uint256[] artistIds;
    uint256[] artistShares;

    function setUp() public {
        // Deploy Artist and Ticket contracts
        artistContract = new Artist();
        ticketContract = new Ticket(address(this));

        // Mint 3 artists
        vm.prank(artist1);
        uint256 id1 = artistContract.mintArtist("Artist1", "ipfs://artist1");
        vm.prank(artist2);
        uint256 id2 = artistContract.mintArtist("Artist2", "ipfs://artist2");
        vm.prank(artist3);
        uint256 id3 = artistContract.mintArtist("Artist3", "ipfs://artist3");

        artistIds = [id1, id2, id3];
        artistShares = [40, 30, 20]; // 90% to artists, 10% to organizer

        // Deploy Organizator contract and add organizer
        address[] memory initialOrganizators = new address[](1);
        initialOrganizators[0] = organizer;
        organizatorContract = new Organizator(owner, initialOrganizators);

        // Deploy Event contract
        eventContract = new Event(
            address(artistContract),
            artistIds,
            artistShares,
            organizer,
            block.timestamp + 1 days,
            "ipfs://metadata",
            ticketPrice,
            totalTickets,
            address(ticketContract),
            address(organizatorContract)
        );

        // Make Event contract the owner of Ticket contract for minting
        ticketContract.transferOwnership(address(eventContract));

        // Fund buyer with ETH
        vm.deal(buyer, 10 ether);
    }

    function testBuyTicketAndSplitPayment() public {
        uint256 a1Before = artist1.balance;
        uint256 a2Before = artist2.balance;
        uint256 a3Before = artist3.balance;
        uint256 orgBefore = organizer.balance;

        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);

        assertEq(ticketContract.balanceOf(buyer), 1, "Buyer should own 1 ticket");

        uint256 a1After = artist1.balance;
        uint256 a2After = artist2.balance;
        uint256 a3After = artist3.balance;
        uint256 orgAfter = organizer.balance;

        assertEq(a1After - a1Before, (ticketPrice * 40) / 100, "Artist1 should get 40%");
        assertEq(a2After - a2Before, (ticketPrice * 30) / 100, "Artist2 should get 30%");
        assertEq(a3After - a3Before, (ticketPrice * 20) / 100, "Artist3 should get 20%");
        assertEq(orgAfter - orgBefore, (ticketPrice * 10) / 100, "Organizer should get 10%");
    }

    function testCheckInOnceOnly() public {
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);

        // Only organizer can check in
        vm.expectRevert("Not a verificator");
        vm.prank(buyer);
        eventContract.checkIn(1);

        // Organizer checks in
        vm.prank(organizer);
        eventContract.checkIn(1);
        assertTrue(eventContract.usedTickets(1), "Ticket should be marked as used");

        // Cannot check in twice
        vm.expectRevert("Already used");
        vm.prank(organizer);
        eventContract.checkIn(1);
    }

    function testCannotExceedTotalTickets() public {
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);

        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);

        // All tickets sold out
        vm.expectRevert("Not enough tickets available");
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);
    }

    function testConstructorRevertsOnMismatchedArtistArrays() public {
        address[] memory initialOrganizators = new address[](1);
        initialOrganizators[0] = organizer;
        Organizator orgContract = new Organizator(owner, initialOrganizators);
        uint256[] memory ids = new uint256[](2);
        uint256[] memory shares = new uint256[](3);
        ids[0] = 1; ids[1] = 2;
        shares[0] = 50; shares[1] = 30; shares[2] = 20;
        vm.expectRevert("Artists and shares length mismatch");
        new Event(
            address(artistContract),
            ids,
            shares,
            organizer,
            block.timestamp + 1 days,
            "ipfs://metadata",
            ticketPrice,
            totalTickets,
            address(ticketContract),
            address(orgContract)
        );
    }

    function testConstructorRevertsOnTotalShareOver100() public {
        address[] memory initialOrganizators = new address[](1);
        initialOrganizators[0] = organizer;
        Organizator orgContract = new Organizator(owner, initialOrganizators);
        uint256[] memory ids = new uint256[](2);
        uint256[] memory shares = new uint256[](2);
        ids[0] = 1; ids[1] = 2;
        shares[0] = 60; shares[1] = 50;
        vm.expectRevert("Total artist share > 100");
        new Event(
            address(artistContract),
            ids,
            shares,
            organizer,
            block.timestamp + 1 days,
            "ipfs://metadata",
            ticketPrice,
            totalTickets,
            address(ticketContract),
            address(orgContract)
        );
    }

    function testConstructorRevertsIfOrganizerNotRegistered() public {
        address[] memory initialOrganizators = new address[](1);
        initialOrganizators[0] = address(0xB2); // Not organizer
        Organizator orgContract = new Organizator(owner, initialOrganizators);
        uint256[] memory ids = new uint256[](1);
        uint256[] memory shares = new uint256[](1);
        ids[0] = 1;
        shares[0] = 100;
        vm.expectRevert("Organizer not registered");
        new Event(
            address(artistContract),
            ids,
            shares,
            organizer,
            block.timestamp + 1 days,
            "ipfs://metadata",
            ticketPrice,
            totalTickets,
            address(ticketContract),
            address(orgContract)
        );
    }

    function testBuyTicketRevertsIfEventPassed() public {
        // Deploy event with past date
        Event pastEvent = new Event(
            address(artistContract),
            artistIds,
            artistShares,
            organizer,
            block.timestamp - 1,
            "ipfs://metadata",
            ticketPrice,
            totalTickets,
            address(ticketContract),
            address(organizatorContract)
        );
        vm.deal(buyer, 10 ether);
        vm.prank(buyer);
        vm.expectRevert("Event already happened");
        pastEvent.buyTicket{value: ticketPrice}(1);
    }

    function testBuyTicketRevertsIfIncorrectETHSent() public {
        vm.deal(buyer, 10 ether);
        vm.prank(buyer);
        vm.expectRevert("Incorrect ETH sent");
        eventContract.buyTicket{value: ticketPrice - 1}(1);
    }

    function testOnlyOrganizerCanAddRemoveVerificator() public {
        address newVerificator = address(0xD1);
        // Non-organizer cannot add
        vm.prank(buyer);
        vm.expectRevert("Only organizer can manage verificators");
        eventContract.addVerificator(newVerificator);
        // Organizer can add
        vm.prank(organizer);
        eventContract.addVerificator(newVerificator);
        assertTrue(eventContract.verificators(newVerificator), "Verificator should be added");
        // Non-organizer cannot remove
        vm.prank(buyer);
        vm.expectRevert("Only organizer can manage verificators");
        eventContract.removeVerificator(newVerificator);
        // Organizer can remove
        vm.prank(organizer);
        eventContract.removeVerificator(newVerificator);
        assertFalse(eventContract.verificators(newVerificator), "Verificator should be removed");
    }

    function testCheckInRevertsIfNotVerificator() public {
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);
        vm.prank(buyer);
        vm.expectRevert("Not a verificator");
        eventContract.checkIn(1);
    }

    function testCheckInRevertsIfAlreadyUsed() public {
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);
        vm.prank(organizer);
        eventContract.checkIn(1);
        vm.prank(organizer);
        vm.expectRevert("Already used");
        eventContract.checkIn(1);
    }

    function testCheckInRevertsIfTicketDoesNotExist() public {
        vm.prank(organizer);
        vm.expectRevert();
        eventContract.checkIn(999);
    }

    function testIsValidReturnsCorrectStatus() public {
        vm.prank(buyer);
        eventContract.buyTicket{value: ticketPrice}(1);
        assertTrue(eventContract.isValid(1), "Ticket should be valid before check-in");
        vm.prank(organizer);
        eventContract.checkIn(1);
        assertFalse(eventContract.isValid(1), "Ticket should be invalid after check-in");
    }

    function testGetArtistIdsReturnsCorrectIds() public view {
        uint256[] memory ids = eventContract.getArtistIds();
        assertEq(ids.length, artistIds.length, "Artist IDs length should match");
        for (uint256 i = 0; i < ids.length; i++) {
            assertEq(ids[i], artistIds[i], "Artist ID should match");
        }
    }
}
