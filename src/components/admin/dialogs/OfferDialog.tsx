import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Offer, Experience } from "@/types/schema";
import { useState } from "react";

type OfferFormData = Omit<Offer, "id" | "created_at" | "updated_at">;

interface OfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OfferFormData) => Promise<void>;
  initialData?: Offer;
  mode: "create" | "edit";
  experiences: Experience[];
}

export function OfferDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode,
  experiences,
}: OfferDialogProps) {
  const [formData, setFormData] = useState<OfferFormData>(
    initialData || {
      title: "",
      description: "",
      original_price: 0,
      discounted_price: 0,
      discount_percentage: 0,
      valid_until: new Date().toISOString(),
      status: "active",
      experience_id: null,
    },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Crear Oferta" : "Editar Oferta"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="original_price">Precio Original</Label>
            <Input
              id="original_price"
              type="number"
              value={formData.original_price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  original_price: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discounted_price">Precio con Descuento</Label>
            <Input
              id="discounted_price"
              type="number"
              value={formData.discounted_price}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discounted_price: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="discount_percentage">Porcentaje de Descuento</Label>
            <Input
              id="discount_percentage"
              type="number"
              value={formData.discount_percentage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  discount_percentage: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="valid_until">Válido Hasta</Label>
            <Input
              id="valid_until"
              type="datetime-local"
              value={formData.valid_until.split(".")[0]}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  valid_until: new Date(e.target.value).toISOString(),
                }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience_id">Experiencia</Label>
            <Select
              value={formData.experience_id || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  experience_id: value || null,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar experiencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Ninguna</SelectItem>
                {experiences.map((experience) => (
                  <SelectItem key={experience.id} value={experience.id}>
                    {experience.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Estado</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive" | "expired") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
                <SelectItem value="expired">Expirado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit">
              {mode === "create" ? "Crear" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
