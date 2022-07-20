import Nullstack from "nullstack";
import Application from "./src/Application";
import { ethers } from "ethers";
const context = Nullstack.start(Application);

context.start = async function start() {
  // https://nullstack.app/application-startup
};
context.server.maximumPayloadSize = "50mb";

export default context;
