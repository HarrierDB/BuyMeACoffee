// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


// 0x5FbDB2315678afecb367f032d93F642f64180aa3
async function test() {
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee address:", buyMeACoffee.address);
  return buyMeACoffee;
}
//
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);

}

async function generatingBuyers(number) {
  const buyersList = new Array(number);
  for (let i=0; i<buyersList.length; i++) {
    buyersList[i] = await hre.ethers.getSigners();
  }
  return buyersList;
}


async function main() {
  const buyMeACoffee = await test();
  const balanceOfAddress = await getBalance(buyMeACoffee.address);
  console.log("The balance of contract is:",balanceOfAddress);

  // set a number to observe
  const number = 5;
  const buyersList = await generatingBuyers(number);
  const owner = buyersList[0][0];

  console.log("Let's see the balance of buyers:")

  for (let i=0; i<buyersList.length; i++) {
    const balanceOfBuyer = await getBalance(buyersList[0][i].address);
    console.log(`${buyersList[0][i].address} has ${balanceOfBuyer}`);
  }

  console.log("People preparing to buy coffee:", buyersList.length);

  for (let i=0; i<buyersList.length; i++) {
    const tipInt = i+1; //1,2,3,4,5
    tip = {value: hre.ethers.utils.parseEther(`${tipInt}`)};
    await buyMeACoffee.connect(buyersList[0][i]).buyCoffee(tip);
    const balanceOfBuyer = await getBalance(buyersList[0][i].address);
    console.log(`${buyersList[0][i].address} has ${balanceOfBuyer}`);
  }

  const balanceOfAddressAfterBuy = await getBalance(buyMeACoffee.address);
  console.log("The balance of contract is:",balanceOfAddressAfterBuy);

  // withdraw
  await buyMeACoffee.connect(owner).withdraw(2);
  // see balance of owner
  const balanceOfOwner = await getBalance(owner.address);
  console.log("The balance of owner is:",balanceOfOwner);

  const balanceOfAddressAfterWithdraw = await getBalance(buyMeACoffee.address);
  console.log("The balance of contract is:",balanceOfAddressAfterWithdraw);

  const memoList = await buyMeACoffee.connect(owner).getMemos();
  // console.log("The memos of contract are:",memoList);
  for (const memo of memoList) {
    console.log(`At Timestamp ${memo.timestamp}, account ${memo.sender} sent ${memo.amount/ 10**18} ETH for a cup of coffee.`);
  }
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
