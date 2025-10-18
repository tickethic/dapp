// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Artist} from "./Artist.sol";
import {Ticket} from "./Ticket.sol";
import {Organizator} from "./Organizator.sol";
import {Event} from "./Event.sol";

contract EventManager {
    Artist public artistContract;
    Ticket public ticketContract;
    Organizator public organizatorContract;
    
    // Mapping to store created events
    mapping(uint256 => address) public events;
    uint256 public nextEventId = 1;
    
    // Events
    event EventCreated(uint256 indexed eventId, address indexed eventAddress, address indexed organizer);
    
    constructor(
        address _artistContract,
        address _ticketContract,
        address _organizatorContract
    ) {
        artistContract = Artist(_artistContract);
        ticketContract = Ticket(_ticketContract);
        organizatorContract = Organizator(_organizatorContract);
    }
    
    /**
     * @dev Create a new event
     * @param _artistIds IDs of artists participating in the event
     * @param _artistShares Revenue shares for each artist (in %)
     * @param _organizer Organizer address
     * @param _date Event date timestamp
     * @param _metadataUri Event metadata URI
     * @param _ticketPrice Ticket price in wei
     * @param _totalTickets Total number of tickets available
     * @return eventId ID of the newly created event
     * @return eventAddress Address of the deployed Event contract
     */
    function createEvent(
        uint256[] memory _artistIds,
        uint256[] memory _artistShares,
        address _organizer,
        uint256 _date,
        string memory _metadataUri,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) external returns (uint256 eventId, address eventAddress) {
        // Validate inputs
        require(_artistIds.length > 0, "At least one artist required");
        require(_artistIds.length == _artistShares.length, "Artists and shares length mismatch");
        require(_organizer != address(0), "Invalid organizer address");
        require(_date > block.timestamp, "Event date must be in the future");
        require(bytes(_metadataUri).length > 0, "Metadata URI required");
        require(_ticketPrice > 0, "Ticket price must be greater than 0");
        require(_totalTickets > 0, "Total tickets must be greater than 0");
        
        // Validate artist shares
        uint256 totalShare = 0;
        for (uint256 i = 0; i < _artistShares.length; i++) {
            totalShare += _artistShares[i];
        }
        require(totalShare <= 100, "Total artist share cannot exceed 100%");
        
        // Validate that organizer is registered
        require(organizatorContract.isOrganizator(_organizer), "Organizer not registered");
        
        // Validate that all artists exist
        for (uint256 i = 0; i < _artistIds.length; i++) {
            try artistContract.ownerOf(_artistIds[i]) returns (address) {
                // Artist exists
            } catch {
                revert("Artist does not exist");
            }
        }
        
        // Create a new ticket contract for this event
        Ticket newTicketContract = new Ticket(address(this));
        
        // Create the new event
        Event newEvent = new Event(
            address(artistContract),
            _artistIds,
            _artistShares,
            _organizer,
            _date,
            _metadataUri,
            _ticketPrice,
            _totalTickets,
            address(newTicketContract),
            address(organizatorContract)
        );
        
        // Transfer ownership of the new ticket contract to the event
        newTicketContract.transferOwnership(address(newEvent));
        
        // Store the event
        eventId = nextEventId++;
        events[eventId] = address(newEvent);
        
        // Emit the event
        emit EventCreated(eventId, address(newEvent), _organizer);
        
        return (eventId, address(newEvent));
    }
    
    /**
     * @dev Get event address by ID
     * @param _eventId Event ID
     * @return Event contract address
     */
    function getEventAddress(uint256 _eventId) external view returns (address) {
        require(_eventId > 0 && _eventId < nextEventId, "Event does not exist");
        return events[_eventId];
    }
    
    /**
     * @dev Get total number of events created
     * @return Total events count
     */
    function getTotalEvents() external view returns (uint256) {
        return nextEventId - 1;
    }
    
    /**
     * @dev Get event information
     * @param _eventId Event ID
     * @return eventAddress Event contract address
     * @return organizer Event organizer
     * @return date Event date
     * @return ticketPrice Ticket price
     * @return totalTickets Total tickets available
     * @return soldTickets Number of tickets sold
     */
    function getEventInfo(uint256 _eventId) external view returns (
        address eventAddress,
        address organizer,
        uint256 date,
        uint256 ticketPrice,
        uint256 totalTickets,
        uint256 soldTickets
    ) {
        require(_eventId > 0 && _eventId < nextEventId, "Event does not exist");
        
        eventAddress = events[_eventId];
        Event eventContract = Event(eventAddress);
        
        organizer = eventContract.organizer();
        date = eventContract.date();
        ticketPrice = eventContract.ticketPrice();
        totalTickets = eventContract.totalTickets();
        soldTickets = eventContract.soldTickets();
    }
    
    /**
     * @dev Get all event addresses
     * @return Array of event addresses
     */
    function getAllEvents() external view returns (address[] memory) {
        uint256 totalEvents = nextEventId - 1;
        address[] memory eventAddresses = new address[](totalEvents);
        
        for (uint256 i = 1; i <= totalEvents; i++) {
            eventAddresses[i - 1] = events[i];
        }
        
        return eventAddresses;
    }
    
    /**
     * @dev Get ticket contract address for an event
     * @param _eventId Event ID
     * @return Ticket contract address
     */
    function getEventTicketContract(uint256 _eventId) external view returns (address) {
        require(_eventId > 0 && _eventId < nextEventId, "Event does not exist");
        
        address eventAddress = events[_eventId];
        Event eventContract = Event(eventAddress);
        
        return address(eventContract.ticketContract());
    }
}
