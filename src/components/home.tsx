import React from "react";
import MainLayout from "./layouts/MainLayout";
import HeroSection from "./HeroSection";
import PopularSpots from "./PopularSpots";
import OffersSection from "./OffersSection";
import { DateRange } from "react-day-picker";

interface HomeProps {
  onSearch?: (searchParams: {
    location: string;
    dateRange: DateRange | undefined;
    fishingType: string;
  }) => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const Home = ({
  onSearch,
  onLoginClick,
  onRegisterClick,
  isLoggedIn = false,
  userName = "Usuario",
}: HomeProps) => {
  const inspirationData = [
    {
      name: "Mar del Plata",
      distance: "400 km",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    },
    {
      name: "Bariloche",
      distance: "1600 km",
      image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35",
    },
    {
      name: "Ushuaia",
      distance: "3200 km",
      image: "https://images.unsplash.com/photo-1548072797-9c32d8e1c0e5",
    },
    {
      name: "Córdoba",
      distance: "700 km",
      image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
    },
  ];

  return (
    <MainLayout isLoggedIn={isLoggedIn} userName={userName}>
      <HeroSection onSearch={onSearch} />

      {/* Inspiration Section */}
      <div className="w-full px-4 lg:px-20 py-12 bg-white">
        <h2 className="text-3xl font-medium mb-8">
          Inspiración para tu próxima aventura
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationData.map((spot, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-blue-600 text-white">
                <h3 className="text-2xl font-medium">{spot.name}</h3>
                <p className="mt-2">{spot.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PopularSpots />
      <OffersSection />

      {/* Host Section */}
      <div
        className="w-full px-4 lg:px-20 py-24 bg-cover bg-center relative"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1516741247836-f66d9d7bb714")',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-6">
            ¿Tienes un spot de pesca?
          </h2>
          <p className="text-xl text-white mb-8">
            Únete a nuestra comunidad y comparte tu lugar con pescadores de todo
            el mundo
          </p>
          <button className="px-8 py-4 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors">
            Más información
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
