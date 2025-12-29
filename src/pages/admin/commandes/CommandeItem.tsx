import { DetailCommande } from '@/features/orders/commande/DetailCommande';
import DetailCommandeSkeleton from '@/features/orders/skeleton/DetailCommandeSkeleton';
import { useCommande } from '@/hooks/use-commande';
import { useNavigate, useParams } from 'react-router-dom';

const CommandeItem = () => {
   const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: selectedOrderItems, isLoading } = useCommande(id);
  return (
    <div className="container mx-auto px-4 py-6 h-full" >
      {isLoading ? (
          <DetailCommandeSkeleton className="md:w-full" />
    ) : (
          <DetailCommande onCancel={() => navigate(-1)} order={selectedOrderItems} className="md:w-full mt-0 mb-5" />
      )}
    </div>
  );
}

export default CommandeItem