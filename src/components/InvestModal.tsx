"use client";

import { useState } from "react";

type Props = {
  name: string;
  pricePerToken: number;
  tokensAvailable: number;
  onConfirm: (count: number) => void;
  onClose: () => void;
};

export default function InvestModal({ name, pricePerToken, tokensAvailable, onConfirm, onClose }: Props) {
  const [count, setCount] = useState(1);
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (count < 1 || count > tokensAvailable) {
      setError(`Please enter a number between 1 and ${tokensAvailable}`);
      return;
    }
    setError("");
    onConfirm(count);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-2">Invest in {name}</h2>
        <p className="mb-4">Price per token: ${pricePerToken}</p>
        <label className="block mb-2">
          Number of tokens:
          <input
            type="number"
            value={count}
            min={1}
            max={tokensAvailable}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Confirm Investment
          </button>
        </div>
      </div>
    </div>
  );
}
