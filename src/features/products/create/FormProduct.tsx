import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import type { VariantProduct } from "@/types";
import type { ImageToUpload } from "@/components/drop-images-upload";
import { createNewProduct } from "@/services/produitService";
import InputForm from "@/components/input-form";
import ReusableSelect from "@/components/select-form";
import TextareaForm from "@/components/TextareaForm";
import { Plus } from "lucide-react";
import VariantForm from "./VariantForm";
import useCategories from "@/hooks/use-categories";
import useBrands from "@/hooks/use-marques";
// à adapter selon ton client HTTP
// import { api } from "@/services/apiClient";

const FormProduct: React.FC<{ images: ImageToUpload[] }> = ({ images }) => {
  const { categoriesOptions } = useCategories();
  const { marquesOptions } = useBrands();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [garantie, setGarantie] = useState("");
  const [marqueId, setMarqueId] = useState<string | undefined>();
  const [categorieId, setCategorieId] = useState<string | undefined>();

  const [variants, setVariants] = useState<VariantProduct[]>([
    {
      variant: "",
      code: "",
      prixUnitaire: 0,
      qte: 0,
      seuil: 0,
      statut: "active",
      etatProduit: "neuf",
    },
  ]);

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        variant: "",
        code: "",
        prixUnitaire: 0,
        qte: 0,
        seuil: 0,
        statut: "active",
        etatProduit: "neuf",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      nom,
      description,
      garantie,
      marque: marqueId || null,
      categorie: categorieId || null,
      images, // vient du parent
      variants, // tableau conforme à ton VariantSchema
    };
    console.log("Submitting product:", payload);

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("garantie", garantie);
    if (marqueId) formData.append("marque", marqueId);
    if (categorieId) formData.append("categorie", categorieId);

    // variants en JSON
    formData.append("variants", JSON.stringify(variants));
    // images
    images.forEach((img, idx) => {
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

    console.log("FormData prepared for submission.", formData);

    // Envoi à l'API (à adapter selon ton client HTTP)
    await createNewProduct(formData)
      .then((res) => {
        console.log("Product created successfully:", res);
      })
      .catch((err) => {
        console.error("Error creating product:", err);
      });
    // TODO: reset / redirection / toast
  };

  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="">
          <h2 className="text-lg font-semibold font-poppins">
            Informations du produit
          </h2>
          <span className="text-sm text-gray-600">
            Renseignez le nom, la catégorie, la marque, la garantie et la
            description du produit.
          </span>
        </div>
        {/* Infos principales */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReusableSelect
              label="Marque"
              placeholder="Statut Produit"
              className="w-full"
              options={marquesOptions || []}
              value={marqueId}
              onChange={setMarqueId}
            />
            <ReusableSelect
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
              Ajoutez les différentes variantes du produit avec leur prix, stock
              et état.
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

        <div className="flex justify-end">
          <Button type="submit">Enregistrer le produit</Button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
