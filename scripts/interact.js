const ethers = require("ethers");
require("dotenv").config();
const contractJson = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json")

const GOERLI_API_KEY = process.env.GOERLI_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


const alchemyProvider = new ethers.providers.AlchemyProvider(network='goerli', GOERLI_API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contractAddress = '0x851587009CE14d76818D05d7E348567794a393De';

const buyMeACoffee = new ethers.Contract(contractAddress, contractJson.abi, signer);



async function buyCoffee() {
    const trx = {value: ethers.utils.parseEther("0.001")};
    const buyCoffee = await buyMeACoffee.buyCoffee("Hi Sam" ,"I am the bot!", trx);
    // const receipt = await buyCoffee.wait();
    console.log(buyCoffee);
}

async function changeWithdrawer() {
    // const nonceOfSigner = await signer.getTransactionCount();
    // console.log("The next nonce is", nonceOfSigner);
    const trx = {gasLimit: 30000, nonce:nonce};
    const newWithdrawer = "0x86adB333bc3F6f82C1c754D08880acFfB87B81FE";
    const changeWithdrawer = await buyMeACoffee.changeWithdrawer(newWithdrawer,trx);
    // const receipt = await changeWithdrawer.wait();
    console.log(changeWithdrawer);
}

async function withdraw() {
    // const nonceOfSigner = await signer.getTransactionCount();
    // console.log("The next nonce is", nonceOfSigner);
    // const trx = {gasLimit: 30000};
    const withdraw = await buyMeACoffee.withdraw();
    // const receipt = await withdraw.wait();
    console.log(withdraw);
}

async function main(){
    // const nonce = await signer.getTransactionCount();
    // console.log("The nonce is ", nonce);
    // await buyCoffee();
    // await changeWithdrawer(nonce+2);
    await withdraw();
}

main().catch((error) => {console.log(error)});

