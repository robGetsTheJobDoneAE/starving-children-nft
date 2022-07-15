import { ethers, utils } from "ethers";
import { dbclient } from "@starving/db";
import { MyToken__factory } from "@starving/contracts/dist/typechain-types/factories/contracts/Nft.sol/MyToken__factory";

const RPC_HOST_FALL_BACK =
  "https://mainnet.infura.io/v3/6d6c70e65c77429482df5b64a4d0c943";
const STARVING_ADDRESS_BACK = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const dbClient = new dbclient.PrismaClient();
async function main(): Promise<any> {
  return async (
    RPC_HOST: string = RPC_HOST_FALL_BACK,
    STARVING_ADDRESS: string = STARVING_ADDRESS_BACK,
    fromBlockOrBlockhash: string | number
  ) => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_HOST);
    const nft = MyToken__factory.connect(STARVING_ADDRESS, provider);
    const transfer = await nft.filters["Transfer(address,address,uint256)"]();

    const events = await nft.queryFilter(transfer, fromBlockOrBlockhash);

    for (const event of events) {
      const to = event.args[0];
      const from = event.args[1];
      const amount = event.args[2];
      await dbClient.sale.create({
        data: { from, to, price: amount.toBigInt() },
      });
    }
  };
}
