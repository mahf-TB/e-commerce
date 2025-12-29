import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="col-span-full flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4 max-w-md text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-200 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gray-100 p-6 rounded-full">
                <Lock className="text-red-600" size={36} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Accès refusé</h3>
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
              <div className="flex items-center justify-center gap-3 mt-5">
                <Button onClick={() => navigate(-1)}>Retour</Button>
                <Button variant="ghost" onClick={() => navigate('/')}>Accueil</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
