"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

const TOKEN_MINT = new PublicKey("FyfXRmEYzrWfzdjHXe2LfKQj2syv2rhgkkgKQDSnq8EW");
const SOLANA_DEVNET = "https://api.devnet.solana.com";

export default function TokenBalance() {
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey) return;

      try {
        const connection = new Connection(SOLANA_DEVNET);
        const ata = await getAssociatedTokenAddress(TOKEN_MINT, publicKey);
        const account = await getAccount(connection, ata);
        const rawAmount = Number(account.amount);
        const decimals = 9; // Adjust if your token uses different decimals
        setBalance(rawAmount / Math.pow(10, decimals));
      } catch (err) {
        setBalance(null);
        console.error("Error fetching token balance:", err);
      }
    };

    fetchBalance();
  }, [publicKey]);

  if (!publicKey) return null;

  return (
    <div className="mt-2 text-sm text-blue-600">
      OPTY Balance: {balance !== null ? balance.toFixed(2) : "Loading..."}
    </div>
  );
}
