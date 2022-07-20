import Nullstack from "nullstack";
import StarvingChildren from "../../../artifacts/contracts/StarvingChildren.sol/StarvingChildren.json";
import { ethers } from "ethers";
import pinataSDK from "@pinata/sdk";
// import { isPositiveNumber } from "./utils";

class Create extends Nullstack {
  donateName = "";
  donateDescription = "";
  donatePrice = "5.00";
  donateEditions = "1";
  donateExternalLink;
  donateImage = null;

  sellName = "";
  sellDescription = "";
  sellPrice = "5.00";
  sellEditions = "1";
  sellExternalLink;
  sellImage = null;

  static async pushToIPFS({ secrets, database, image, name, description }) {
    // console.log(secrets.pinataApiKey, secrets.pinataApiSecret);
    const pinata = pinataSDK(
      "8783b1dc64e7fbcd3219",
      "158c9e42ca1ddd262ba9c9815cbad80ddccde0952f249b143b3eef0e1ed16c53"
    );

    const fs = require("fs");
    const buffer = Buffer.from(image.split(",")[1], "base64");
    fs.writeFileSync("public/output.png", buffer);
    const readableStreamForFile = fs.createReadStream("public/output.png");
    const options = { pinataMetadata: { name, description } };
    const { IpfsHash } = await pinata.pinFileToIPFS(
      readableStreamForFile,
      options
    );

    const body = {
      description,
      image: `ipfs://${IpfsHash}`,
      external_url: `ipfs://${IpfsHash}`,
      name,
    };
    const { IpfsHash: uri } = await pinata.pinJSONToIPFS(body, options);

    return uri;
  }

  async create() {
    try {
      const uri = await this.pushToIPFS({
        image: this.sellImage,
        name: this.sellName,
        description: this.sellDescription,
        traits: [],
      });
      console.log(`Upload URI: ${uri}`);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const starvingChildren = new ethers.Contract(
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        StarvingChildren.abi,
        signer
      );
      const priceConverted = ethers.utils.parseUnits(this.sellPrice, 18);
      const tx = await starvingChildren.initializeNFT(
        this.sellName,
        priceConverted,
        this.sellEditions ? Number(this.sellEditions) : null,
        uri
      );
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      this.sellName = "";
      this.sellDescription = "";
      this.sellPrice = "5.00";
      this.sellEditions = "1";
      this.sellImage = null;
      this.sellSelectedTrainIndex = 1;
      this.sellTraits = [];
    } catch (err) {
      console.error(err);
    }
  }

