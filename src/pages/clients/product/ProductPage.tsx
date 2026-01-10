import { Card } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { FeaturedSection } from "@/features/products/listGrid/FeaturedSection";
import { PriceFilter } from "@/features/products/listGrid/PriceFilter";
import { ProductFilters } from "@/features/products/listGrid/ProductFilters";
import { FiltersPanelSkeleton } from "@/features/products/skeleton/FiltersPanelSkeleton";
import useCategories from "@/hooks/use-categories";
import useBrands from "@/hooks/use-marques";
import { ListCheck } from "lucide-react";
import { useState } from "react";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<(number | string)[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    (number | string)[]
  >([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 100000000,
  ]);

  console.log("Marques sélectionnées :", selectedBrands);
  console.log("Catégories sélectionnées :", selectedCategories);
  
  const { categoriesOptions, isLoading: isLoadingCategories } = useCategories();
  const { marquesOptions, isLoading: isLoadingBrands } = useBrands();
  const isFiltersLoading = isLoadingCategories || isLoadingBrands;

  // Map selected ids to option objects { value, label } for display (badges)
  const selectedBrandOptions = selectedBrands.map((id) => {
    const found = marquesOptions?.find((m: any) => String(m.value) === String(id));
    return found ?? { value: id, label: String(id) };
  });

  const selectedCategoryOptions = selectedCategories.map((id) => {
    const found = categoriesOptions?.find((c: any) => String(c.value) === String(id));
    return found ?? { value: id, label: String(id) };
  });

  const FiltersPanel = isFiltersLoading ? (
    <FiltersPanelSkeleton />
  ) : (
    <Card className="shadow-none rounded p-5 pt-0 gap-2  max-md:border-none md:max-h-[80vh] max-h-screen overflow-y-auto">
      {/* Titre de la section de filtres */}
      <div className="flex items-center text-gray-500 gap-2 border-b pt-4 pb-2 z-50 sticky top-0 bg-white">
        <ListCheck size={12} />
        <span className="font-poppins text-xs">Options de filtrage</span>
      </div>
      {/* Composants de filtres par Marque et categorie */}
      <ProductFilters
        selectedBrands={selectedBrands}
        selectedCategories={selectedCategories}
        categoriesOptions={categoriesOptions}
        marquesOptions={marquesOptions}
        onChange={({ brands, categories }) => {
          setSelectedBrands(brands);
          setSelectedCategories(categories);
        }}
      />
      {/* Filtre par Prix, min et max */}
      <PriceFilter value={priceRange} onChange={setPriceRange} />
    </Card>
  );

  return (
    <div className="flex items-start mt-2 h-full">
      <div className="w-1/4 hidden md:block sticky top-30">{FiltersPanel}</div>
      <div className=" md:w-3/4 w-full px-5">
        <div className="flex items-center justify-between md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent side="left" className="w-[85%] max-w-sm">
              <div className="space-y-4">{FiltersPanel}</div>
            </SheetContent>
          </Sheet>
          {/* Ici tu peux mettre ton “Sort: Popular” si tu veux aussi sur mobile */}
          {/* <SortMenu /> */}
        </div>
        <FeaturedSection
          setOpen={setOpen}
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          selectedBrandOptions={selectedBrandOptions}
          selectedCategoryOptions={selectedCategoryOptions}
          onRemoveBrand={(value) =>
            setSelectedBrands((prev) => prev.filter((id) => String(id) !== String(value)))
          }
          onRemoveCategory={(value) =>
            setSelectedCategories((prev) => prev.filter((id) => String(id) !== String(value)))
          }
        />
      </div>
    </div>
  );
};

export default ProductPage;
