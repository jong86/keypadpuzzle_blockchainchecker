pragma solidity ^0.4.21;

contract Storage {
    bytes32 hashedSolution;
    address[] solvers;

    constructor() public {
        hashedSolution = hex"60d843763deee5470f00ae2d7b2f00f5a4ad65f23ff60bb2d362c4516a0e9adb";
    }

    function submitAnswer(string answer, address addr) public {
        bytes memory encodedAnswer = abi.encodePacked(answer);
        bytes32 hashedAnswer = sha256(encodedAnswer);

        if (hashedAnswer == hashedSolution && !hasAddressAlreadyWon(addr)) {
            solvers.push(addr);
        }
    }

    function getSolvers() public view returns (address[]) {
        return solvers;
    }

    function hasAddressAlreadyWon(address addr) private view returns (bool) {
        // To prevent an address from being added twice to solvers

        uint solversLength = solvers.length;

        for (uint i = 0; i < solversLength; i++) {
            if (solvers[i] == addr) {
                return true;
            }
        }

        return false;
    }
}
