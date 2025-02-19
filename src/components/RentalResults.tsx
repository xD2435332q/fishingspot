import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Rental } from "@/types/schema";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface RentalResultsProps {
  rentals: Rental[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  hasSearched: boolean;
}

const RentalResults = ({
  rentals,
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
  hasSearched,
}: RentalResultsProps) => {
  if (!hasSearched) return null;

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-lg">Buscando alojamientos...</p>
        </div>
      ) : rentals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">
            No se encontraron alojamientos
          </h3>
          <p className="text-gray-600">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {rentals.length} alojamientos encontrados
            </h2>
          </div>

          <div className="grid gap-6">
            {rentals.map((rental) => (
              <Link
                key={rental.id}
                to={`/rentals/${rental.id}`}
                className="block hover:shadow-lg transition-shadow duration-200"
              >
                <Card className="flex overflow-hidden">
                  {/* Image */}
                  <div className="w-72 h-48 flex-shrink-0">
                    <img
                      src={
                        rental.image_url ||
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                      }
                      alt={rental.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {rental.title}
                        </h3>
                        <p className="text-gray-600">{rental.location}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.8</span>
                        <span className="text-gray-600">(32 reseñas)</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {rental.amenities.slice(0, 3).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {rental.amenities.length > 3 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-full">
                            +{rental.amenities.length - 3} más
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${rental.price_per_night}
                      </p>
                      <p className="text-sm text-gray-600">por noche</p>
                      <Button className="mt-4">Ver detalle</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-gray-700">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RentalResults;
