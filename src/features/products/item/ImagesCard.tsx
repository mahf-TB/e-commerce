import type { Image } from "@/types";
import { useState, useEffect, useCallback } from "react";
import { Lightbox } from "../tableaux/ImageProductList";

const ImagesCard = ({ images }: { images: Image[] }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const primary = images.find((img: any) => img.isPrincipale);
  const [selectedImageId, setSelectedImageId] = useState<string | number>(
    primary?._id ?? images[0]?._id
  );

  // state to handle fade/scale animation on main image when it changes
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const selectedImage =
    images.find((img: any) => img._id === selectedImageId) ?? images[0];

  // when selectedImageId changes, mark as not loaded so we can animate
  useEffect(() => {
    setIsLoaded(false);
  }, [selectedImageId]);

  return (
    <div className="w-full md:w-[300px] z-0 lg:w-[450px] md:h-[600px] flex flex-col items-center">
      <div
        onClick={handleOpen}
        className="w-full max-md:hidden overflow-hidden rounded shadow-sm"
      >
        <img
          key={selectedImage?._id}
          src={selectedImage?.url}
          alt={selectedImage?.alt ?? ""}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-auto object-cover object-center transition-all duration-300 ease-in-out transform ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />
      </div>

      <Lightbox
        img={(selectedImage?.url ?? "")}
        alt={`Agrandie ${selectedImage?._id}`}
        open={open}
        onClose={handleClose}
      />

      <div className="flex flex-wrap gap-2  w-full mt-3">
        {images.map((img: any) => (
          <div
            key={img._id}
            onClick={() => setSelectedImageId(img._id)}
            className={`overflow-hidden rounded cursor-pointer border-2 transition-all duration-150 ease-in-out transform ${
              img._id === selectedImageId
                ? "border-yellow-500 scale-105"
                : "border-transparent hover:scale-105"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt ?? ""}
              className="w-20 h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagesCard;
