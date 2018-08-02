pragma solidity ^0.4.21;

contract Storage {
    uint256 solution;
    address[] winners;

    constructor() public {
        solution = 42;
    }

    function submitAnswer(uint256 answer, address addr) public {
        if (answer == solution) {
            winners.push(addr);
        }
    }

    function getWinners() public view returns (address[]) {
        return winners;
    }
}