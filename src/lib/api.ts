import { supabase } from "./supabase";
import { Experience, Offer, Rental } from "@/types/schema";

// Experiences API
export const experiencesApi = {
  list: async () => {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Experience[];
  },

  create: async (
    experience: Omit<Experience, "id" | "created_at" | "updated_at">,
  ) => {
    const { data, error } = await supabase
      .from("experiences")
      .insert(experience)
      .select()
      .single();

    if (error) throw error;
    return data as Experience;
  },

  update: async (id: string, experience: Partial<Experience>) => {
    const { data, error } = await supabase
      .from("experiences")
      .update(experience)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Experience;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("experiences").delete().eq("id", id);

    if (error) throw error;
  },
};

// Offers API
export const offersApi = {
  list: async () => {
    const { data, error } = await supabase
      .from("offers")
      .select("*, experiences(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as (Offer & { experiences: Experience | null })[];
  },

  create: async (offer: Omit<Offer, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("offers")
      .insert(offer)
      .select()
      .single();

    if (error) throw error;
    return data as Offer;
  },

  update: async (id: string, offer: Partial<Offer>) => {
    const { data, error } = await supabase
      .from("offers")
      .update(offer)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Offer;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("offers").delete().eq("id", id);

    if (error) throw error;
  },
};

// Rentals API
export const rentalsApi = {
  list: async () => {
    const { data, error } = await supabase
      .from("rentals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Rental[];
  },

  create: async (rental: Omit<Rental, "id" | "created_at" | "updated_at">) => {
    const { data, error } = await supabase
      .from("rentals")
      .insert(rental)
      .select()
      .single();

    if (error) throw error;
    return data as Rental;
  },

  update: async (id: string, rental: Partial<Rental>) => {
    const { data, error } = await supabase
      .from("rentals")
      .update(rental)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Rental;
  },

  delete: async (id: string) => {
    const { error } = await supabase.from("rentals").delete().eq("id", id);

    if (error) throw error;
  },
};
