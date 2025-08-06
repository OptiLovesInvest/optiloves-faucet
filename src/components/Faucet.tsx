"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Faucet() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequestTokens = async () => {
    if (!publicKey) {
      setError("Please connect your wallet first.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("http://localhost:3000/faucet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: publicKey.toBase58() })
      });

      const text = await res.text();
      if (res.ok) {
        setMessage(text);
      } else {
        setError(text);
      }
    } catch (err) {
      setError("❌ Network error. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-gray-100">
      <h2 className="text-xl font-bold mb-2">Token Faucet</h2>
      <p className="text-sm mb-4">
        This will send 100 OPTY tokens to your wallet on Devnet.
      </p>

      <button
        onClick={handleRequestTokens}
        disabled={loading || !publicKey}
        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Requesting..." : "Request 100 Tokens"}
      </button>

      {message && <p className="mt-3 text-green-600 whitespace-pre-line">✅ {message}</p>}
      {error && <p className="mt-3 text-red-600 whitespace-pre-line">❌ {error}</p>}
    </div>
  );
}
