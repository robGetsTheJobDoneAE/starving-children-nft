import Nullstack, { NullstackClientContext } from "nullstack";
import Account from "../../common/account/Account";
import Header from "../../common/header/Header";
class Wtf extends Nullstack {
  render() {
    return (
      <div>
        <Account />
        <div class="container mx-auto">
          <Header></Header>
        </div>
      </div>
    );
  }
}

export default Wtf;
