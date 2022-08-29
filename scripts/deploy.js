const hre = require("hardhat");

async function deploy() {
    const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log("BuyMeACoffee address:", buyMeACoffee.address);
}

deploy().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

