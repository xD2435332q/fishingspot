import React from "react";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onSearch?: (searchParams: {
    location: string;
    dateRange: { from: Date; to: Date } | undefined;
    fishingType: string;
  }) => void;
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onSearch,
  backgroundImage = "https://images.unsplash.com/photo-1516741247836-f66d9d7bb714?w=1920&h=800&fit=crop",
  title = "Encuentra tu próxima aventura de pesca",
  subtitle = "Descubre los mejores spots y experiencias de pesca en todo el mundo",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[500px] bg-gray-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">{subtitle}</p>

        {/* Search Bar */}
        <div className="w-full flex justify-center">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
