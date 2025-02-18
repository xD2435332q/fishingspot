import React from "react";
import SpotCard from "./SpotCard";

interface PopularSpotsProps {
  spots?: Array<{
    id: string;
    image: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    features: string[];
  }>;
}

const PopularSpots = ({ spots }: PopularSpotsProps) => {
  const defaultSpots = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      title: "Lake Superior Fishing",
      location: "Minnesota, USA",
      price: 149.99,
      rating: 4.5,
      features: ["Deep Water", "Bass Fishing", "Boat Access"],
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1516741247836-f66d9d7bb538",
      title: "Pacific Coast Adventure",
      location: "California, USA",
      price: 199.99,
      rating: 4.8,
      features: ["Ocean Fishing", "Equipment Included", "Expert Guide"],
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1511188219009-eb63d3be09bf",
      title: "Mountain Stream Retreat",
      location: "Colorado, USA",
      price: 129.99,
      rating: 4.6,
      features: ["Fly Fishing", "Scenic Views", "Beginner Friendly"],
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1542591903-18f7d0e358cc",
      title: "Amazon River Experience",
      location: "Brazil",
      price: 299.99,
      rating: 4.9,
      features: ["Exotic Species", "All-Inclusive", "Multi-Day Trip"],
    },
  ];

  const displaySpots = spots || defaultSpots;

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Popular Fishing Spots
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {displaySpots.map((spot) => (
          <SpotCard
            key={spot.id}
            image={spot.image}
            title={spot.title}
            location={spot.location}
            price={spot.price}
            rating={spot.rating}
            features={spot.features}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularSpots;
