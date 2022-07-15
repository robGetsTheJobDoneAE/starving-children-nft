import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import CubeSmall from "../../common/cube/CubeSmall";
import CubeWrapperNftCardSmall from "../../common/cube/CubeWrapper";
import Nullstack, { NullstackClientContext } from "nullstack";

import NftCard from "../../common/nft/NftCard";
class Trending extends Nullstack {
  getTrending() {
    return [
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "swingboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "stopboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "flowerboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "fenceboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "swingboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "stopboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "flowerboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "fenceboy.png",
      },
    ];
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
