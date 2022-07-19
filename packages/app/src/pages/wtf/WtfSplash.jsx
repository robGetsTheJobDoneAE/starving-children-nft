import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack from "nullstack";
import ConnectWallet from "../../common/account/ConnectWallet";
class WtfSpalsh extends Nullstack {
  render() {
    return (
      <div class="flex flex-col items-center text-center min-h-screen pt-10">
        <div class="leading-[49px] text-[35px] font-bold">
          <span class="glow">
            Treat your charity <br />
            like your investments <br />
            <mark>- Expect ROI</mark>
          </span>
        </div>
        <div class="pt-[21px] leading-[31px]">
          Bringing attention to effective altruism,
          <br /> and reminding you that not all charities are created equal
        </div>
        <ConnectWallet></ConnectWallet>
      </div>
    );
  }
}

export default WtfSpalsh;