  async createDonate() {
    try {
      const uri = await this.pushToIPFS({
        image: this.donateImage,
        name: this.donateName,
        description: this.donateDescription,
        traits: [],
      });
      console.log(`Upload URI: ${uri}`);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(0);
      const starvingChildren = new ethers.Contract(
        "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        StarvingChildren.abi,
        signer
      );
      const priceConverted = ethers.utils.parseUnits(this.donatePrice, 18);
      const tx = await starvingChildren.initializeNFT(
        this.sellName,
        priceConverted,
        this.sellEditions ? Number(this.sellEditions) : null,
        uri
      );
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error("Transaction failed");
      }

      this.donateName = "";
      this.donateDescription = "";
      this.sellPrice = "5.00";
      this.donateEditions = "1";
      this.donateImage = null;
      // await this.createDonate();
    } catch (err) {
      console.error(err);
    }
  }

  updatePaidNft({ event }) {
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      this.sellImage = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  updateDonateNft({ event }) {
    const reader = new FileReader();
    reader.onloadend = async (e) => {
      this.donateImage = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    return (
      <div
        style="padding-top:20px; padding-bottom:50px"
        class="flex text-white justify-around"
      >
        <div style="width: 40%" class="flex-col">
          <div>
            <span class=" leading-[37px] font-bold text-[26px]">
              Create a new NFT
            </span>
          </div>
          <div style="padding-top:20px">
            <span class="pt-8 leading-[25px] font-bold text-[18px]">
              Image, Video, Audio, or 3D Model
            </span>
          </div>
          <div style="padding-top:20px">
            <span class=" leading-[20px]  text-[14px] text-[#CACACA]">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </span>
          </div>
          {this.sellImage && (
            <div
              style="border: 3px dashed #FFFFFF;"
              class="flex justify-center items-center w-full h-64 "
            >
              <img
                style="width:100%; height:100%; object-fit: cover;"
                src={this.sellImage}
                alt="Red dot"
              />
            </div>
          )}
          {!this.sellImage && (
            <div
              style="border: 3px dashed #FFFFFF;"
              class="flex justify-center items-center w-full"
            >
              <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-64  border-dashed cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    width="56"
                    height="47"
                    viewBox="0 0 56 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M55.8303 4.72284C55.8303 2.16395 53.7367 0.0703125 51.1778 0.0703125H4.65252C2.09364 0.0703125 0 2.16395 0 4.72284V41.943C0 44.5019 2.09364 46.5956 4.65252 46.5956H51.1778C53.7367 46.5956 55.8303 44.5019 55.8303 41.943V4.72284ZM43.7337 37.2905H10.0029C8.60717 37.2905 7.79298 35.7784 8.49086 34.6153L18.7264 16.8194C19.1917 16.0052 20.2385 16.0052 20.7037 16.8194L26.8683 27.4039C27.3336 28.1018 28.3804 28.2181 28.8456 27.5202L33.8471 20.3088C34.3124 19.6109 35.3592 19.6109 35.8244 20.3088L45.0132 34.9642C45.711 36.0111 45.0132 37.2905 43.7337 37.2905ZM40.7096 16.3541C38.1507 16.3541 36.0571 14.2605 36.0571 11.7016C36.0571 9.14273 38.1507 7.0491 40.7096 7.0491C43.2685 7.0491 45.3621 9.14273 45.3621 11.7016C45.3621 14.2605 43.2685 16.3541 40.7096 16.3541Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onchange={this.updatePaidNft}
                />
              </label>
            </div>
          )}

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Name*</span>
            </div>
            <input
              id="sellname"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px;  width: 100%; height: 47px; background: transparent; border: 1px solid white;"
              bind={this.sellName}
              required
            />
          </div>

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">External link</span>
            </div>
            <input
              id="sellExternalLink"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 47px; background: transparent; border: 1px solid white;"
              bind={this.sellExternalLink}
            />
          </div>

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Max Editions</span>
            </div>
            <input
              id="sellExternalLink"
              class="w-50 text-white"
              type={"number"}
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 47px; background: transparent; border: 1px solid white;"
              bind={this.sellEditions}
            />
            <span class="text-[#C6C6C6] leading-[20px] text-[14px]">
              Number of Editions that will be created
            </span>
          </div>

          <div class="flex-col" style="padding-top:20px; padding-bottom:20px;">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Description</span>
            </div>
            <span class="text-[#C6C6C6] leading-[20px] text-[14px]">
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </span>
            <input
              id="sellDescription"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 139px; background: transparent; border: 1px solid white;"
              bind={this.sellDescription}
            />
          </div>

          <span class="leading-[25px] text-[18px]">Price </span>

          <div class="flex items-center">
            <div style="justify-content: center; align-items: center; display:flex; min-height: 41px; min-width: 41px;  border: 1px solid white;">
              <svg
                style="top: 10px"
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 17.1111C5.14792 17.1111 3.51823 16.4801 2.11094 15.2182C0.703646 13.9563 0 12.2487 0 10.0956C0 8.66963 0.579688 7.11894 1.73906 5.44347C2.89844 3.76801 4.65208 1.95352 7 0C9.34792 1.95352 11.1016 3.76801 12.2609 5.44347C13.4203 7.11894 14 8.66963 14 10.0956C14 12.2487 13.2964 13.9563 11.8891 15.2182C10.4818 16.4801 8.85208 17.1111 7 17.1111Z"
                  fill="white"
                />
              </svg>
            </div>
            <div>
              <input
                class="w-50 text-white"
                style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 41px; background: transparent; border: 1px solid white;"
                bind={this.sellPrice}
                step={0.1}
                type="number"
                required
              />
            </div>
          </div>

          <div style="padding-top:20px" onclick={this.create}>
            <div
              style="padding:10px; width:130px; display:flex; justify-content: center;"
              class="pt-2 cursor-pointer bg-[#FDC500] flex items-center"
              onclick={this.create}
            >
              <span class=" text-black ">Create NFT </span>
            </div>
          </div>
        </div>
        <div style="width: 40%" class="flex-col">
          <div>
            <span class="leading-[37px] font-bold text-[26px]">
              <span class="text-[#FF8896]">Side B </span> - NFT for donation
            </span>
          </div>
          <div style="padding-top:20px">
            <span class="pt-8 leading-[25px] font-bold text-[18px]">
              Image, Video, Audio, or 3D Model
            </span>
          </div>
          <div style="padding-top:20px">
            <span class=" leading-[20px]  text-[14px] text-[#CACACA]">
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
              OGG, GLB, GLTF. Max size: 100 MB
            </span>
          </div>
          {this.donateImage && (
            <div
              style="border: 3px dashed #FFFFFF;"
              class="flex justify-center items-center w-full h-64 "
            >
              <img
                style="width:100%; height:100%; object-fit: cover;"
                src={this.donateImage}
                alt="Red dot"
              />
            </div>
          )}
          {!this.donateImage && (
            <div
              style="border: 3px dashed #FFFFFF;"
              class="flex justify-center items-center w-full"
            >
              <label
                for="dropzone-file"
                class="flex flex-col justify-center items-center w-full h-64  border-dashed cursor-pointer dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col justify-center items-center pt-5 pb-6">
                  <svg
                    width="56"
                    height="47"
                    viewBox="0 0 56 47"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M55.8303 4.72284C55.8303 2.16395 53.7367 0.0703125 51.1778 0.0703125H4.65252C2.09364 0.0703125 0 2.16395 0 4.72284V41.943C0 44.5019 2.09364 46.5956 4.65252 46.5956H51.1778C53.7367 46.5956 55.8303 44.5019 55.8303 41.943V4.72284ZM43.7337 37.2905H10.0029C8.60717 37.2905 7.79298 35.7784 8.49086 34.6153L18.7264 16.8194C19.1917 16.0052 20.2385 16.0052 20.7037 16.8194L26.8683 27.4039C27.3336 28.1018 28.3804 28.2181 28.8456 27.5202L33.8471 20.3088C34.3124 19.6109 35.3592 19.6109 35.8244 20.3088L45.0132 34.9642C45.711 36.0111 45.0132 37.2905 43.7337 37.2905ZM40.7096 16.3541C38.1507 16.3541 36.0571 14.2605 36.0571 11.7016C36.0571 9.14273 38.1507 7.0491 40.7096 7.0491C43.2685 7.0491 45.3621 9.14273 45.3621 11.7016C45.3621 14.2605 43.2685 16.3541 40.7096 16.3541Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  class="hidden"
                  onchange={this.updateDonateNft}
                />
              </label>
            </div>
          )}

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Name*</span>
            </div>
            <input
              id="donateName"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px;  width: 100%; height: 47px; background: transparent; border: 1px solid white;"
              bind={this.donateName}
              required
            />
          </div>

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">External link</span>
            </div>
            <input
              id="donateExternalLink"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 47px; background: transparent; border: 1px solid white;"
              bind={this.donateExternalLink}
            />
          </div>

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Max Editions</span>
            </div>
            <input
              disabled
              bind={this.sellEditions}
              id="donateEditons"
              class="w-50 text-white"
              type={"number"}
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 47px; background: #3F3F3F; border: 1px solid white;"
            />
            <span class="text-[#C6C6C6] leading-[20px] text-[14px]">
              Number of Editions that will be created
            </span>
          </div>

          <div class="flex-col" style="padding-top:20px">
            <div style="padding-bottom: 10px;">
              <span class="leading-[25px] text-[18px]">Description</span>
            </div>
            <span class="text-[#C6C6C6] leading-[20px] text-[14px]">
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </span>
            <input
              id="donateDescription"
              class="w-50 text-white"
              style="font-style: normal; font-weight: 400; font-size: 18px; line-height: 25px; padding-left:10px; padding-right:10px; width: 100%; height: 139px; background: transparent; border: 1px solid white;"
              bind={this.donateDescription}
            />
          </div>
          <div style="padding-top:20px;">
            <div style="display:flex; flex-direction: column; height: 108px; border: 1px solid #FFC701; padding:18px;">
              <div style="flex">
                <span style=" font-size: 14px; line-height: 20px color: #C6C6C6;">
                  This NFT will be generated at the same time as the original
                  and will be donated when you sell it
                </span>
              </div>
              <div style="display:flex; justify-content: flex-end;">
                <div>
                  <span style="font-weight: 400; font-size: 16px; line-height: 22px; text-align: right; color: #FFC701;">
                    Donation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
