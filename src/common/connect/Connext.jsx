import Nullstack from "nullstack";
import MetaMaskOnboarding from "@metamask/onboarding";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
const OWNER_ADDRESS = "";
class Connect extends Nullstack {
  async hydrate(context) {
    this._onboarding = new MetaMaskOnboarding();
    this._provider = await detectEthereumProvider();
    if (this._provider) {
      context.wallet = this._provider.selectedAddress;
      context.isAdmin =
        this._provider.selectedAddress?.toLowerCase() ===
        OWNER_ADDRESS.toLowerCase();

      this._provider.on("accountsChanged", async ([account]) => {
        context.wallet = account;
        context.isAdmin =
          account?.toLowerCase() === OWNER_ADDRESS.toLowerCase();
      });

      this._onboarding.stopOnboarding();
    }
  }

  async connect() {
    if (this._provider) {
      return this._provider.request({ method: "eth_requestAccounts" });
    }
    this._onboarding.startOnboarding();
  }

  render() {
    return (
      <button class="btn" onclick={this.connect}>
        Connect your wallet
      </button>
    );
  }
}

export default Connect;
