import { Card } from "@/components/ui/card";
import { FeaturedSection } from "@/features/products/FeaturedSection";
import { PriceFilter } from "@/features/products/PriceFilter";
import { ProductFilters } from "@/features/products/ProductFilters";
import { ListCheck } from "lucide-react";
import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";
import { useState } from "react";

const ProductPage = () => {
  const [open, setOpen] = useState(false);


  const FiltersPanel = (
    <Card className="shadow-none rounded p-5 gap-2">
      <div className="flex items-center text-gray-500 gap-2 border-b pb-2">
        <ListCheck size={12} />
        <span className="font-poppins text-xs">Options de filtrage</span>
      </div>
      <ProductFilters />
      <PriceFilter />
    </Card>
  );


  return (
    <div className="flex items-start mt-5 h-full">
      <div className="w-1/4 hidden md:block sticky top-20">{FiltersPanel}</div>
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
        <FeaturedSection setOpen={setOpen} />
      </div>
    </div>
  );
};

export default ProductPage;
