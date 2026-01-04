import { Button } from "@/components/ui/button";
import FormProduct from "@/features/products/create/FormProduct";
import { useProduct } from "@/hooks/use-product";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProduct(id);

  console.log(product);
  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg">Chargement du produit...</div>
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

  return (
    <div className="flex items-start bg-white">
      <div className="p-5 w-full mt-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded"
              onClick={() => navigate("/admin/produits")}
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold font-poppins">
                Modifier le produit
              </h1>
              <p className="text-sm text-gray-500">
                Modifiez les informations de {product.nom}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded flex items-center gap-2"
            onClick={() => navigate(`/admin/produits/${id}/images`)}
          >
            <ImageIcon size={18} />
            <span>Gérer les images</span>
          </Button>
        </div>

        {/* Form */}
        <div className="shadow-none p-6 rounded-sm">
          <FormProduct images={[]} product={product} isEditMode />
        </div>
      </div>
    </div>
  );
};



// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/utils/RequireRole";

export default function EditProductWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <EditProduct />
    </RequireRole>
  );
}