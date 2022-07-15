import Nullstack from "nullstack";
import CubeWrapperNftCardSmall from "../../common/cube/CubeWrapper";

class BuyNft extends Nullstack {
  render() {
    return (
      <div style="min-height:66vh" class="flex justify-between items-center">
        <div class="flex-row items-center justify-center">
          <div>
            <span class="glow font-bold leading-[42px] text-[30px]">
              Buy a nft of a dehytrated child
              <br /> and automatically donate an <br />
              <mark>nft of a water bottle</mark>
            </span>
          </div>
          <div>
            <span class="glow leading-[28px] text-[20px]">
              Treat your charity like your investments. Expect ROI.
            </span>
          </div>
        </div>
        <div class="flex">
          <div class="scale-100">
            <CubeWrapperNftCardSmall
              nft={{
                name: "NFT NAME",
                creatorName: "Creator's Name",
                price: 0.49,
                imgsrc: "stopboy.png",
              }}
            ></CubeWrapperNftCardSmall>
          </div>
          <div style="padding-left:40px; padding-top:100px" class="scale-75">
            <CubeWrapperNftCardSmall
              nft={{
                name: "NFT NAME",
                creatorName: "Creator's Name",
                price: 0.49,
                imgsrc: "stopboy.png",
              }}
            ></CubeWrapperNftCardSmall>
          </div>
          <div style=" height: 230px; position: relative;">
            <div style="right: 200px; width: 300px; height: 230px; position: absolute; border: 3.2776px solid #FFFFFF; border-radius: 42.6088px;"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyNft;
