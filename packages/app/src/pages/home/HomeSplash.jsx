import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack, { NullstackClientContext } from "nullstack";
class HomeSplash extends Nullstack {
  renderCTALeft() {
    return (
      <div class="flex flex-col">
        <div class="leading-[31px] text-[25px]">
          <span class="glow">
            Your kindness can make <br />
            the world of a difference <br />
            for a{" "}
          </span>{" "}
          <mark> child's crypto wallet.</mark>
        </div>
        <div class="pt-[21px]">
          They may not have food, but you can help <br />
          an NFT-less child with this buy one, give one <br />
          opportunity. Every child deserves an NFT
        </div>
        <div class="flex pt-10">
          <div class="pr-4">
            <Button link={"/explore"} input={10} variant="yellow">
              Explore
            </Button>
          </div>
          <div>
            <Button class="pl-2">Buy TAPs</Button>
          </div>
        </div>
      </div>
    );
  }
  renderCTARight() {
    return (
      <div class="flex flex-col items-end yourContainer">
        <CubeMedium></CubeMedium>
      </div>
    );
  }
  render() {
    return (
      <div class="flex flex-row justify-evenly pt-16 items-center ">
        <div class="basis-1/2 md:basis-1/2">
          <CTALeft></CTALeft>
        </div>
        <div class="basis-1/2 md:basis-1/2">
          <CTARight></CTARight>
        </div>
      </div>
    );
  }
}

export default HomeSplash;
