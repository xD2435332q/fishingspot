import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Experience } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import MainLayout from "./layouts/MainLayout";

const ExperienceDetail = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setExperience(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
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

  if (!experience) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <p>No se encontró la experiencia</p>
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
                    experience.image_url ||
                    "https://images.unsplash.com/photo-1514469215079-9954fe50808d"
                  }
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title and Location */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {experience.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  {experience.location}
                </p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Detalles</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Tipo de Pesca</h3>
                    <p className="text-gray-600 capitalize">
                      {experience.fishing_type}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Estado</h3>
                    <Badge
                      className={
                        experience.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {experience.status === "active"
                        ? "Disponible"
                        : "No Disponible"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <p className="text-gray-600 whitespace-pre-line">
                  {experience.description}
                </p>
              </div>
            </div>

            {/* Booking Card */}
            <div className="col-span-1">
              <Card className="p-6 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      ${experience.price}
                      <span className="text-sm font-normal text-gray-600">
                        {" "}
                        / persona
                      </span>
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

export default ExperienceDetail;
