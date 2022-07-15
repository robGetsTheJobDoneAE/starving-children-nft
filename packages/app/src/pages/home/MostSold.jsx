import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack from "nullstack";
import Carousel from "../../common/carousel/Carousel";
class MostSold extends Nullstack {
  render() {
    return (
      <div>
        <span class="glow font-bold leading-[49px] text-[35px]">
          Most Sold NFTs
        </span>
        <div class="pt-8 h-[67vh] w-[100%] realtive box-content overflow-scroll">
          <Carousel></Carousel>
        </div>
      </div>
    );
  }
}

export default MostSold;
