import React, { useEffect, useState } from "react";
import SpotCard from "./SpotCard";
import { Experience } from "@/types/schema";
import { supabase } from "@/lib/supabase";

const PopularSpots = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .eq("status", "active")
          .order("created_at", { ascending: false })
          .limit(4);

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1200px] mx-auto py-12 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Cargando experiencias...
        </h2>
      </div>
    );
  }

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Experiencias de Pesca Destacadas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {experiences.map((experience) => (
          <SpotCard
            key={experience.id}
            id={experience.id}
            image={
              experience.image_url ||
              "https://images.unsplash.com/photo-1544551763-46a013bb70d5"
            }
            title={experience.title}
            location={experience.location}
            price={experience.price}
            rating={4.5}
            features={[experience.fishing_type]}
            type="experience"
          />
        ))}
      </div>
    </div>
  );
};

export default PopularSpots;
