import React, { useState, useCallback } from "react";

interface ImageProductListProps {
  id: string | number;
  img: string;
}

const Thumbnail: React.FC<{
  id: string | number;
  img: string;
  onOpen: () => void;
}> = ({ id, img, onOpen }) => (
  <button
    type="button"
    onClick={onOpen}
    className="flex-none snap-start rounded border-2 overflow-hidden cursor-pointer transition-transform duration-150 ease-in-out mr-2 focus:outline-none focus:ring-2 focus:ring-primary"
    style={{ minWidth: 80 }}
    aria-label={`Ouvrir l'image ${id}`}
  >
    <img src={img} alt={`Image ${id}`} className="w-20 h-20 object-cover block" />
  </button>
);

const Lightbox: React.FC<{
  img: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}> = ({ img, alt, open, onClose }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
    >
      <img
        src={img}
        alt={alt}
        className="relative max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

const ImageProductList: React.FC<ImageProductListProps> = ({ id, img }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="flex-none" key={id}>
      <Thumbnail id={id} img={img} onOpen={handleOpen} />
      <Lightbox img={img} alt={`Agrandie ${id}`} open={open} onClose={handleClose} />
    </div>
  );
};

export default ImageProductList;
