import Nullstack from "nullstack";
import Account from "../../common/account/Account";
import Header from "../../common/header/Header";
import WtfSpalsh from "./WtfSplash";
import Footer from "../../common/footer/Footer";
import Details from "./Details";

import Bcta from "../../common/bottom-cta/Bcta";
class Wtf extends Nullstack {
  render() {
    return (
      <>
        <div class="wtfbackground p-8">
          <Account />
          <div class="container mx-auto px-14">
            <Header></Header>
            <WtfSpalsh></WtfSpalsh>
            <Details></Details>
            <Bcta />
            <Footer></Footer>
          </div>
        </div>
      </>
    );
  }
}

export default Wtf;
