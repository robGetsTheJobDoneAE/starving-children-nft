import Nullstack from "nullstack";
import Account from "../../common/account/Account";
import ConnectWallet from "../../common/account/ConnectWallet";
import Bcta from "../../common/bottom-cta/Bcta";
import Footer from "../../common/footer/Footer";
import Header from "../../common/header/Header";
import BuyTaps from "./BuyTaps";
import TapsSplash from "./TapsSplash";
class Taps extends Nullstack {
  render() {
    return (
      <div class="tapsbackground p-8">
        <Account />
        <div class="container mx-auto px-14">
          <Header></Header>
          <TapsSplash></TapsSplash>
          <BuyTaps></BuyTaps>
          <Bcta />
          <Footer></Footer>
        </div>
      </div>
    );
  }
}

export default Taps;
