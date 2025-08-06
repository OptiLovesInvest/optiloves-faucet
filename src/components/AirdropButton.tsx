"use client";

import { useState } from "react";
import { PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

type Props = {
  publicKey: PublicKey;
};

export default function AirdropButton({ publicKey }: Props) {
  const [status, setStatus] = useState<string | null>(null);

  const handleAirdrop = async () => {
    try {
      setStatus("Requesting airdrop...");
      const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
      const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      await connection.confirmTransaction(signature, "confirmed");
      setStatus("Airdrop successful! Transaction ID: " + signature);
    } catch (error) {
      setStatus("Airdrop failed: " + (error as Error).message);
    }
  };

  return (
    <div className="text-center mt-4">
      <button
        onClick={handleAirdrop}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Get 1 SOL Airdrop (Devnet)
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
}
