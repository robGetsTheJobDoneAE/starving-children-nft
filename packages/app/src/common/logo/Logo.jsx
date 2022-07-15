import Nullstack from "nullstack";

class Logo extends Nullstack {
  //   prepare({ page }: NullstackClientContext) {
  //     page.locale = 'en-US';
  //   }

  render() {
    return (
      <>
        <div class="flex flex-col items-center w-fit">
          <div>
            <span class="font-bold leading-[13px] text-[12px]">NFTS FOR</span>
          </div>

          <div class="flex flex-col items-center">
            <div class="font-[22px] leading-[22px] tracking-[0.15em] font-[250]">
              STARVING{" "}
            </div>
            <div class="font-[22px] leading-[22px] tracking-[0.15em] font-[250]">
              CHILDREN
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Logo;
