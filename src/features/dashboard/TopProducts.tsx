import { Card } from "@/components/ui/card";
import { formatPrice } from "@/utils/helpers";
import { TrendingUp } from "lucide-react";

interface TopProduct {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image?: string;
}

interface TopProductsProps {
  products: TopProduct[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="p-3 rounded bg-white border-gray-200 shadow-none gap-2">
      <div className="flex items-center justify-between mb-2 font-poppins">
        <h3 className="text-lg font-semibold text-gray-900">Top produits</h3>
        <TrendingUp className="size-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-900 text-white font-bold text-xs">
              {index + 1}
            </div>
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate mb-1 text-sm">
                {product.name}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">{product.sales} ventes</p>
                <p className="font-bold text-xs text-gray-500">
                  {formatPrice(Number(product.revenue))}{" "}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
