import React from "react";
import Navbar from "./Navbar";
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
  spots?: Array<{
    id: string;
    image: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    features: string[];
  }>;
  offers?: Array<{
    id: string;
    image: string;
    title: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    location: string;
  }>;
}

const Home = ({
  onSearch,
  onLoginClick,
  onRegisterClick,
  isLoggedIn = false,
  userName = "Usuario",
  spots,
  offers,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onLoginClick={onLoginClick}
        onRegisterClick={onRegisterClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />
      <main className="pt-[72px]">
        {" "}
        {/* Offset for fixed navbar */}
        <HeroSection onSearch={onSearch} />
        <PopularSpots spots={spots} />
        <OffersSection offers={offers} />
      </main>
    </div>
  );
};

export default Home;
