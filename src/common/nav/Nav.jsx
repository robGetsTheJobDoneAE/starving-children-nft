import Nullstack from "nullstack";
import Account from "../account/Account";

class Nav extends Nullstack {
  renderLink({ title, href, target, mobile, onclick }) {
    return (
      <element
        tag={onclick ? "button" : "a"}
        href={href}
        target={target}
        onclick={onclick || { expanded: false }}
        class={`w-full sm:w-auto border-b sm:border-0 border-gray-100 dark:border-gray-800 p-2 font-lg hover:text-yellow-600 items-center flex font-light ${
          mobile ? "sm:hidden" : ""
        }`}
      >
        {title}
      </element>
    );
  }

  render({ router }) {
    const path = console.log(router.url);
    return (
      <div class="flex">
        <Link
          href={"/home"}
          title={"Home"}
          class={path === "/home" ? "text-9xl" : "text-9xl"}
        />
        <Link href={"/wtf"} title={"WTF?"} />
        <Link href={"/explore"} title={"Explore"} />
        <Link href={"/taps"} title={"TAPs"} />
      </div>
    );
  }
}

export default Nav;
