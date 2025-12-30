import DialogAlert from "@/components/dialog-alert";
import DropImageUpload, {
  type ImageToUpload,
} from "@/components/drop-images-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProduct } from "@/hooks/use-product";
import { showToast } from "@/lib/toast";
import {
  addProductImages,
  removeProductImage,
  setMainProductImage,
} from "@/services/imageService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductImages = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: product, isLoading, isError } = useProduct(id);
  const [newImages, setNewImages] = React.useState<ImageToUpload[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [imageToDelete, setImageToDelete] = React.useState<string | null>(null);

  // Mutation pour ajouter des images
  const addImagesMutation = useMutation({
    mutationFn: (formData: FormData) => addProductImages(id!, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("success", "Images ajoutées avec succès");
      setNewImages([]);
    },
    onError: (error) => {
      console.error("Error adding images:", error);
      showToast("error", "Erreur lors de l'ajout des images");
    },
  });

  // Mutation pour supprimer une image
  const deleteImageMutation = useMutation({
    mutationFn: (imageId: string) => removeProductImage(id!, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("success", "Image supprimée avec succès");
    },
    onError: (error) => {
      console.error("Error deleting image:", error);
      showToast("error", "Erreur lors de la suppression de l'image");
    },
  });

  // Mutation pour définir l'image principale
  const setMainImageMutation = useMutation({
    mutationFn: (imageId: string) => setMainProductImage(id!, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("success", "Image principale définie avec succès");
    },
    onError: (error) => {
      console.error("Error setting main image:", error);
      showToast("error", "Erreur lors de la définition de l'image principale");
    },
  });


  const handleSaveImages = async () => {
    if (newImages.length === 0) return;

    const formData = new FormData();
    newImages.forEach((img) => {
      formData.append("images", img.file);
    });
    formData.append(
      "imagesMeta",
      JSON.stringify(
        newImages.map((img) => ({
          isPrincipale: img.isPrincipale,
          alt: img.alt,
        }))
      )
    );

    addImagesMutation.mutate(formData);
    setNewImages([]);
  };

  const handleDeleteImage = (imageId: string) => {
    setImageToDelete(imageId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (imageToDelete) {
      deleteImageMutation.mutate(imageToDelete);
    }
    setDeleteDialogOpen(false);
    setImageToDelete(null);
  };

  const handleSetPrincipal = (imageId: string) => {
    setMainImageMutation.mutate(imageId);
  };





  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Chargement des images...</div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-red-500">
          Erreur lors du chargement du produit
        </div>
      </div>
    );
  }

    const isPending =
    addImagesMutation.isPending ||
    deleteImageMutation.isPending ||
    setMainImageMutation.isPending;

  return (
    <div className="p-5 w-full mt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-poppins ">
              Gérer les images
            </h1>
            <p className="text-sm text-gray-500">Images de {product.nom}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Images existantes */}
        <Card className="shadow-none border-none p-5 rounded-sm gap-2">
          <h2 className="text-lg font-semibold ">Images actuelles</h2>
          {product.images && product.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((image) => (
                <div
                  key={image._id}
                  className="relative group rounded-sm overflow-hidden border border-gray-200"
                >
                  <img
                    src={image.url}
                    alt={image.alt || product.nom}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded"
                      onClick={() => handleSetPrincipal(String(image._id))}
                      title="Définir comme image principale"
                      disabled={isPending || image.isPrincipale}
                    >
                      <Star
                        size={18}
                        fill={image.isPrincipale ? "currentColor" : "none"}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="rounded"
                      onClick={() => handleDeleteImage(String(image._id))}
                      title="Supprimer l'image"
                      disabled={isPending}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                  {image.isPrincipale && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <Star size={12} fill="white" />
                      Principale
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Aucune image pour ce produit
            </div>
          )}
        </Card>

        {/* Ajouter de nouvelles images */}
        <Card className="shadow-none p-5 border-none gap-2">
          <h2 className="text-lg font-semibold">Ajouter de nouvelles images</h2>
          <DropImageUpload value={newImages} onChange={setNewImages} />
          {newImages.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleSaveImages}
                className="rounded bg-gray-950 text-white"
                disabled={isPending || addImagesMutation.isPending}
              >
                {addImagesMutation.isPending
                  ? "Enregistrement..."
                  : `Enregistrer les images (${newImages.length})`}
              </Button>
            </div>
          )}
        </Card>
      </div>
      {/* Dialog de confirmation de suppression */}
      <DialogAlert
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        variant="danger"
        title="Supprimer l'image"
        description="Êtes-vous sûr de vouloir supprimer cette image ? Cette action est irréversible."
        confirmText="Supprimer"
        cancelText="Annuler"
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setImageToDelete(null);
        }}
      />
    </div>
  );
};


// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/RequireRole";

export default function EditProductImagesWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <EditProductImages />
    </RequireRole>
  );
}