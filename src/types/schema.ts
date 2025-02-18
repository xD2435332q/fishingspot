export type Experience = {
  id: string;
  title: string;
  description: string | null;
  location: string;
  price: number;
  image_url: string | null;
  fishing_type: "sea" | "river" | "lake" | "any";
  status: "active" | "inactive" | "draft";
  created_at: string;
  updated_at: string;
};

export type Offer = {
  id: string;
  title: string;
  description: string | null;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  valid_until: string;
  status: "active" | "inactive" | "expired";
  experience_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Rental = {
  id: string;
  title: string;
  description: string | null;
  location: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  image_url: string | null;
  status: "available" | "booked" | "maintenance";
  created_at: string;
  updated_at: string;
};
