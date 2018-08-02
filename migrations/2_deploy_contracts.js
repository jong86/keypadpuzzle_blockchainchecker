var SolutionChecker = artifacts.require("./SolutionChecker.sol");

module.exports = function(deployer) {
  deployer.deploy(SolutionChecker);
};