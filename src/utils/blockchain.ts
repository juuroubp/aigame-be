import { JsonRpcProvider, Wallet, Contract } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const RAFFLE_ADDRESS = "0xF5aa765755c0CE339AF3FCC92E5B848987114514";


const raffleAbi = [
  "function finalizeTry(address player, bool success) external"
];

export async function finalizeTryOnChain(player: string, didWin: boolean) {
  const provider = new JsonRpcProvider(RPC_URL);
  const signer = new Wallet(PRIVATE_KEY, provider);
  const contract = new Contract(RAFFLE_ADDRESS, raffleAbi, signer);

  const tx = await contract.finalizeTry(player, didWin);
  await tx.wait();
  return tx.hash;
}
