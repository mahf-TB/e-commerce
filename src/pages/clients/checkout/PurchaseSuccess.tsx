
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, FileText, Home, Package } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PurchaseSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderRef = searchParams.get("ref") || "N/A";

  useEffect(() => {
    // Animation d'entrée
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br  flex items-start justify-center p-4">
      <Card className="max-w-2xl w-full p-8 md:p-12 shadow-none animate-in fade-in-50 zoom-in-95 duration-500 bg-transparent border-none">
        {/* Icône de succès */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <CheckCircle2 className="relative text-green-500 animate-in zoom-in-50 duration-700" size={80} />
          </div>
        </div>

        {/* Message principal */}
        <div className="text-center mb-4 space-y-2">
          <h1 className="text-3xl md:text-4xl font-black font-poppins text-gray-900 animate-in slide-in-from-bottom-4 duration-500 delay-100">
            Commande confirmée !
          </h1>
          <p className="text-gray-600 text-lg animate-in slide-in-from-bottom-4 duration-500 delay-200">
            Merci pour votre achat
          </p>
        </div>

        {/* Détails commande */}
        <div className="bg-gray-50 rounded-lg p-6 mb-2 border border-gray-200 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Numéro de commande</span>
            <span className="font-mono font-bold text-gray-900">{orderRef}</span>
          </div>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Package className="text-blue-600 mt-1 shrink-0" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">
                Votre commande est en cours de traitement
              </p>
              <p className="text-blue-700">
                Vous recevrez un email de confirmation avec tous les détails de votre commande.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 animate-in slide-in-from-bottom-4 duration-500 delay-500">
          <Button
          variant={"outline"}
            className="w-full bg-green-600 hover:bg-green-700 text-white  hover:text-white h-12 text-base font-semibold rounded"
            onClick={() => navigate("/account/orders")}
          >
            <FileText size={18} className="mr-2" />
            Voir mes commandes 
          </Button>
          <Button
            variant="outline"
            className="w-full h-12 text-base rounded"
            onClick={() => navigate("/")}
          >
            <Home size={18} className="mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        {/* Message supplémentaire */}
        <div className="mt-8 text-center text-sm text-gray-500 animate-in fade-in duration-700 delay-700">
          <p>
            Besoin d'aide ? Contactez notre{" "}
            <button className="text-blue-600 hover:underline font-medium">
              service client
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PurchaseSuccess;