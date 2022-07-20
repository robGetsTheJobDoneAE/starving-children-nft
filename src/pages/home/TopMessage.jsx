import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import CubeSmall from "../../common/cube/CubeSmall";
import Nullstack from "nullstack";
class TopMessage extends Nullstack {
  renderChildImg({ img, body, header }) {
    return (
      <div class="flex flex-col items-center">
        <img style="height:50%" src={img} alt="user image" />
        <span class="font-bold leading-[28px] text-[15px]">{header}</span>
        <span class="pt-4 text-center leading-[21px] text-[15px]">{body}</span>
      </div>
    );
  }

  render() {
    return (
      <div class="h-[67vh] flex flex-col items-center">
        <div class="font-bold leading-[49px] text-[35px] text-center">
          <span class="glow ">
            Don't let these weary children lose
            <br /> their
          </span>{" "}
          <mark> last shreds of hope</mark>
        </div>
        <div class="pt-10 grid grid-cols-3 gap-3">
          <ChildImg
            img="circle.png"
            header="Unimaginable poverty"
            body="There are children raised in unimaginable poverty. Not only are they deprived of clean water, nutritious food, reliable electricity and educational opportunities... but they also lack NFTs"
          ></ChildImg>
          <ChildImg
            header="They need you"
            img="happy.png"
            body="Please offer your support. Even if a warlord steals their family’s smartphone, you will have provided a “token” of non-fungible support."
          ></ChildImg>
          <ChildImg
            header="A bottle of hope"
            img="chairboy.png"
            body="Every dehydrated child can receive an NFT of a water bottle today, if only you can find it in your heart and crypto-wallet to give."
          ></ChildImg>
        </div>
      </div>
    );
  }
}

export default TopMessage;
