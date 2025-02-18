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
import { ExperienceDialog } from "./dialogs/ExperienceDialog";
import { Experience } from "@/types/schema";
import { experiencesApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const ExperiencesAdmin = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<
    Experience | undefined
  >();
  const { toast } = useToast();

  const loadExperiences = async () => {
    try {
      const data = await experiencesApi.list();
      setExperiences(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar las experiencias",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleCreate = async (
    data: Omit<Experience, "id" | "created_at" | "updated_at">,
  ) => {
    try {
      await experiencesApi.create(data);
      toast({
        title: "Éxito",
        description: "Experiencia creada correctamente",
      });
      loadExperiences();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo crear la experiencia",
      });
    }
  };

  const handleUpdate = async (
    data: Omit<Experience, "id" | "created_at" | "updated_at">,
  ) => {
    if (!editingExperience) return;

    try {
      await experiencesApi.update(editingExperience.id, data);
      toast({
        title: "Éxito",
        description: "Experiencia actualizada correctamente",
      });
      loadExperiences();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar la experiencia",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar esta experiencia?")
    )
      return;

    try {
      await experiencesApi.delete(id);
      toast({
        title: "Éxito",
        description: "Experiencia eliminada correctamente",
      });
      loadExperiences();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la experiencia",
      });
    }
  };

  const filteredExperiences = experiences.filter(
    (experience) =>
      experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.location.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experiencias</h1>
        <Button
          onClick={() => {
            setEditingExperience(undefined);
            setDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Nueva Experiencia
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar experiencias..."
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
              <TableHead>Tipo</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : filteredExperiences.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No se encontraron experiencias
                </TableCell>
              </TableRow>
            ) : (
              filteredExperiences.map((experience) => (
                <TableRow key={experience.id}>
                  <TableCell>{experience.title}</TableCell>
                  <TableCell>{experience.location}</TableCell>
                  <TableCell className="capitalize">
                    {experience.fishing_type}
                  </TableCell>
                  <TableCell>${experience.price}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        experience.status === "active"
                          ? "bg-green-100 text-green-800"
                          : experience.status === "inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {experience.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingExperience(experience);
                          setDialogOpen(true);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(experience.id)}
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

      <ExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={editingExperience ? handleUpdate : handleCreate}
        initialData={editingExperience}
        mode={editingExperience ? "edit" : "create"}
      />
    </div>
  );
};

export default ExperiencesAdmin;
