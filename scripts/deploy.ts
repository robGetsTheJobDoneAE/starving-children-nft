import { ethers } from "hardhat";
async function main() {
  const [deployer] = await ethers.getSigners();
  const deployerAddress = await deployer.getAddress();
  console.log("Deploying the contracts with the account:", deployerAddress);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const ThoughtsAndPrayers = await ethers.getContractFactory(
    "ThoughtsAndPrayers"
  );
  const token = await ThoughtsAndPrayers.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  const Vendor = await ethers.getContractFactory("Vendor");
  const vendor = await Vendor.deploy(token.address);
  await vendor.deployed();

  console.log("Vendor address:", vendor.address);

  await token.transfer(vendor.address, await token.balanceOf(deployerAddress));
  await vendor.transferOwnership(deployerAddress);

  const StarvingChildren = await ethers.getContractFactory("StarvingChildren");
  const nft = await StarvingChildren.deploy(token.address);
  await nft.deployed();

  console.log("Nft address:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
