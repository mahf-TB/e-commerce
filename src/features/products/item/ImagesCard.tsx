import { useState, useEffect } from "react";

const ImagesCard = ({ images }: { images: any[] }) => {
  const primary = images.find((img: any) => img.isPrimary);
  const [selectedImageId, setSelectedImageId] = useState<string | number>(
    primary?.id ?? images[0]?.id
  );

  // state to handle fade/scale animation on main image when it changes
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  const selectedImage =
    images.find((img: any) => img.id === selectedImageId) ?? images[0];

  // when selectedImageId changes, mark as not loaded so we can animate
  useEffect(() => {
    setIsLoaded(false);
  }, [selectedImageId]);

  return (
  
      <div className="w-full md:w-96 max-md:hidden flex flex-col items-center">
        <div className="w-full overflow-hidden rounded shadow-sm">
          <img
            key={selectedImage?.id}
            src={selectedImage?.imageUrl}
            alt={selectedImage?.alt ?? ""}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-auto object-cover transition-all duration-300 ease-in-out transform ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-between w-full mt-3">
          {images.map((img: any) => (
            <div
              key={img.id}
              onClick={() => setSelectedImageId(img.id)}
              className={`overflow-hidden rounded cursor-pointer border-2 transition-all duration-150 ease-in-out transform ${
                img.id === selectedImageId
                  ? "border-yellow-500 scale-105"
                  : "border-transparent hover:scale-105"
              }`}
            >
              <img
                src={img.imageUrl}
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
