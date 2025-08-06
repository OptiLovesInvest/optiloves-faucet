// src/app/properties/[id]/page.tsx

'use client';

import { useEffect, useState } from "react";
import { use } from "react";
import PurchaseForm from "@/components/PurchaseForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function PropertyPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperty() {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProperty(docSnap.data());
      } else {
        setProperty(null);
      }
      setLoading(false);
    }
    fetchProperty();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!property) return notFound();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link href="/properties" className="text-blue-500 hover:underline">← Back to Properties</Link>
      <h1 className="text-3xl font-bold mb-2 mt-4">{property.name}</h1>
      <Image src={property.image} alt={property.name} width={600} height={400} className="rounded-lg mb-4" />
      <p className="mb-4 text-gray-700">{property.description}</p>
      <p className="text-lg font-semibold text-green-700 mb-6">Price: {property.price} OPTY</p>
      <PurchaseForm propertyId={id} />
    </div>
  );
}
