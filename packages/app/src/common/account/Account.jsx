import Nullstack from "nullstack";
import { Tap__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Tap__factory";
// import { StavingChildrenNft__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Nft.sol/StavingChildrenNft__factory";

import { ethers } from "ethers";
class Account extends Nullstack {
  // eth = undefined;

  async hydrate({ settings }) {
    const eth1 = await window.ethereum.enable();
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const res = await provider.send("eth_requestAccounts", []);
    console.log(res);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    // console.log(settings);
    // const eth = eth1[0];
    // 0xbc64892631331ab1b0e96541f3454c61cbbdfc55;
    const factory = await Tap__factory.connect(settings.tap, provider);
    const fac = await factory.connect(signer);
    // console.log(await fac.requestTokens({}));
    console.log(await fac.balanceOf((await signer.getAddress()).toString()));
    // console.log(await factory._deployed());
  }
  async connectWallet() {
    // console.log(StavingChildrenNft__factory);
    // // const factory = await new base.Tap__factory();
    // // factory.attach("").requestTokens();
    // // const fact = await factory.deploy();
    // const provider = new ethers.providers.JsonRpcProvider();
    // const tokenContract = new tap(nftAddress, NFT.abi, provider);
    // const marketContract = new ethers.Contract(
    //   nftMarketAddress,
    //   Market.abi,
    //   provider
    // );
    // const data = await marketContract.fetchMarketItems();
  }
  getTap() {
    return 1.354;
  }

  getAddress() {
    return "0x5a773...6f57c0";
  }

  render() {
    return (
      <div style="" class="flex justify-end">
        <div class="flex items-center">
          <div class="max-w-[14px] max-h-[17px]">
            <img src="tap.png" class="object-cover"></img>
          </div>
          <div class="pl-2 text-sm flex flex-col items-center">
            <span class="font-bold">
              {this.getTap()}{" "}
              <span class="text-shadow-white font-medium">TAP</span>
            </span>
            <div>
              <span class="text-shadow-white">{this.getAddress()}</span>
            </div>
          </div>
        </div>
        <div class="flex items-center pl-10">
          <div class="max-w-[14px] max-h-[17px]">
            <img src="account_circle.png" class="object-cover"></img>
          </div>
          <span class="pl-2 font-bold"> My account</span>
        </div>
      </div>
    );
  }
}

export default Account;
