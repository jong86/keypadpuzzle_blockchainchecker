pragma solidity ^0.4.21;

contract Storage {
    uint256 solution;
    uint256 winners;

    constructor() public {
        solution = 42;
        winners = 0;
    }

    function set(uint256 data) public {
        if (data == solution) {
            winners = winners + 1;
        }
    }

    function get() public view returns (uint256) {
        return winners;
    }
}