pragma solidity ^0.4.21;

contract Storage {
    uint256 state;

    function set(uint256 data) public {
        state = data;
    }

    function get() public view returns (uint256) {
        return state;
    }
}