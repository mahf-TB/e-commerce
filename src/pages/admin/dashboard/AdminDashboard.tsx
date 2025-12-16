import DateRangePickerComponent from "@/components/input-DateRangePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statsAllCommandes, statsAllCommandesPaiement } from "@/services/commandeService";
import React, { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [stats, setStats] = useState<any>(null);
  const [paiement, setPaiement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Raccourcis de dates
  const handleMoisEnCours = () => {
    const now = new Date();
    const premierJourMois = new Date(now.getFullYear(), now.getMonth(), 1);
    setDateRange({ from: premierJourMois, to: undefined });
  };

  const handle30DerniersJours = () => {
    const now = new Date();
    const il30Jours = new Date(now);
    il30Jours.setDate(now.getDate() - 30);
    setDateRange({ from: il30Jours, to: now });
  };

  const handleTout = () => {
    setDateRange(undefined);
  };

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Formater les dates au format YYYY-MM-DD pour le backend
        const params = {
          dateDebut: dateRange?.from
            ? dateRange.from.toISOString().split('T')[0]
            : undefined,
          dateFin: dateRange?.to
            ? dateRange.to.toISOString().split('T')[0]
            : undefined,
        };

        const [statsData, paiementData] = await Promise.all([
          statsAllCommandes(params),
          statsAllCommandesPaiement(params),
        ]);

        console.log('stat :', statsData);
        console.log('paiement :', paiementData);
        

        setStats(statsData);
        setPaiement(paiementData);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [dateRange]);

  return (
    <div className="p-5 space-y-6">
      {/* Filtre de dates */}
      <Card>
        <CardHeader>
          <CardTitle>Période d'analyse</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={handleTout}
            >
              Tout
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleMoisEnCours}
            >
              Mois en cours
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handle30DerniersJours}
            >
              30 derniers jours
            </Button>
          </div>
          <DateRangePickerComponent
            label="Période personnalisée"
            placeholder="Choisir une plage de dates"
            value={dateRange}
            onChange={setDateRange}
            description="Ou sélectionnez une période personnalisée"
          />
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Chargement des statistiques...
        </div>
      ) : (
        <>
          {/* Statistiques des commandes */}
          {stats && (
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[130px_1fr] gap-3 text-sm">
                  <span className="text-muted-foreground">Total commandes</span>
                  <span className="font-medium">
                    {typeof stats === 'object' && stats.count !== undefined 
                      ? stats.count 
                      : stats.totalCommandes || 0}
                  </span>
                  <span className="text-muted-foreground">Montant total</span>
                  <span className="font-medium">
                    {typeof stats === 'object' && stats.montant !== undefined
                      ? `${stats.montant} Ar`
                      : `${stats.montantTotal || 0} Ar`}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Statistiques des paiements */}
          {paiement && (
            <Card>
              <CardHeader>
                <CardTitle>Statistiques des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-[130px_1fr] gap-3 text-sm">
                  {Object.entries(paiement).map(([key, value]: [string, any]) => (
                    <React.Fragment key={key}>
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                      <span className="font-medium">
                        {typeof value === 'object' && value !== null
                          ? `${value.montant || 0} Ar (${value.count || 0})`
                          : `${value || 0} Ar`}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;