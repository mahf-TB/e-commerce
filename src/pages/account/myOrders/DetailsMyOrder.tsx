import { DetailCommande } from "@/features/orders/commande/DetailCommande";
import DetailCommandeSkeleton from "@/features/orders/skeleton/DetailCommandeSkeleton";
import { useCommande } from "@/hooks/use-commande";
import { useNavigate, useParams } from "react-router-dom";

const DetailsMyOrder = () => {
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: selectedOrderItems, isLoading } = useCommande(id);
  return (
    <div>
      {isLoading ? (
          <DetailCommandeSkeleton className="md:w-full" />
    ) : (
          <DetailCommande onCancel={() => navigate(-1)} order={selectedOrderItems} className="md:w-full mt-0" />
      )}
    </div>
  );
};

export default DetailsMyOrder;
