import React from "react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface OfferCardProps {
  image?: string;
  title?: string;
  originalPrice?: number;
  discountedPrice?: number;
  discountPercentage?: number;
  location?: string;
}

const OfferCard = ({
  image = "https://images.unsplash.com/photo-1514469215079-9954fe50808d?w=800&h=600&fit=crop",
  title = "Fishing Package",
  originalPrice = 299.99,
  discountedPrice = 199.99,
  discountPercentage = 33,
  location = "Sample Location",
}: OfferCardProps) => {
  return (
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
  );
};

interface OffersSectionProps {
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

const OffersSection = ({
  offers = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1514469215079-9954fe50808d?w=800&h=600&fit=crop",
      title: "Deep Sea Fishing Adventure",
      originalPrice: 299.99,
      discountedPrice: 199.99,
      discountPercentage: 33,
      location: "Miami, Florida",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1511188219872-0585f2d03eb1?w=800&h=600&fit=crop",
      title: "Mountain Lake Experience",
      originalPrice: 199.99,
      discountedPrice: 149.99,
      discountPercentage: 25,
      location: "Colorado Springs",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1542643299-be5d00d22cdc?w=800&h=600&fit=crop",
      title: "River Fishing Tour",
      originalPrice: 149.99,
      discountedPrice: 99.99,
      discountPercentage: 33,
      location: "Montana",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1516552945-115c7e97e663?w=800&h=600&fit=crop",
      title: "Ice Fishing Package",
      originalPrice: 249.99,
      discountedPrice: 174.99,
      discountPercentage: 30,
      location: "Minnesota",
    },
  ],
}: OffersSectionProps) => {
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
                    image={offer.image}
                    title={offer.title}
                    originalPrice={offer.originalPrice}
                    discountedPrice={offer.discountedPrice}
                    discountPercentage={offer.discountPercentage}
                    location={offer.location}
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
