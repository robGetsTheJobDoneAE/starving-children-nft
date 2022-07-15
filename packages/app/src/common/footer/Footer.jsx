import Nullstack from "nullstack";
import Logo from "../logo/Logo";

class Footer extends Nullstack {
  //   prepare({ page }: NullstackClientContext) {
  //     page.locale = 'en-US';
  //   }

  gotToTap() {
    console.log("tap");
  }

  render() {
    return (
      <>
        <hr style="position:absolute; right: 0px; border:1px solid white; width:100%;" />
        <div class="flex justify-between h-[30vh] items-center">
          <div class="flex-col">
            <div>
              <Logo></Logo>
            </div>
            <div class="pt-4">
              <span class="leading-[28px] text-[20px]">
                They may not have food, but you
                <br /> can help an NFT-less child with
                <br />
                this buy one, give one <br />
                opportunity. Every child <br />
                deserves an NFT.
              </span>
            </div>
          </div>
          <div class="flex-col">
            <div style="padding-top:6px">
              <span class=" glow leading-[36px] text-[26px] font-bold">
                Marketplace
              </span>
            </div>
            <div class="cursor-pointer" style="padding-top:6px">
              <span class="glow leading-[28px] text-[20px]">Wtf?</span>
            </div>
            <div class="cursor-pointer" style="padding-top:6px">
              <span class="glow leading-[28px] text-[20px]">Explore</span>
            </div>
            <div
              onclick={this.gotToTap}
              class="cursor-pointer"
              style="padding-top:6px"
            >
              <span class="glow leading-[28px] text-[20px]">TAPs</span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
