import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack from "nullstack";
class Details extends Nullstack {
  render() {
    return (
      <div class="flex flex-col items-center text-center min-h-[80vh] pt-10">
        <div class="leading-[49px] text-[35px] ">
          <span class="glow">Giving to charities that count</span>
        </div>
        <span class="pt-4 leading-[31px] text-[20px] text-center">
          Some “charities” manipulate emotions with imagery. This helps
          <br />
          fundraise, but not necessarily those in need. Treat your charity
          <br />
          like any other investment. Verify that your hard-earned money
          <br />
          benefits those in greatest need. Know what percentage of each
          <br />
          donation is retained vs. distributed!
        </span>
        <span class="pt-4 leading-[31px] text-[20px] text-center">
          This project brings awareness to the issue of inefficient
          <br />
          charities that keep most of the funds they raise internally. Let’s
          <br />
          help altruistic people give to the most efficient, effective
          <br />
          charities!
          <br />
        </span>
        <span class="pt-4 leading-[31px] text-[20px] ">
          Note: All monetary proceeds from this project will be donated to
          charities deemed effective by GiveWell.
        </span>
        <div class="pt-8 leading-[28px] text-[20px]">
          <Button link={"/explore"} input={10} variant="yellow">
            <span class="pl-2">Give what we can</span>
          </Button>
        </div>
      </div>
    );
  }
}

export default Details;
