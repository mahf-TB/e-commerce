import { EmptyState } from "@/components/EmptyState";
import SegmentedControl from "@/components/segmented-control";
import SelectForm, { type SelectOption } from "@/components/select-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatCard } from "@/features/dashboard/StatCard";
import { useAvisList } from "@/hooks/use-avis";
import type { Avis } from "@/services/avisService";
import { Calendar, CheckCircle, Clock, FileText, MessageSquare, Star, User } from "lucide-react";
import { useMemo, useState } from "react";

const filterOptions = [
  { value: "tous", label: "Tous statut" },
  { value: "approuve", label: "Approuvés" },
  { value: "en_attente", label: "En attente" },
  { value: "rejete", label: "Rejetés" },
];

const typeOptions = [
  { value: "tous", label: "Tous" },
  { value: "Produit", label: "Produits" },
  { value: "Commande", label: "Commandes" },
];

const noteOptions: SelectOption[] = [
  { value: "tous", label: "Toutes les notes" },
  { value: "5", label: "5 étoiles" },
  { value: "4", label: "4 étoiles" },
  { value: "3", label: "3 étoiles" },
  { value: "2", label: "2 étoiles" },
  { value: "1", label: "1 étoile" },
];

// Fonction pour formatter la date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Composant pour afficher les étoiles
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Composant pour un avis
const AvisCard = ({ avis }: { avis: Avis }) => {
  const clientNom = avis.client 
    ? `${avis.client.prenom || ''} ${avis.client.nom || ''}`.trim() || avis.client.username || "Client inconnu"
    : "Client anonyme";
  const clientEmail = avis.client?.email || "";
  const clientPhoto = avis.client?.photo;

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "approuve":
        return <Badge className="bg-green-100 text-green-700">Approuvé</Badge>;
      case "en_attente":
        return <Badge className="bg-yellow-100 text-yellow-700">En attente</Badge>;
      case "rejete":
        return <Badge className="bg-red-100 text-red-700">Rejeté</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="rounded border-gray-200 shadow-none bg-gray-50 hover:shadow-md transition-shadow">
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Avatar className="size-10">
              {clientPhoto && <AvatarImage src={clientPhoto} />}
              <AvatarFallback className="bg-gray-200">
                <User className="size-5 text-gray-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">
                  {clientNom}
                </h4>
                <StarRating rating={avis.note} />
              </div>
              {clientEmail && (
                <p className="text-sm text-gray-600">{clientEmail}</p>
              )}
            </div>
          </div>
          {getStatutBadge(avis.statut)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MessageSquare className="size-4" />
          <span className="font-medium">Produit : {avis?.item?.nom}</span>
        </div>
        {avis.commentaire && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {avis.commentaire}
          </p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="size-3" />
          {formatDate(avis.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};

export default function AvisPage() {
  const [statutFilter, setStatutFilter] = useState("tous");
  const [typeFilter, setTypeFilter] = useState("tous");
  const [noteFilter, setNoteFilter] = useState("tous");

  // Récupérer les avis depuis l'API
  const { avis, isLoading, totalItems } = useAvisList({
    statut: statutFilter,
    note: noteFilter === "tous" ? undefined : Number(noteFilter),
    limit: 100, // Récupérer tous les avis pour les stats
  });

  // Calculer les statistiques
  const stats = useMemo(() => {
    return {
      total: avis.length,
      approuve: avis.filter((a) => a.statut === "approuve").length,
      en_attente: avis.filter((a) => a.statut === "en_attente").length,
      rejete: avis.filter((a) => a.statut === "rejete").length,
      moyenneNote: avis.length > 0
        ? (avis.reduce((sum, a) => sum + a.note, 0) / avis.length).toFixed(1)
        : "0.0",
    };
  }, [avis]);

  return (
    <div className="space-y-6 p-6">
          {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total avis"
          value={stats.total}
          icon={FileText}
          iconColor="text-gray-900"
          subtitle="Tous les avis reçus"
        />
        <StatCard
          title="Approuvés"
          value={stats.approuve}
          icon={CheckCircle}
          iconColor="text-green-600"
          subtitle="Avis publiés"
        />
        <StatCard
          title="En attente"
          value={stats.en_attente}
          icon={Clock}
          iconColor="text-yellow-600"
          subtitle="Avis à modérer"
        />
        <StatCard
          title="Note moyenne"
          value={`${stats.moyenneNote} ⭐`}
          icon={Star}
          iconColor="text-yellow-400"
          subtitle="Satisfaction globale"
        />
      </div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 font-poppins">
            Avis clients
          </h1>

        </div>
        {/* Filtres en ligne avec header */}
        <div className="rounded bg-white border-gray-200">
          <div className="flex items-center gap-4 flex-wrap">
           
            <div className="min-w-[100px]">
              <SelectForm
                labelTitle="Statut"
                placeholder="Filtrer par statut"
                options={filterOptions}
                value={statutFilter}
                onChange={setStatutFilter}
                className="w-full"
              />
            </div>
            <div className="flex-1 min-w-30">
              <SelectForm
                labelTitle="Note"
                placeholder="Filtrer par note"
                options={noteOptions}
                value={noteFilter}
                onChange={setNoteFilter}
                className="w-full"
              />
            </div>
              <SegmentedControl
              value={typeFilter}
              onValueChange={setTypeFilter}
              options={typeOptions}
            />
          </div>
        </div>
      </div>


      {/* Liste des avis */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-600">Chargement des avis...</p>
          </div>
        </div>
      ) : avis.length === 0 ? (
        <EmptyState
          media={<MessageSquare className="size-12" />}
          title="Aucun avis trouvé"
          description="Aucun avis ne correspond à vos critères de recherche."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {avis.map((avisItem) => (
            <AvisCard key={avisItem.id} avis={avisItem} />
          ))}
        </div>
      )}
    </div>
  );
}