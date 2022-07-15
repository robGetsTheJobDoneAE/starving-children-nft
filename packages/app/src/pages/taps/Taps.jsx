import Nullstack from "nullstack";
import Account from "../../common/account/Account";
import Header from "../../common/header/Header";
class Taps extends Nullstack {
  render() {
    return (
      <div class="p-8">
        <Account />
        <div class="container mx-auto px-14">
          <Header></Header>
        </div>
      </div>
    );
  }
}

export default Taps;
