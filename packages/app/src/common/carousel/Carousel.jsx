import Nullstack from "nullstack";
import NftCard from "../nft/NftCard";

class Carousel extends Nullstack {
  getMostSold() {
    return [
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "swingboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "stopboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "flowerboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "fenceboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "swingboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "stopboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "flowerboy.png",
      },
      {
        name: "NFT NAME",
        creatorName: "Creator's Name",
        price: 0.49,
        imgsrc: "fenceboy.png",
      },
    ];
  }
  render() {
    return (
      <div class="flex relative">
        {this.getMostSold().map((nft, index) => {
          return (
            <div class="w-102 max-100">
              <NftCard nft={nft}></NftCard>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Carousel;
{
  /* <button
//   onClick={movePrev}
className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//   disabled={isDisabled("prev")}
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-12 w-20 -ml-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 19l-7-7 7-7"
  />
</svg>
<span className="sr-only">Prev</span>
</button>
<button
//   onClick={moveNext}
className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
//   disabled={isDisabled("next")}
>
<svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-12 w-20 -ml-5"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  strokeWidth={2}
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M9 5l7 7-7 7"
  />
</svg>
<span className="sr-only">Next</span>
</button> */
}
