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
import { OfferDialog } from "./dialogs/OfferDialog";
import { Offer, Experience } from "@/types/schema";
import { offersApi, experiencesApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const OffersAdmin = () => {
  const [offers, setOffers] = useState<
    (Offer & { experiences: Experience | null })[]
  >([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | undefined>();
  const { toast } = useToast();

  const loadData = async () => {
    try {
      const [offersData, experiencesData] = await Promise.all([
        offersApi.list(),
        experiencesApi.list(),
      ]);
      setOffers(offersData);
      setExperiences(experiencesData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las ofertas",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (
    data: Omit<Offer, "id" | "created_at" | "updated_at">,
  ) => {
    try {
      await offersApi.create(data);
      toast({
        title: "Éxito",
        description: "Oferta creada correctamente",
      });
      loadData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la oferta",
      });
    }
  };

  const handleUpdate = async (
    data: Omit<Offer, "id" | "created_at" | "updated_at">,
  ) => {
    if (!editingOffer) return;

    try {
      await offersApi.update(editingOffer.id, data);
      toast({
        title: "Éxito",
        description: "Oferta actualizada correctamente",
      });
      loadData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la oferta",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta oferta?"))
      return;

    try {
      await offersApi.delete(id);
      toast({
        title: "Éxito",
        description: "Oferta eliminada correctamente",
      });
      loadData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la oferta",
      });
    }
  };

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ofertas</h1>
        <Button
          onClick={() => {
            setEditingOffer(undefined);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Nueva Oferta
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar ofertas..."
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
              <TableHead>Experiencia</TableHead>
              <TableHead>Precio Original</TableHead>
              <TableHead>Precio con Descuento</TableHead>
              <TableHead>Descuento</TableHead>
              <TableHead>Válido Hasta</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredOffers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No se encontraron ofertas
                </TableCell>
              </TableRow>
            ) : (
              filteredOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell>{offer.title}</TableCell>
                  <TableCell>
                    {offer.experiences?.title || "Sin experiencia"}
                  </TableCell>
                  <TableCell>${offer.original_price}</TableCell>
                  <TableCell>${offer.discounted_price}</TableCell>
                  <TableCell>{offer.discount_percentage}%</TableCell>
                  <TableCell>
                    {format(new Date(offer.valid_until), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        offer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : offer.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingOffer(offer);
                          setDialogOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(offer.id)}
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

      <OfferDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={editingOffer ? handleUpdate : handleCreate}
        initialData={editingOffer}
        mode={editingOffer ? "edit" : "create"}
        experiences={experiences}
      />
    </div>
  );
};

export default OffersAdmin;
