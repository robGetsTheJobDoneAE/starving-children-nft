import Button from "../../common/button/Button";
import CubeMedium from "../../common/cube/CubeMedian";
import Nullstack from "nullstack";
class WtfSpalsh extends Nullstack {
  render() {
    return (
      <div class="flex flex-col items-center text-center min-h-screen pt-10">
        <div class="leading-[49px] text-[35px] ">
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
        <div class="flex pt-10">
          <div class="pr-4 leading-[28px] text-[20px]">
            <Button link={"/explore"} input={10} variant="yellow">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9633 10.6C14.4007 10.6 14.79 10.4375 15.1312 10.1125C15.4724 9.7875 15.643 9.40833 15.643 8.975C15.643 8.55833 15.4724 8.19167 15.1312 7.875C14.79 7.55833 14.4007 7.4 13.9633 7.4C13.5258 7.4 13.1365 7.55833 12.7953 7.875C12.4541 8.19167 12.2835 8.55833 12.2835 8.975C12.2835 9.40833 12.4541 9.7875 12.7953 10.1125C13.1365 10.4375 13.5258 10.6 13.9633 10.6ZM1.5748 15.175V16.5V1.5V15.175ZM1.5748 18C1.17235 18 0.809274 17.85 0.485564 17.55C0.161855 17.25 0 16.9 0 16.5V1.5C0 1.11667 0.161855 0.770833 0.485564 0.4625C0.809274 0.154167 1.17235 0 1.5748 0H17.3228C17.7428 0 18.1102 0.154167 18.4252 0.4625C18.7402 0.770833 18.8976 1.11667 18.8976 1.5V4.85H17.3228V1.5H1.5748V16.5H17.3228V13.175H18.8976V16.5C18.8976 16.9 18.7402 17.25 18.4252 17.55C18.1102 17.85 17.7428 18 17.3228 18H1.5748ZM10.9711 13.675C10.3762 13.675 9.90376 13.5083 9.55381 13.175C9.20385 12.8417 9.02887 12.4 9.02887 11.85V6.175C9.02887 5.60833 9.20385 5.1625 9.55381 4.8375C9.90376 4.5125 10.3762 4.35 10.9711 4.35H18.0577C18.6527 4.35 19.1251 4.5125 19.4751 4.8375C19.825 5.1625 20 5.60833 20 6.175V11.85C20 12.4 19.825 12.8417 19.4751 13.175C19.1251 13.5083 18.6527 13.675 18.0577 13.675H10.9711ZM18.4252 12.175V5.85H10.6037V12.175H18.4252Z"
                  fill="black"
                />
              </svg>
              <span class="pl-2"> Connect your wallet</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default WtfSpalsh;
