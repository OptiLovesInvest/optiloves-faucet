"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function PurchaseForm({ propertyId }: { propertyId: string }) {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState("100");
  const [status, setStatus] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!publicKey) {
      setStatus("❌ Please connect your wallet first.");
      return;
    }

    try {
      setStatus("⏳ Processing transaction...");

      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          propertyId,
          amount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(`❌ Error: ${data.error || "Unknown error"}`);
      } else {
        setStatus(`✅ Success: ${data.message}`);
      }
    } catch (err: any) {
      setStatus(`❌ Network Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded shadow mt-4 max-w-md">
      <label className="block mb-2">
        Amount of OPTY to buy:
        <input
          className="mt-1 block w-full p-2 border rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <button
        onClick={handlePurchase}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Buy Tokens
      </button>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </div>
  );
}
