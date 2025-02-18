import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RentalDialog } from "./dialogs/RentalDialog";
import { Rental } from "@/types/schema";
import { rentalsApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const RentalsAdmin = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRental, setEditingRental] = useState<Rental | undefined>();
  const { toast } = useToast();

  const loadRentals = async () => {
    try {
      const data = await rentalsApi.list();
      setRentals(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los alquileres",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const handleCreate = async (
    data: Omit<Rental, "id" | "created_at" | "updated_at">,
  ) => {
    try {
      await rentalsApi.create(data);
      toast({
        title: "Éxito",
        description: "Alquiler creado correctamente",
      });
      loadRentals();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear el alquiler",
      });
    }
  };

  const handleUpdate = async (
    data: Omit<Rental, "id" | "created_at" | "updated_at">,
  ) => {
    if (!editingRental) return;

    try {
      await rentalsApi.update(editingRental.id, data);
      toast({
        title: "Éxito",
        description: "Alquiler actualizado correctamente",
      });
      loadRentals();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el alquiler",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este alquiler?"))
      return;

    try {
      await rentalsApi.delete(id);
      toast({
        title: "Éxito",
        description: "Alquiler eliminado correctamente",
      });
      loadRentals();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el alquiler",
      });
    }
  };

  const filteredRentals = rentals.filter(
    (rental) =>
      rental.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alquileres Temporales</h1>
        <Button
          onClick={() => {
            setEditingRental(undefined);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Nuevo Alquiler
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar alquileres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Precio por Noche</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Amenidades</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredRentals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No se encontraron alquileres
                </TableCell>
              </TableRow>
            ) : (
              filteredRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>{rental.title}</TableCell>
                  <TableCell>{rental.location}</TableCell>
                  <TableCell>${rental.price_per_night}</TableCell>
                  <TableCell>{rental.capacity} personas</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {rental.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rental.status === "available"
                          ? "bg-green-100 text-green-800"
                          : rental.status === "booked"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {rental.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRental(rental);
                          setDialogOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rental.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RentalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={editingRental ? handleUpdate : handleCreate}
        initialData={editingRental}
        mode={editingRental ? "edit" : "create"}
      />
    </div>
  );
};

export default RentalsAdmin;
