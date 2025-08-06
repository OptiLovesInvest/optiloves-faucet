// src/app/properties/page.tsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      const querySnapshot = await getDocs(collection(db, 'properties'));
      const items: any[] = [];
      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProperties(items);
    }
    fetchProperties();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Available Properties</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {properties.map((property) => (
          <Link key={property.id} href={`/properties/${property.id}`} className="block border p-4 rounded hover:shadow-lg transition">
            <Image
              src={property.image}
              alt={property.name}
              width={500}
              height={300}
              className="rounded mb-3 object-cover"
            />
            <h2 className="text-xl font-semibold mb-1">{property.name}</h2>
            <p className="text-gray-600 mb-2">{property.description}</p>
            <p className="text-green-700 font-bold">Price: {property.price} OPTY</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
