import Nullstack from "nullstack";

import Footer from "./common/footer/Footer";
import Header from "./common/header/Header";
import "./tailwind.css";
import "./input.css";
import Home from "./pages/home/Home";
import Nav from "./common/nav/Nav";
import Account from "./common/account/Account";
import Taps from "./pages/taps/Taps";
import Profile from "./pages/profile/Profile";
import Nft from "./pages/nft/Nft";
import Admin from "./pages/admin/Admin";
import Wtf from "./pages/wtf/Wtf";
import Explore from "./pages/explore/Explore";
import Connect from "./common/connect/Connext";

class Application extends Nullstack {
  prepare(context) {
    context.mode = "dark";
    context.oppositeMode = "light";
  }

  render({ wallet, tap }) {
    // if (!wallet) {
    //   return <Connect />;
    // }
    return <Admin></Admin>;
    return (
      <main class="w-full bg-black text-white ">
        <Home route="/"></Home>
        <Home route="/home"></Home>
        <Taps route="/taps"></Taps>
        <Profile route="/taps"></Profile>
        <Nft route="/nft"></Nft>
        <Wtf route="/wtf"></Wtf>
        <Admin route="/admin"></Admin>
        <Explore route="/explore"></Explore>
      </main>
    );
  }
}

export default Application;
