import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarIcon, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Rental } from "@/types/schema";
import { supabase } from "@/lib/supabase";
import RentalResults from "./RentalResults";

interface SearchBarProps {
  onSearch?: (searchParams: {
    location: string;
    dateRange: DateRange | undefined;
    fishingType: string;
  }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  // Search params
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [minCapacity, setMinCapacity] = useState<number>();
  const [showFilters, setShowFilters] = useState(false);

  // Results state
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      let query = supabase
        .from("rentals")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      // Apply filters
      if (location) {
        query = query.ilike("location", `%${location}%`);
      }

      if (minPrice) {
        query = query.gte("price_per_night", minPrice);
      }

      if (maxPrice) {
        query = query.lte("price_per_night", maxPrice);
      }

      if (minCapacity) {
        query = query.gte("capacity", minCapacity);
      }

      // Add pagination
      const start = (currentPage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;
      query = query.range(start, end);

      const { data, error, count } = await query;

      if (error) throw error;

      setRentals(data || []);
      setTotalPages(Math.ceil((count || 0) / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error searching rentals:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch();
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4 sticky top-4 z-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="¿Dónde quieres alojarte?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal w-[240px]"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy")} -{" "}
                      {format(date.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Selecciona las fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
          </Button>

          <Button onClick={handleSearch} className="px-8">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio por noche</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Mínimo"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Máximo"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Capacidad mínima</label>
              <Input
                type="number"
                placeholder="Número de personas"
                value={minCapacity || ""}
                onChange={(e) => setMinCapacity(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>

      <RentalResults
        rentals={rentals}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        hasSearched={hasSearched}
      />
    </div>
  );
};

export default SearchBar;
