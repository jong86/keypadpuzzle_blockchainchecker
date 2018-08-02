const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');
const compiledContract = require('../build/contracts/SolutionChecker.json');
const networkId = '5777';
const myAddress = '0x45786D0379336984927b20ceB90C2F2628ea97E3';
const contractAddress = compiledContract.networks[networkId].address;
const chai = require('chai');
const expect = chai.expect;


const contract = new web3.eth.Contract(
  compiledContract.abi,
  contractAddress,
  {
    gasPrice: '12345678',
    from: myAddress,
  }
);

const correctAnswer = '129972527136293531402532099719168'

async function sendEthToContract(amount) {
  return await (async () => {
    const options = {
      to: contractAddress,
      from: myAddress,
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
      from: myAddress,
    }

    try {
      await contract.methods.submitAnswer(answer, myAddress).send(options)
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

async function main() {
  await sendEthToContract('0.1');
  await getAccountBalance(myAddress);
  await submitAnswer(correctAnswer);
  await getAccountBalance(myAddress);
}

// main();

describe('contract', () => {
  before(async () => {
    // So the contract has ether to send to account for correct answer
    await sendEthToContract('0.1');
  })

  it('does not send ether to address for incorrect answer', async () => {
    const balanceBefore = await getAccountBalance(myAddress);
    await submitAnswer("42");
    const balanceAfter = await getAccountBalance(myAddress);
    expect(Number(balanceBefore).toFixed(3)).to.equal(Number(balanceAfter).toFixed(3));
  })

  it('sends 0.1 ether to address for correct answer', async () => {
    const balanceBefore = await getAccountBalance(myAddress);
    await submitAnswer(correctAnswer);
    const balanceAfter = await getAccountBalance(myAddress);
    expect(Number(balanceBefore).toFixed(3)).to.equal((Number(balanceAfter) - 0.1).toFixed(3));
  })

  it('does not send ether to address after it has been solved', async () => {
    const balanceBefore = await getAccountBalance(myAddress);
    await submitAnswer(correctAnswer);
    const balanceAfter = await getAccountBalance(myAddress);
    expect(Number(balanceBefore).toFixed(3)).to.equal(Number(balanceAfter).toFixed(3));
  })
})
