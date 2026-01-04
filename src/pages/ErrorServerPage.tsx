import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Server } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorServerPage() {
  const navigate = useNavigate();

  const handleRetry = () => {
    try {
      // Si on a un historique, revenir à la page précédente
      if (typeof window !== "undefined" && window.history.length > 1) {
        navigate(-1);
        // si la navigation ne suffit pas, forcer reload après court délai
        setTimeout(() => window.location.reload(), 100);
      } else {
        window.location.reload();
      }
    } catch (e) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <Card className="max-w-xl w-full p-8 text-center shadow-none rounded border-none">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-red-50 p-3">
            <Server className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h1 className="text-2xl font-semibold mb-2">Service indisponible</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Nous rencontrons actuellement un problème de connexion au serveur ou à la base de données. Certaines fonctionnalités peuvent être limitées. Merci de réessayer plus tard.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button onClick={handleRetry}>Réessayer</Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Retour
          </Button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Si le problème persiste, contacte le support ou réessaie dans quelques minutes.
        </p>
      </Card>
    </div>
  );
}
