"use client";

type Property = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number; // in OPTY tokens
};

const properties: Property[] = [
  {
    id: "kinshasa-villa-01",
    name: "Luxury Villa in Kinshasa",
    location: "Kinshasa, DRC",
    image: "https://dummyimage.com/600x400/000/fff&text=Kinshasa+Villa",
    price: 1000,
  },
  {
    id: "luanda-condo-02",
    name: "Modern Condo in Luanda",
    location: "Luanda, Angola",
    image: "https://dummyimage.com/600x400/000/fff&text=Luanda+Condo",
    price: 850,
  },
];

export default function PropertyList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="border p-4 rounded shadow">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h3 className="text-xl font-bold">{property.name}</h3>
          <p className="text-sm text-gray-600">{property.location}</p>
          <p className="mt-2 text-lg">💰 {property.price} OPTY</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buy Token
          </button>
        </div>
      ))}
    </div>
  );
}
