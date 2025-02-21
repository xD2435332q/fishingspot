import React from "react";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";

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
    <div className="relative w-full h-[640px] bg-gray-900">
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
        <div className="w-full max-w-4xl bg-white rounded-full shadow-lg p-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full md:w-auto md:border-r border-gray-200 px-4">
              <label className="text-xs font-bold text-gray-700 mb-1 block">
                Ubicación
              </label>
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex-1 w-full md:w-auto md:border-r border-gray-200 px-4">
              <label className="text-xs font-bold text-gray-700 mb-1 block">
                Fechas
              </label>
              <input
                type="text"
                placeholder="Agregar fechas"
                className="w-full text-sm text-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex-1 w-full md:w-auto px-4">
              <label className="text-xs font-bold text-gray-700 mb-1 block">
                Tipo de pesca
              </label>
              <select className="w-full text-sm text-gray-600 focus:outline-none bg-transparent">
                <option value="">Cualquier tipo</option>
                <option value="sea">Mar</option>
                <option value="river">Río</option>
                <option value="lake">Lago</option>
              </select>
            </div>

            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8">
              Buscar
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-8 bg-white/10 text-white hover:bg-white/20"
        >
          Explorar destinos
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
