import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

const CategoryProductPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();


    return (
        <main className={cn("container mx-auto py-6 px-4")}>
            <h1 className="text-2xl font-semibold mb-6">Produits par catégorie</h1>

              <div>Aucun produit trouvé pour cette catégorie.</div>
        </main>
    );
};

export default CategoryProductPage;