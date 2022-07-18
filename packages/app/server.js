import Nullstack from "nullstack";
import Application from "./src/Application";
import { StavingChildrenNft__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Nft.sol/StavingChildrenNft__factory";
import { ethers } from "ethers";
const context = Nullstack.start(Application);

context.start = async function start() {
  console.log(StavingChildrenNft__factory);
  console.log(ethers);
  // https://nullstack.app/application-startup
};

export default context;
