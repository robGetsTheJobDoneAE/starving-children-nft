import Nullstack from "nullstack";
class BuyTaps extends Nullstack {
  amountToPurchase;
  async onSubmit({ event }) {
    event.preventDefault();
    try {
      //   const provider = new ethers.providers.Web3Provider(window.ethereum);
      //   const signer = provider.getSigner(0);
      //   const vendor = new ethers.Contract(VENDOR_ADDRESS, Vendor.abi, signer);
      //   const amountToPurchase = ethers.utils.parseUnits(
      //     this.amountToPurchase,
      //     18
      //   );
      //   const amountOfEth = amountToPurchase.div(TAPS_PER_ETH);
      //   const tx = await vendor.buyTokens({ value: amountOfEth });
      //   const receipt = await tx.wait();
      //   if (receipt.status === 0) {
      //     throw new Error("Transaction failed");
      //   }
      // Probably want a banner here for success
    } catch (err) {
      // Probably want a banner here for failure
      console.error(err);
    }
  }
  render() {
    return (
      <div class="flex flex-col items-center text-center min-h-screen pt-20">
        <div>
          <input
            style="background: transparent; border: 1px solid white;"
            type="number"
            bind={this.amountToPurchase}
            step={0.01}
            required
          />
        </div>
        <div style="padding-top:10px">
          <input
            style="background: transparent; border: 1px solid white;"
            type="number"
            bind={this.amountToPurchase}
            step={0.01}
            required
          />
        </div>
        <button class="btn w-full" type="submit">
          Buy TAPs
        </button>
      </div>
    );
  }
}

export default BuyTaps;
