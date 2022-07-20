import Nullstack from "nullstack";
import { ethers } from "ethers";
import { ThoughtsAndPrayers__factory } from "../../../typechain-types/factories/contracts/ThoughtsAndPrayers__factory";
// Token address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Vendor address: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
// Nft address: 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
class Account extends Nullstack {
  balance = "";
  async initiate({ wallet }) {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const signer = provider.getSigner(0);
    const tap = ThoughtsAndPrayers__factory.connect(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      provider
    );
    const refreshBalance = async () => {
      const balanceWei = await tap.balanceOf(wallet);
      this.balance = ethers.utils.formatUnits(balanceWei, 18);
    };
    refreshBalance();

    provider.on(tap.filters.Transfer(wallet), refreshBalance);
    provider.on(tap.filters.Transfer(null, wallet), refreshBalance);
  }

  getTap(tap) {
    return this.balance;
  }

  getAddress({ tap, wallet }) {
    const add = wallet as string;
    const pre = add.substring(0, 7);
    const post = add.substring(add.length - 6, add.length);
    return pre + "..." + post;
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
