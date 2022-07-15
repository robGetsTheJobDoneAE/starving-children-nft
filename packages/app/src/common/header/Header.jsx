import Nullstack from "nullstack";
import Account from "../account/Account";
import Logo from "../logo/Logo";
import Nav from "../nav/Nav";

class Header extends Nullstack {
  //   prepare({ page }: NullstackClientContext) {
  //     page.locale = 'en-US';
  //   }

  render() {
    return (
      <>
        <div class="flex justify-between">
          <Logo></Logo>

          <Nav></Nav>
        </div>
      </>
    );
  }
}

export default Header;
