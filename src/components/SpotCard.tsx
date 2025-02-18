import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

interface SpotCardProps {
  image?: string;
  title?: string;
  location?: string;
  price?: number;
  rating?: number;
  features?: string[];
}

const SpotCard = ({
  image = "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
  title = "Lake Superior Fishing Spot",
  location = "Minnesota, USA",
  price = 149.99,
  rating = 4.5,
  features = ["Deep Water", "Bass Fishing", "Boat Access"],
}: SpotCardProps) => {
  return (
    <Card className="w-[280px] h-[360px] overflow-hidden bg-white">
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-black font-semibold px-2 py-1 rounded-md">
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
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default SpotCard;
