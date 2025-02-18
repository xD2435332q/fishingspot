import React from "react";
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
import { CalendarIcon, MapPin, Search } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface SearchBarProps {
  onSearch?: (searchParams: {
    location: string;
    dateRange: DateRange | undefined;
    fishingType: string;
  }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [location, setLocation] = React.useState("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  const [fishingType, setFishingType] = React.useState("any");

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        location,
        dateRange: date,
        fishingType,
      });
    }
  };

  return (
    <div className="w-full max-w-[900px] h-[80px] bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
      <div className="flex-1 relative">
        <MapPin
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          placeholder="¿Dónde quieres pescar?"
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

      <Select value={fishingType} onValueChange={setFishingType}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Tipo de pesca" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Cualquier tipo</SelectItem>
          <SelectItem value="sea">Mar</SelectItem>
          <SelectItem value="river">Río</SelectItem>
          <SelectItem value="lake">Lago</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleSearch} className="px-8">
        <Search className="mr-2 h-4 w-4" />
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
