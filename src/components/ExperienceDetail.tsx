import React from "react";
import { useParams } from "react-router-dom";
import { Experience } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import MainLayout from "./layouts/MainLayout";
import { Star, Heart, Share2, Globe, MapPin } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const ExperienceDetail = () => {
  const { id } = useParams();
  const [experience, setExperience] = React.useState<Experience | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
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

  const images = [
    experience.image_url ||
      "https://images.unsplash.com/photo-1514469215079-9954fe50808d",
    "https://images.unsplash.com/photo-1516741247836-f66d9d7bb714",
    "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35",
    "https://images.unsplash.com/photo-1548072797-9c32d8e1c0e5",
    "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <header className="flex justify-between items-start border-b pb-6">
          <div className="max-w-[70%]">
            <h1 className="text-3xl font-semibold mb-2">{experience.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                4.9
              </span>
              <span>· 12 reseñas ·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <Share2 className="w-5 h-5" />
              Compartir
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg">
              <Heart className="w-5 h-5" />
              Guardar
            </button>
          </div>
        </header>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-2 my-6 rounded-xl overflow-hidden h-[400px]">
          <div className="col-span-2 row-span-2 relative group">
            <img
              src={images[0]}
              alt={experience.title}
              className="w-full h-full object-cover"
            />
          </div>
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <button className="absolute bottom-4 right-4 bg-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100">
            Mostrar todas las fotos
          </button>
        </div>

        <div className="grid grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="col-span-2">
            <div className="flex justify-between py-8 border-b">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Experiencia de pesca guiada por Juan
                </h2>
                <p className="text-gray-600">
                  {experience.fishing_type === "sea"
                    ? "Pesca en mar"
                    : experience.fishing_type === "river"
                      ? "Pesca en río"
                      : experience.fishing_type === "lake"
                        ? "Pesca en lago"
                        : "Pesca"}
                </p>
              </div>
              <Avatar className="w-14 h-14">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juan" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>

            <div className="py-8 border-b space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
                  🎣
                </div>
                <div>
                  <h3 className="font-medium">Equipo incluido</h3>
                  <p className="text-gray-600">
                    Todo el equipo necesario para pescar
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100">
                  👥
                </div>
                <div>
                  <h3 className="font-medium">Hasta 4 personas</h3>
                  <p className="text-gray-600">
                    Grupos pequeños o privados disponibles
                  </p>
                </div>
              </div>
            </div>

            <div className="py-8 space-y-4">
              <h2 className="text-2xl font-semibold">Sobre la experiencia</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {experience.description}
              </p>
            </div>
          </div>

          {/* Booking Card */}
          <div className="relative">
            <div className="sticky top-24 rounded-xl border shadow-lg p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-semibold">
                  ${experience.price}
                  <span className="text-base font-normal text-gray-500">
                    {" "}
                    / persona
                  </span>
                </h2>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  4.9 · <span className="underline">12 reseñas</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-lg p-3">
                    <label className="block text-xs font-semibold">FECHA</label>
                    <input
                      type="date"
                      className="w-full mt-1 text-sm focus:outline-none"
                    />
                  </div>
                  <div className="border rounded-lg p-3">
                    <label className="block text-xs font-semibold">
                      PERSONAS
                    </label>
                    <select className="w-full mt-1 text-sm focus:outline-none">
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Reservar ahora
                </Button>

                <p className="text-center text-sm text-gray-500">
                  No se te cobrará nada por el momento
                </p>

                <div className="space-y-2 pt-4">
                  <div className="flex justify-between text-sm">
                    <span>${experience.price} × 2 personas</span>
                    <span>${experience.price * 2}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tarifa de servicio</span>
                    <span>$40</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-4 border-t">
                    <span>Total</span>
                    <span>${experience.price * 2 + 40}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExperienceDetail;
