import Nullstack, { NullstackClientContext } from "nullstack";
import Header from "../../common/header/Header";
class Nft extends Nullstack {
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

export default Nft;
