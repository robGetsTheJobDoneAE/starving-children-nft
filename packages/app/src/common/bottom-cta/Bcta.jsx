import Nullstack from "nullstack";
import CubeWrapperNftCardSmall from "../cube/CubeWrapper";

class Bcta extends Nullstack {
  render() {
    return (
      <div
        style="min-height:66vh"
        class="flex flex-col justify-center items-center"
      >
        <div>
          <span class="glow font-bold leading-[49px] text-[35px]">
            With great <mark>power</mark> comes non-fungibility
          </span>
        </div>
        <div class="pt-4">
          <span class="leading-[28px] text-[20px]">
            What Uncle Ben and Uncle Satoshi mean is that you can use your
            <br />
            “power” to change the world... by minting a few NFTs.
          </span>
        </div>
        <div class="pt-6">
          <button style="padding: 14px 37px 14px 34px; background: #FF8896;">
            <span
              class="leading-[28px] text-[20px] font-bold"
              style="color:black;"
            >
              BUY A NFT TO A STARVING CHILD
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Bcta;
