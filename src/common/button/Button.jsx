import Nullstack from "nullstack";

class Button extends Nullstack {
  renderLink({ title, href, target, mobile, onclick, textColor }) {
    return (
      <element
        tag={onclick ? "button" : "a"}
        href={href}
        target={target}
        onclick={onclick || { expanded: false }}
        class={`${textColor} w-full sm:w-auto border-b sm:border-0  p-2 font-lg hover:text-yellow-600 items-center flex font-light ${
          mobile ? "sm:hidden" : ""
        }`}
      >
        {title}
      </element>
    );
  }
  render({ children, link, variant }) {
    const buttonStyle = variant === "yellow" ? "bg-[#FDC500]" : "outlinebutton";
    const textColor = variant === "yellow" ? "text-black" : "text-[#ff8896]";
    return (
      <button class={buttonStyle}>
        <Link href={link} title={children} textColor={textColor}></Link>
      </button>
    );
  }
}

export default Button;
