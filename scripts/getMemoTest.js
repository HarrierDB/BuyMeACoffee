const hre = require("hardhat");

async function main() {
    // 0x5FbDB2315678afecb367f032d93F642f64180aa3
    const buyMeACoffee = await hre.ethers.getContractAt(
        'BuyMeACoffee',
        '0x5FbDB2315678afecb367f032d93F642f64180aa3')
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});