import DropImageUpload, {
  type ImageToUpload,
} from "@/components/drop-images-upload";
import { Card } from "@/components/ui/card";
import FormProduct from "@/features/products/create/FormProduct";

import React from "react";

const AddProduct = () => {
  const [images, setImages] = React.useState<ImageToUpload[]>([]);

  return (
    <div className="flex items-start bg-white">
      <div className="p-5 w-3/4 mt-5">
        <FormProduct images={images} />
      </div>
      <div className="p-5 w-2/4 mt-5 sticky top-20">
        <Card className="shadow-none p-4 rounded-sm">
          <DropImageUpload value={images} onChange={setImages} />
        </Card>
      </div>
    </div>
  );
};

export default AddProduct;
