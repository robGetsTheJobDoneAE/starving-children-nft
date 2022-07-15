import Nullstack, { NullstackClientContext } from "nullstack";
import base from "@starving/contracts/dist/typechain-types";
import ethers from "ethers";
class Account extends Nullstack {
  hydrate() {
    this.connectWallet();
  }
  async connectWallet() {
    const factory = await new base.Tap__factory({});
    const fact = await factory.deploy();
    fact.requestTokens();
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new tap(nftAddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftMarketAddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();
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
