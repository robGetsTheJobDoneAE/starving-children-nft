import Nullstack from "nullstack";
import Account from "../../common/account/Account";
import Header from "../../common/header/Header";
import HomeSplash from "./HomeSplash";
import MostSold from "./MostSold";
import Trending from "./Ternding";
import TopMessage from "./TopMessage";
import BuyNft from "./BuyNft";
import Bcta from "./Bcta.jsx";
import Footer from "../../common/footer/Footer";
class Home extends Nullstack {
  render() {
    return (
      <>
        <div class="herobackground p-8">
          <Account />
          <div class="container mx-auto px-14">
            <Header></Header>
            <HomeSplash></HomeSplash>
            <div style="padding-top: 500px">
              <Trending></Trending>
            </div>
            <TopMessage></TopMessage>
            <MostSold></MostSold>
            <BuyNft></BuyNft>
            <Bcta></Bcta>
            <Footer></Footer>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
