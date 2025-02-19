import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rental } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import MainLayout from "./layouts/MainLayout";

const RentalDetail = () => {
  const { id } = useParams();
  const [rental, setRental] = useState<Rental | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRental = async () => {
      try {
        const { data, error } = await supabase
          .from("rentals")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setRental(data);
      } catch (error) {
        console.error("Error fetching rental:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRental();
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <p>Cargando...</p>
        </div>
      </MainLayout>
    );
  }

  if (!rental) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <p>No se encontró el alojamiento</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={
                    rental.image_url ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  }
                  alt={rental.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and Location */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {rental.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">{rental.location}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Características</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Capacidad</h3>
                    <p className="text-gray-600">{rental.capacity} personas</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Estado</h3>
                    <Badge
                      className={
                        rental.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {rental.status === "available"
                        ? "Disponible"
                        : "Reservado"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Comodidades</h2>
                <div className="grid grid-cols-2 gap-4">
                  {rental.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {rental.description}
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${rental.price_per_night}
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        / noche
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Fechas</p>
                    <div className="border rounded-lg p-4 bg-white">
                      <Calendar
                        mode="range"
                        numberOfMonths={1}
                        className="[&_.rdp-caption]:mb-4 [&_.rdp-nav]:mb-0"
                      />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Reservar ahora
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    No se te cobrará nada por el momento
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RentalDetail;
