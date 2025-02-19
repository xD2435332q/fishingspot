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
    <MainLayout isLoggedIn={isLoggedIn} userName={userName}>
      <HeroSection onSearch={onSearch} />
      <PopularSpots spots={spots} />
      <OffersSection offers={offers} />
    </MainLayout>
  );
};

export default Home;
