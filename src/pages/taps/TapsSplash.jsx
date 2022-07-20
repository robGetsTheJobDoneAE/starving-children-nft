import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack from "nullstack";
import ConnectWallet from "../../common/account/ConnectWallet";
class TapsSplash extends Nullstack {
  render() {
    return (
      <div class="flex flex-col items-center text-center min-h-screen pt-20">
        <div class="leading-[49px] text-[35px] font-bold">
          <span class="glow">
            Meet our token <br />
          </span>
        </div>
        <div class="leading-[63px] text-[35px] font-bold">
          <span class="glow">
            <mark>Toughts and Prayers</mark>
          </span>
        </div>
        <div class="leading-[31px] text-[20px] font-normal">
          <span>
            Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit, sed
            do eiusmod tempor incididunt
            <br /> ut labore et dolore magna aliqua.
          </span>
        </div>
        <ConnectWallet></ConnectWallet>
      </div>
    );
  }
}

export default TapsSplash;
