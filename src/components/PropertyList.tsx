"use client";

export default function PropertyList() {
  const properties = [
    {
      id: 1,
      title: "🏢 Apartment in Gombe, Kinshasa",
      description: "Luxurious 2-bedroom flat near city center with stable rental income.",
      price: "500 OPTY",
    },
    {
      id: 2,
      title: "🏠 Villa in Nsele, Kinshasa",
      description: "Spacious villa with garden — ideal for long-term investment.",
      price: "1500 OPTY",
    },
    {
      id: 3,
      title: "🏘️ Block of Flats in Luanda",
      description: "Multi-unit rental property generating consistent yield.",
      price: "2500 OPTY",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {properties.map((property) => (
        <div key={property.id} className="border rounded p-4 shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
          <p className="text-gray-700 mb-2">{property.description}</p>
          <p className="font-bold text-blue-700">{property.price}</p>
          <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Buy Token
          </button>
        </div>
      ))}
    </div>
  );
}
