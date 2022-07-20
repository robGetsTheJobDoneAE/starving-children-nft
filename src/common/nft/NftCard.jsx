import Button from "../button/Button";
import CubeMedium from "../cube/CubeMedian";
import Nullstack from "nullstack";
class NftCard extends Nullstack {
  render({ nft }) {
    console.log(nft);
    return (
      <div class="flex flex-col items-start  bg-black h-full w-full p-1">
        <img
          style="height: 60%; width:100%; object-fit: cover;"
          src={nft.imgsrc}
        ></img>
        <span class="pt-4 leading-[28px] font-bold text-[20px]">
          {nft.name}
        </span>
        <span class="font-normal text-[15px]">{nft.creatorName}</span>
        <span class="font-normal text-[15px] leading-[21px]">Price</span>
        <div class="flex items-center">
          <div class="max-w-[14px] max-h-[17px]">
            <img src="tap.png" class="object-cover"></img>
          </div>
          <span class="pl-2 font-bold text-[20px] leading-[28px]">
            {nft.price}
          </span>
        </div>
      </div>
    );
  }
}

export default NftCard;
