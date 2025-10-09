/**
 * Generates a new Ethereum wallet and prints the mnemonic, address, and private key.
 * Usage: `npx ts-node gen-wallet.ts`
 * Copy private key to .env file as AMOY_PRIVATE_KEY or SEPOLIA_PRIVATE_KEY
 */

import { Wallet } from "ethers";

const wallet = Wallet.createRandom();
console.log("Mnemonic:", wallet.mnemonic?.phrase);
console.log("Address:", wallet.address);
console.log("Private key:", wallet.privateKey);
