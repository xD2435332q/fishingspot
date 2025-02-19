import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Offer } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

const OfferCard = ({
  image = "https://images.unsplash.com/photo-1514469215079-9954fe50808d",
  title = "Oferta de Pesca",
  originalPrice = 299.99,
  discountedPrice = 199.99,
  discountPercentage = 33,
  location = "Ubicación",
  id,
}: {
  image?: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  location: string;
  id: string;
}) => {
  return (
    <Link
      to={`/offers/${id}`}
      className="block hover:opacity-95 transition-opacity"
    >
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">{location}</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through text-sm">
              ${originalPrice}
            </span>
            <span className="text-xl font-bold text-green-600">
              ${discountedPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const OffersSection = () => {
  const [offers, setOffers] = useState<
    (Offer & { experiences: { location: string } | null })[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("*, experiences(location)")
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOffers(data || []);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (isLoading) {
    return (
      <section className="w-full max-w-[1200px] mx-auto py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Cargando ofertas...
        </h2>
      </section>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto py-12 px-4 bg-gray-50">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Ofertas Especiales</h2>
        <p className="text-gray-600 mt-2">
          Descubre nuestras mejores ofertas para tu próxima aventura de pesca
        </p>
      </div>

      <Card className="bg-white">
        <CardContent className="p-6">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {offers.map((offer) => (
                <CarouselItem
                  key={offer.id}
                  className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <OfferCard
                    id={offer.id}
                    image={offer.experiences?.image_url}
                    title={offer.title}
                    originalPrice={offer.original_price}
                    discountedPrice={offer.discounted_price}
                    discountPercentage={offer.discount_percentage}
                    location={offer.experiences?.location || ""}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </Carousel>
        </CardContent>
      </Card>
    </section>
  );
};

export default OffersSection;
