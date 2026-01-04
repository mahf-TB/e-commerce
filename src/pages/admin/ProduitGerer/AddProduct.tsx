import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import DropImageUpload, {
  type ImageToUpload,
} from "@/components/utils/drop-images-upload";
import FormProduct from "@/features/products/create/FormProduct";
import { ArrowLeft } from "lucide-react";

import React from "react";

const AddProduct = () => {
  const [images, setImages] = React.useState<ImageToUpload[]>([]);

  return (
    <div className=" bg-white p-10">
      {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
                <Button
                variant="outline"
                size="icon"
                className="rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => window.history.back()}
                >
                <ArrowLeft size={20} />
                </Button>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold font-poppins text-gray-900">
                  Ajouter un produit
                </h1>
                <p className="text-sm text-gray-600">
                  Complétez les informations du produit
                </p>
              </div>
            </div>

        </div>
     <div className="flex items-start gap-6">
       
       <div className="w-3/4 ">
         <FormProduct images={images} />
       </div>
       <div className="w-2/4 sticky top-20">
         <Card className="shadow-none p-4 rounded-sm">
           <DropImageUpload value={images} onChange={setImages} />
         </Card>
       </div>
     </div>
    </div>
  );
};


// Wrapper export : vérifie le rôle avant d'afficher le dashboard
import RequireRole from "@/components/utils/RequireRole";

export default function AddProductWrapper() {
  return (
    <RequireRole allowedRoles={["admin"]}>
      <AddProduct />
    </RequireRole>
  );
}