import InputForm from "@/components/input-form";
import ReusableSelect from "@/components/select-form";
import type { VariantProduct } from "@/types";
import React from "react";
import { Button } from "@/components/ui/button";
import { productConditionOptions } from "@/utils/options";




const VariantForm = ({
  variants,
  setVariants,
}: {
  variants: VariantProduct[];
  setVariants: React.Dispatch<React.SetStateAction<VariantProduct[]>>;
}) => {
  const handleChangeVariant = (
    index: number,
    field: keyof VariantProduct,
    value: any
  ) => {
    setVariants((prev: VariantProduct[]) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  const removeVariant = (index: number) => {
    setVariants((prev: VariantProduct[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-sm p-3">
      {variants.map((v, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 border-b pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
          <div>
            <InputForm
              name="variant"
              label="Libellé variante"
              type="text"
              value={v.variant}
              onChange={(e) =>
                handleChangeVariant(index, "variant", e.target.value)
              }
              placeholder="Ex: Rouge - M"
              required
            />
          </div>
          <div>
            <InputForm
              value={v.code}
              label="Code"
              onChange={(e) =>
                handleChangeVariant(index, "code", e.target.value)
              }
              placeholder="Ex: RG-M"
              required
            />
          </div>
          <div>
            <InputForm
              type="text"
              label="Prix unitaire"
              min={0}
              value={v.prixUnitaire}
              onChange={(e) =>
                handleChangeVariant(
                  index,
                  "prixUnitaire",
                  Number(e.target.value)
                )
              }
              required
            />
          </div>
          <div>
            <InputForm
              type="text"
              min={0}
              value={v.qte}
              label="Quantité"
              onChange={(e) =>
                handleChangeVariant(index, "qte", Number(e.target.value))
              }
            />
          </div>
          <div>
            <InputForm
              type="text"
              min={0}
              label="Seuil d’alerte"
              value={v.seuil}
              onChange={(e) =>
                handleChangeVariant(index, "seuil", Number(e.target.value))
              }
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">

              <ReusableSelect
              id={`etat-${index}`}
                label="État"
                className="w-full"
                placeholder="État Produit"
                options={productConditionOptions}
                value={v.etatProduit}
                onChange={(val) =>
                  handleChangeVariant(
                    index,
                    "etatProduit",
                    val as VariantProduct["etatProduit"]
                  )
                }
              />
            </div>
          </div>

          {variants.length > 1 && (
            <div className="md:col-span-3 flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeVariant(index)}
              >
                Supprimer cette variante
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantForm;
