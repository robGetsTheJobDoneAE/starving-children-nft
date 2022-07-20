import Nullstack from "nullstack";
import NftCard from "../nft/NftCard";
import CubeSmall from "./CubeSmall";

class CubeWrapperNftCardSmall extends Nullstack {
  render({ nft }) {
    return (
      <div>
        <div class="relative">
          <CubeSmall />
          <div class="absolute bottom-[27px] left-[5px] h-[330px]  w-[246px]">
            <NftCard nft={nft}></NftCard>
          </div>
        </div>
      </div>
    );
  }
}

export default CubeWrapperNftCardSmall;
