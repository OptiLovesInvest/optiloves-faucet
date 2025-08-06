"use client";

import { use } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import PurchaseForm from "@/components/PurchaseForm";

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { publicKey } = useWallet();
  const { id } = use(params); // ✅ Correctly unwrap the promise

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Property ID: {id}</h1>
      <PurchaseForm propertyId={id} />
    </div>
  );
}
