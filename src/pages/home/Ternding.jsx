import CubeWrapperNftCardSmall from "../../common/cube/CubeWrapper";
import Nullstack from "nullstack";
import axios from "axios";

import { StarvingChildren__factory } from "../../../typechain-types/factories/contracts/StarvingChildren__factory";
import { ethers } from "ethers";
class Trending extends Nullstack {
  nfts = [];
  async initiate() {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const signer = provider.getSigner(0);
    const nft = StarvingChildren__factory.connect(
      "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      provider
    );
    const transfer = await nft.filters.InitializeNFT();

    const events = await nft.queryFilter(transfer);
    console.log("dad", events);
    for (const event of events) {
      try {
        console.log(event);
        const res = await axios.get(`https://ipfs.io/ipfs/${event.args.uri}`);
        const data = res.data;

        const nft = {
          name: event.args.name,
          creatorName: "event.args.creator",
          price: 10,
          imgsrc: `https://ipfs.io/${data.image.replace("ipfs:/", "ipfs/")}`,
        };
        this.nfts.push(nft);
      } catch (E) {
        console.error(E);
      }
    }
  }
  getTrending() {
    console.log("CHCKE ME", this.nfts);
    return this.nfts;
  }
  render() {
    return (
      <div class="h-screen">
        <span class="glow font-bold leading-[49px] text-[35px]">
          Trending NFTs
        </span>
        <div class="pt-10 grid grid-cols-4 gap-4">
          {this.getTrending().map((e) => {
            return <CubeWrapperNftCardSmall nft={e}></CubeWrapperNftCardSmall>;
          })}
        </div>
      </div>
    );
  }
}

export default Trending;
