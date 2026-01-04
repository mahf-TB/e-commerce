import { Card } from "@/components/ui/card";
import BadgeItem from "@/components/utils/BadgeItem";
import { formatDateTime, getLibelleStatut, getStatusColorClass } from "@/utils/helpers";

export const CommandeCard = ({ order, onClick, selected }: any) => {
  return (
    <Card
      onClick={onClick}
      className={`p-4 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${
        selected ? "border-yellow-500" : "border-gray-300"
      }`}
    >
      <div className="flex flex-col space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b">
          <div>
            <span className="uppercase tracking-wide font-poppins font-semibold">
              N° {order.reference}
            </span>
          </div>
          <BadgeItem
            statut={getLibelleStatut(order.statut)}
            className={getStatusColorClass(order.statut , "500")}
          />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-[80px_1fr] gap-1 text-sm text-left">
          <span className="text-muted-foreground">Date</span>
          <span className="font-medium">
            {order?.creeLe ? formatDateTime(order.creeLe) : ""}
          </span>

          <span className="text-muted-foreground">Client</span>
          <span className="font-medium">{order?.client.nom}</span>

          <span className="text-muted-foreground">Articles</span>
          <span className="font-medium">{order.items.length}</span>
        </div>
        {/* Product Images */}
        <div className="overflow-x-auto py-2 scrollbar-thin">
          <div className="flex -space-x-2 hover:space-x-1 ">
            {order.items?.map((item: any, i: number) => (
              <img
                key={i}
                alt="Avatar 01"
                className="rounded-md ring-2 ring-background"
                height={48}
                src={item?.imagePrincipale || "/images/default-product.jpg"}
                width={48}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
