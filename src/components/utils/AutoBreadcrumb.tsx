"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProduct } from "@/hooks/use-product";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type BreadcrumbRoute = {
  label: string;
  href?: string;
};

const routeLabels: Record<string, string> = {
  products: "Produits",
  checkout: "Paiement",
  cart: "Panier",
  account: "Mon compte",
  settings: "Paramètres",
  orders: "Mes commandes",
  about: "À propos",
  contact: "Contact",
  faq: "FAQ",
  blog: "Blog",
  post: "Article",
  search: "Recherche",
  compare: "Comparer",
  wishlist: "Liste de souhaits",
  login: "Connexion",
  register: "S'inscrire",
  logout: "Déconnexion",
  profile: "Profil",
  addresses: "Adresses",
  shipping: "Livraison",
  returns: "Retours",
  terms: "Conditions",
  privacy: "Confidentialité",
  categories: "Catégories",
  category: "Catégorie",
  collections: "Collections",
  support: "Support",
  dashboard: "Tableau de bord",
  admin: "Admin",
  vendors: "Fournisseurs",
};

export function AutoBreadcrumb() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const shouldFetchProduct = Boolean(
    id && location.pathname.includes("/products/")
  );
  const { data, isLoading } = useProduct(shouldFetchProduct ? id : undefined);
  const [productName, setProductName] = useState<string | null>(null);

  useEffect(() => {
    if (!shouldFetchProduct) {
      setProductName(null);
      return;
    }

    if (data?.nom) {
      setProductName(data.nom);
    } else if (!isLoading) {
      setProductName(null);
    }
  }, [shouldFetchProduct, data, isLoading]);

  // Générer les breadcrumbs à partir de l'URL
  const generateBreadcrumbs = (): BreadcrumbRoute[] => {
    const pathnames = location.pathname.split("/").filter(Boolean);

    const breadcrumbs: BreadcrumbRoute[] = [{ label: "Accueil", href: "/" }];

    let currentPath = "";
    pathnames.forEach((path, index) => {
      currentPath += `/${path}`;
      const isLast = index === pathnames.length - 1;

      // Si c'est l'id du produit et qu'on a le nom, afficher le nom du produit
      const isProductId =
        path !== "products" && location.pathname.includes("/products/");

      let label = "";
      if (isProductId && productName) {
        label = productName;
      } else if (isProductId && !productName) {
        label = path; // Afficher l'id si on n'a pas le nom
      } else {
        label =
          routeLabels[path] || path.charAt(0).toUpperCase() + path.slice(1);
      }

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <div key={index} className="flex items-center gap-2">
              {isLast ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      onClick={() => navigate(item.href || "#")}
                      className="cursor-pointer"
                    >
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
