pragma solidity ^0.4.21;

contract SolutionChecker {
    bytes32 hashedSolution;
    bool hasBeenSolved;

    constructor() public {
        hashedSolution = hex"60d843763deee5470f00ae2d7b2f00f5a4ad65f23ff60bb2d362c4516a0e9adb";
        hasBeenSolved = false;
    }

    function submitAnswer(string answer, address addr) public {
        bytes memory encodedAnswer = abi.encodePacked(answer);
        bytes32 hashedAnswer = sha256(encodedAnswer);

        if (hashedAnswer == hashedSolution && !hasBeenSolved) {
            addr.transfer(0.1 ether);
            hasBeenSolved = true;
        }
    }

    function() external payable { }
}
