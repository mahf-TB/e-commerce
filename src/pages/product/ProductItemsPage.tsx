import { FeaturedProducts } from "@/features/products/item/FeaturedProducts";

export default function ProductItemsPage() {
  const featuredProducts = {
    id: "1",
    nom: "SAMSUNG Galaxy S24 Ultra 12 +512GB, Titanium Gray Dual Sim, Unlocked",
    marque: "SAMSUNG",
    description:
      "Smartphone flagship Samsung avec design élégant et compact / Écran AMOLED 6.1 pouces 120Hz Full HD+ / Triple caméra 50MP + 12MP ultra grand-angle + 10MP téléobjectif zoom 3x / Caméra selfie 12MP / 8 Go RAM et stockage 128/256/512 Go / Batterie 3900 mAh avec charge rapide 25W et sans fil / Résistant à l'eau et poussière IP68 / Disponible en Crème, Noir, Vert, Lavande / Poids léger 167g / Connectivité 5G, Wi-Fi 6E, Bluetooth 5.3",
    prixUnitaire: 1199.99,
    reduction: 17,
    images: [
      { id: "1", imageUrl: "/images/macpro1.jpg", isPrimary: false },
      { id: "2", imageUrl: "/images/macpro1.jpg", isPrimary: false },
      { id: "3", imageUrl: "/images/mac2.jpg", isPrimary: true },
      { id: "4", imageUrl: "/images/macpro1.jpg", isPrimary: false },
    ],
    note: 4.9,
    nombreAvis: 2600,
    variants: [
      { variant: "256GB", prix: 999.99 },
      { variant: "512GB", prix: 1119.99 },
    ],
    status: "disponible",
    etatStock: "Bonne État",
  };

  return (
    <div className="">
      <FeaturedProducts product={featuredProducts} />
    </div>
  );
}
