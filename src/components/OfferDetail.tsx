import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Offer, Experience } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import MainLayout from "./layouts/MainLayout";

const OfferDetail = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState<
    (Offer & { experiences: Experience | null }) | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("*, experiences(*)")
          .eq("id", id)
          .single();

        if (error) throw error;
        setOffer(data);
      } catch (error) {
        console.error("Error fetching offer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffer();
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

  if (!offer) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <p>No se encontró la oferta</p>
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
                    offer.experiences?.image_url ||
                    "https://images.unsplash.com/photo-1514469215079-9954fe50808d"
                  }
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and Location */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {offer.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  {offer.experiences?.location}
                </p>
              </div>

              {/* Offer Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Detalles de la Oferta
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Precio Original
                    </h3>
                    <p className="text-gray-600 line-through">
                      ${offer.original_price}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Descuento</h3>
                    <Badge className="bg-red-100 text-red-800">
                      {offer.discount_percentage}% OFF
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Válido Hasta</h3>
                    <p className="text-gray-600">
                      {new Date(offer.valid_until).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Estado</h3>
                    <Badge
                      className={
                        offer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {offer.status === "active" ? "Activa" : "Expirada"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {offer.description}
                </p>
              </div>

              {offer.experiences && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Detalles de la Experiencia
                  </h2>
                  <p className="text-gray-600 whitespace-pre-line">
                    {offer.experiences.description}
                  </p>
                </div>
              )}
            </div>

            {/* Booking Card */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-lg line-through text-gray-500">
                      ${offer.original_price}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${offer.discounted_price}
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        / persona
                      </span>
                    </p>
                    <p className="text-sm text-red-600 font-medium">
                      ¡{offer.discount_percentage}% de descuento!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Fecha</p>
                    <div className="border rounded-lg p-4 bg-white">
                      <Calendar
                        mode="single"
                        numberOfMonths={1}
                        className="[&_.rdp-caption]:mb-4 [&_.rdp-nav]:mb-0"
                      />
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Reservar con descuento
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Oferta válida hasta el{" "}
                    {new Date(offer.valid_until).toLocaleDateString()}
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

export default OfferDetail;
