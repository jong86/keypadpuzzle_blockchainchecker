const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545');
const compiledContract = require('./build/contracts/Storage.json');
const networkId = '5777';
const myAddress = '0x45786D0379336984927b20ceB90C2F2628ea97E3';

const contract = new web3.eth.Contract(
  compiledContract.abi,
  compiledContract.networks[networkId].address,
  {
    gasPrice: '12345678',
    from: myAddress,
  }
);

async function submitAnswerAndCheck() {
  try {
    const options = {
      to: compiledContract.networks[networkId].address,
      from: myAddress,
    }

    const answer = "129972527136293531402532099719168"
    // const answer = "12997252713629353140253209971916"

    const response = await contract.methods.submitAnswer(answer, myAddress).send(options)
    console.log('response1', response);
  } catch (e) {
    console.log(e)
  }

  try {
    const options = {
      from: myAddress,
      // gas: 100000,
    }

    const response = await contract.methods.getSolvers().call(options)
    console.log('response2', response);
    if (response.includes(myAddress)) {
      console.log("The contract said the answer was correct!")
    }
  } catch (e) {
    console.log(e)
  }
}

submitAnswerAndCheck();