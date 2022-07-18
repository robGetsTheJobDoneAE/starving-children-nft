import Nullstack from "nullstack";
import { ethers } from "ethers";
import { Tap__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Tap__factory";
import { Tap } from "@starving/contracts/dist/typechain-types/contracts/Tap";
// import { StavingChildrenNft__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Nft.sol/StavingChildrenNft__factory";

class Account extends Nullstack {
  balance = 0;
  // eth = undefined;

  async hydrate({ wallet }) {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(provider.getSigner());
    const signer = provider.getSigner(0);
    const tap = Tap__factory.connect(
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      signer
    );
    const balenc = await tap.balanceOf(wallet);
    this.balance = ethers.utils.formatEther(balenc);
    // await tap.requestTokens();
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
  getTap(tap) {
    return this.balance;
  }

  getAddress({ tap, wallet }) {
    return wallet;
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
