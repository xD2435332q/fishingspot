import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface SpotCardProps {
  id: string;
  image?: string;
  title?: string;
  location?: string;
  price?: number;
  rating?: number;
  features?: string[];
  type?: "experience" | "rental";
}

const SpotCard = ({
  id,
  image = "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
  title = "Spot de Pesca",
  location = "Ubicación",
  price = 149.99,
  rating = 4.5,
  features = ["Pesca en Lago"],
  type = "rental",
}: SpotCardProps) => {
  return (
    <Link to={`/${type}s/${id}`}>
      <Card className="w-[280px] h-[360px] overflow-hidden bg-white hover:shadow-lg transition-shadow">
        <div className="relative h-[200px] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white font-semibold px-2 py-1 rounded-md">
            ${price}
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-2">{location}</p>
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{rating}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {features.map((feature, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs capitalize"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button className="w-full">
            Ver {type === "experience" ? "Experiencia" : "Alojamiento"}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SpotCard;
