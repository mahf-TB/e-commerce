import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import useCategories from "@/hooks/use-categories";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ListCollapse } from "lucide-react";
import * as React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const menuLinks = [
  {
    to: "/products?sort=popular",
    label: "Populaires",
    sort: "popular",
  },
  {
    to: "/products?sort=newest",
    label: "Nouveautés",
    sort: "newest",
  },
  {
    to: "/products?sort=price_asc",
    label: "Promotions",
    sort: "price_asc",
  },
  {
    to: "/products?sort=rating_desc",
    label: "Meilleurs produits",
    sort: "rating_desc",
  },
];

export function NavbarMenu() {
  const isMobile = useIsMobile();
  const { categoriesOptions, isLoading: isLoadingCategories } = useCategories();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSort = searchParams.get("sort") ?? "default";

  if (isLoadingCategories) return <div>Chargement des catégories...</div>;
  const renderCategoryLinks = () => {
    if (!categoriesOptions || categoriesOptions.length === 0) {
      return (
        <li>
          <NavigationMenuLink asChild>
            <span>Aucune catégorie</span>
          </NavigationMenuLink>
        </li>
      );
    }
    return categoriesOptions.map((cat: any) => (
      <NavigationMenuLink
        key={cat.value}
        asChild
        className={cn(
          currentPath == `/category/${cat.value}`
            ? "bg-gray-950 text-white hover:bg-gray-900 hover:text-white"
            : ""
        )}
      >
        <Link to={`/category/${cat.value}`}>{cat.label}</Link>
      </NavigationMenuLink>
    ));
  };

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>
            <ListCollapse size={16} />
            <span className="ml-2">Toutes les catégories</span>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid w-[230px] gap-4">
              <li>{renderCategoryLinks()}</li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* 
            Pour activer un "MenuLink" avec une bordure en bas lorsque le lien correspond à la page courante,
            tu peux utiliser le hook `useLocation` de react-router-dom pour récupérer le pathname courant,
            puis appliquer une classe conditionnelle sur le lien correspondant.
          */}
          {menuLinks.map(({ to, label, sort }) => (
            <NavigationMenuLink
              asChild
              key={to}
              className={cn(
                navigationMenuTriggerStyle(),
                currentSort === sort
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "border-b-2 border-transparent",
                "rounded-none"
              )}
            >
              <Link to={to}>{label}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  to,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { to: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={to}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
