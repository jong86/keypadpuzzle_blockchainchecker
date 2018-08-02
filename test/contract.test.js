require('dotenv').config();
const { MY_ADDRESS, NETWORK_ID, RPC_SERVER } = process.env
const Web3 = require('web3');
const web3 = new Web3(RPC_SERVER);
const compiledContract = require('../build/contracts/SolutionChecker.json');
const contractAddress = compiledContract.networks[NETWORK_ID].address;
const chai = require('chai');
const expect = chai.expect;


const contract = new web3.eth.Contract(
  compiledContract.abi,
  contractAddress,
  {
    gasPrice: '12345678',
    from: MY_ADDRESS,
  }
);

const correctAnswer = '129972527136293531402532099719168'

async function sendEthToContract(amount) {
  return await (async () => {
    const options = {
      to: contractAddress,
      from: MY_ADDRESS,
      value: web3.utils.toWei(amount)
    }

    try {
      await web3.eth.sendTransaction(options)
    } catch (e) {
      console.trace(e);
    }
  })()
}

async function submitAnswer(answer) {
  return await (async () => {
    const options = {
      to: contractAddress,
      from: MY_ADDRESS,
    }

    try {
      await contract.methods.submitAnswer(answer, MY_ADDRESS).send(options)
    } catch (e) {
      console.trace(e);
    }
  })()
}

async function getAccountBalance(address) {
  return await (async () => {
    let response

    try {
      response = await web3.eth.getBalance(address)
    } catch (e) {
      console.trace(e);
    }

    return web3.utils.fromWei(response, 'ether')
  })()
}

describe('contract', () => {
  before(async () => {
    // So the contract has ether to send to account for correct answer
    await sendEthToContract('0.1');
  })

  it('does not send ether to address for incorrect answer', async () => {
    const balanceBefore = await getAccountBalance(MY_ADDRESS);
    await submitAnswer('42');
    const balanceAfter = await getAccountBalance(MY_ADDRESS);
    expect(Number(balanceBefore).toFixed(3)).to.equal(Number(balanceAfter).toFixed(3));
  })

  it('sends 0.1 ether to address for correct answer', async () => {
    const balanceBefore = await getAccountBalance(MY_ADDRESS);
    await submitAnswer(correctAnswer);
    const balanceAfter = await getAccountBalance(MY_ADDRESS);
    expect(Number(balanceBefore).toFixed(3)).to.equal((Number(balanceAfter) - 0.1).toFixed(3));
  })

  it('does not send more ether after it has been solved', async () => {
    const balanceBefore = await getAccountBalance(MY_ADDRESS);
    await submitAnswer(correctAnswer);
    const balanceAfter = await getAccountBalance(MY_ADDRESS);
    expect(Number(balanceBefore).toFixed(3)).to.equal(Number(balanceAfter).toFixed(3));
  })
})
