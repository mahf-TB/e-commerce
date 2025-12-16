import type { ImageToUpload } from "@/components/drop-images-upload";
import InputForm from "@/components/input-form";
import SelectForm from "@/components/select-form";
import TextareaForm from "@/components/textarea-form";
import { Button } from "@/components/ui/button";
import useCategories from "@/hooks/use-categories";
import useBrands from "@/hooks/use-marques";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { createNewProduct, updateProduct } from "@/services/produitService";
import type { Produit, VariantProduct } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VariantForm from "./VariantForm";
// à adapter selon ton client HTTP
// import { api } from "@/services/apiClient";

const FormProduct: React.FC<{
  images: ImageToUpload[];
  product?: Produit;
  isEditMode?: boolean;
}> = ({ images, product, isEditMode = false }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { categoriesOptions } = useCategories();
  const { marquesOptions } = useBrands();
  const [nom, setNom] = useState(product?.nom || "");
  const [description, setDescription] = useState(product?.description || "");
  const [garantie, setGarantie] = useState(product?.garantie || "");
  const [marqueId, setMarqueId] = useState<string | undefined>(
    product?.marque?.id as string | undefined
  );
  const [categorieId, setCategorieId] = useState<string | undefined>(
    product?.categorie?.id as string | undefined
  );

  const [variants, setVariants] = useState<VariantProduct[]>(
    product?.variants || [
      {
        variant: "",
        code: "",
        prixUnitaire: null!,
        qte: null!,
        seuil: null!,
        statut: "active",
        etatProduit: "neuf",
      },
    ]
  );

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setNom(product.nom);
      setDescription(product.description);
      setGarantie(product.garantie);
      setMarqueId(product.marque?.id as string | undefined);
      setCategorieId(product.categorie?.id as string | undefined);
      setVariants(product.variants);
    }
  }, [product]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => createNewProduct(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showToast("success", "Produit créé avec succès");
      navigate("/admin/produits");
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      showToast("error", "Erreur lors de la création du produit");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: string | number;
      formData: FormData;
    }) => updateProduct(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", product?.id] });
      showToast("success", "Produit mis à jour avec succès");
      navigate("/admin/produits");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      showToast("error", "Erreur lors de la mise à jour du produit");
    },
  });

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        variant: "",
        code: "",
        prixUnitaire: null!,
        qte: null!,
        seuil: null!,
        statut: "active",
        etatProduit: "neuf",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("garantie", garantie);
    if (marqueId) formData.append("marque", marqueId);
    if (categorieId) formData.append("categorie", categorieId);
    // variants en JSON
    formData.append("variants", JSON.stringify(variants));
    // images handling (uniquement en mode création)
    if (!isEditMode) {
      images.forEach((img) => {
        formData.append(`images`, img.file);
      });
      formData.append(
        "imagesMeta",
        JSON.stringify(
          images.map((img) => ({
            isPrincipale: img.isPrincipale,
            alt: img.alt,
          }))
        )
      );
    }
    if (isEditMode && product?.id) {
      updateMutation.mutate({ id: product.id, formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div
          className={cn(
            !isEditMode
              ? "flex-row md:gap-4"
              : "grid grid-cols-[500px_1fr] gap-6"
          )}
        >
          {/* Infos principales */}
          <div className="space-y-2">
            <div className="">
              <h2 className="text-lg font-semibold font-poppins">
                Informations du produit
              </h2>
              <span className="text-sm text-gray-600">
                Renseignez le nom, la catégorie, la marque, la garantie et la
                description du produit.
              </span>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-4",
                isEditMode && " md:grid-cols-1"
              )}
            >
              <InputForm
                name="nom"
                label="Nom du produit"
                onChange={(e) => setNom(e.target.value)}
                value={nom}
                placeholder="Ex: Lampe de bureau LED"
                type="text"
              />
              <InputForm
                name="garantie"
                label="Garantie"
                onChange={(e) => setGarantie(e.target.value)}
                value={garantie}
                placeholder="Ex: 12 mois"
                type="text"
              />
            </div>
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-4",
                isEditMode && " md:grid-cols-1"
              )}
            >
              <SelectForm
                label="Marque"
                placeholder="Statut Produit"
                className="w-full"
                options={marquesOptions || []}
                value={marqueId}
                onChange={setMarqueId}
              />
              <SelectForm
                label="Status"
                className="w-full"
                placeholder="Statut Produit"
                options={categoriesOptions || []}
                value={categorieId}
                onChange={setCategorieId}
              />
            </div>
            <div>
              <TextareaForm
                label="Description"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                rows={4}
                placeholder="Décrivez le produit…"
              />
            </div>
          </div>
          {/* Variantes */}
          <div className="space-y-3">
            <div className="">
              <h2 className="text-lg font-semibold font-poppins">
                Variant du produit
              </h2>
              <span className="text-sm text-gray-600">
                Ajoutez les différentes variantes du produit avec leur prix,
                stock et état.
              </span>
            </div>
            <VariantForm variants={variants} setVariants={setVariants} />
            <div className="flex items-center justify-end w-full mt-0">
              <Button
                type="button"
                variant="link"
                size={"sm"}
                className="text-blue-500 flex gap-0 p-0 "
                onClick={addVariant}
              >
                <Plus size={16} />
                Ajouter une variante
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-5">
          <Button
            variant={"destructive"}
            type="button"
            // onClick={handleCancelUpdate}
            disabled={!isPending}
          >
            Annuler
          </Button>

          <Button disabled={isPending} type="submit">
            <span>
              {isPending
                ? isEditMode
                  ? "Mise à jour..."
                  : "Enregistrement..."
                : isEditMode
                ? "Mettre à jour le produit"
                : "Enregistrer le produit"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
