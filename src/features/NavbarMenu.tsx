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
import { Link, useLocation, useSearchParams } from "react-router-dom";

const menuLinks = [
  {
    to: "/products?sort=popular",
    label: "Tendances du moment",
    sort: "popular",
  },
  {
    to: "/products?sort=newest",
    label: "Dernières nouveautés",
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
  {
    to: "/products?sort=price_desc",
    label: "Haut de gamme",
    sort: "price_desc",
  },
  { to: "/products?sort=rating_asc", label: "À découvrir", sort: "rating_asc" },
];

export function NavbarMenu() {
  const isMobile = useIsMobile();
  const { categoriesOptions, isLoading } = useCategories();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSort = searchParams.get("sort") ?? "default";

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
        <NavigationMenuItem className=" hidden md:block" >
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
        <NavigationMenuItem className="">
          {(() => {
            // Ensure this runs after the menu renders (no hooks/import changes required)
            setTimeout(() => {
              if (typeof window === "undefined") return;
              if (!document.getElementById("hide-scrollbar-styles")) {
                const style = document.createElement("style");
                style.id = "hide-scrollbar-styles";
                style.textContent = `
                  .scrollbar-hide::-webkit-scrollbar { display: none; }
                  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `;
                document.head.appendChild(style);
              }
              if (window.innerWidth > 768) return; // only on mobile
              const container = document.querySelector(".flex.flex-1.justify-center") as HTMLElement | null;
              if (!container) return;

              // make the links horizontally scrollable on mobile
              container.classList.add("overflow-x-auto", "whitespace-nowrap", "scrollbar-hide");

              const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("a"));
              const active = links.find((a) => a.getAttribute("href")?.includes(`sort=${currentSort}`));

              if (active) {
                active.scrollIntoView({ inline: "center", behavior: "smooth" });
              }

              // ensure clicked links scroll into view
              links.forEach((a) =>
                a.addEventListener("click", () =>
                  setTimeout(() => a.scrollIntoView({ inline: "center", behavior: "smooth" }), 80)
                )
              );
            }, 50);

            return null;
          })()}
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
                  ? "border-b-3 border-primary -mb-6 text-primary font-semibold"
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
