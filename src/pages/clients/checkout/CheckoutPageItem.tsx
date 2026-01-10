import { Spinner } from "@/components/icon/spinner";
import { Button } from "@/components/ui/button";
import { DeliveryAddress } from "@/features/checkout/DeliveryAddress";
import { OrderSummary } from "@/features/checkout/OrderSummary";
import { PaymentMethods } from "@/features/checkout/PaymentMethods";
import { ShippingMethod } from "@/features/checkout/ShippingMethod";
import { showToast } from "@/lib/toast";
import { createCommande, type CommandeItem } from "@/services/commandeService";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export default function CheckoutPageItem() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { produitId, variantId } = useParams<{
    variantId: string;
    produitId: string;
  }>();
  const quantite = searchParams.get("qte") || 1;
  // États pour les informations de livraison
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [contact, setContact] = useState("");

  // État pour le mode de livraison
  const [typeLivraison, setTypeLivraison] = useState("standard");

  // États pour le paiement
  const [modePaye, setModePaye] = useState("card");
  const [phoneMvola, setPhoneMvola] = useState("");
  // const [cardData, setCardData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs requis
    if (!prenom.trim()) {
      showToast(
        "error",
        "Veuillez remplir le prénom et le nom du destinataire"
      );
      return;
    }

    if (!adresse.trim()) {
      showToast("error", "Veuillez remplir l'adresse de livraison");
      return;
    }

    // Pas de validation nécessaire pour le paiement en espèce
    setIsSubmitting(true);

    try {
      // Préparer les items de la commande
      const items: CommandeItem[] = [
        {
          produit: String(produitId),
          variantId: String(variantId),
          quantite: Number(quantite) || 1,
        },
      ];

      // Calculer les frais de livraison
      const fraisLivraison =
        typeLivraison === "standard"
          ? 5000
          : typeLivraison === "express"
          ? 10000
          : 0;

      // Préparer le payload
      const nomDestinataire = `${prenom.trim()} ${nom.trim()}`.trim();

      // Déterminer le type de livraison avec le bon type
      let typeLivraisonValue: "standard" | "express" | "retrait_magasin" =
        "standard";
      if (typeLivraison === "retrait_magasin") {
        typeLivraisonValue = "retrait_magasin";
      } else if (typeLivraison === "express") {
        typeLivraisonValue = "express";
      }

      // Déterminer l'état de paiement selon la méthode choisie
      // Espèce = en_attente, autres méthodes = paye
      const etatPaiementValue: "en_attente" | "paye" =
        modePaye === "espece" ? "en_attente" : "paye";

      const payload = {
        nomDestinataire,
        contactDestinataire: contact || null,
        adresseLivraison: adresse || null,
        typeLivraison: typeLivraisonValue,
        etatPaiement: etatPaiementValue,
        statutCommande: "en_attente" as const,
        frais: fraisLivraison,
        items,
      };

      console.log(payload);

      // Créer la commande
      const res = await createCommande(payload);
      showToast("success", "Commande créée avec succès !");
      // Vider le panier
      // Rediriger vers la page de succès ou les commandes
      navigate(`/checkout/success?ref=${res.reference}`);
    } catch (error: any) {
      console.error("Erreur lors de la création de la commande:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Une erreur est survenue lors de la création de la commande";
      showToast("error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 top-0 -mx-[50vw]">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start -mt-4 -mb-4 h-full ">
          <div className="w-1/2 space-y-6 bg-white p-10 px-[7vw]">
          <Button
              variant="outline"
              size="icon"
              type="button"
              className="rounded"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
            </Button>
            <DeliveryAddress
              prenom={prenom}
              nom={nom}
              adresse={adresse}
              contact={contact}
              onPrenomChange={setPrenom}
              onNomChange={setNom}
              onAdresseChange={setAdresse}
              onContactChange={setContact}
            />
            <ShippingMethod
              value={typeLivraison}
              onValueChange={setTypeLivraison}
            />
            <PaymentMethods
              modePaye={modePaye}
              phone={phoneMvola}
              onModePayeChange={setModePaye}
              onPhoneChange={setPhoneMvola}
              // onCardDataChange={setCardData}
            />
            <Button
              type="submit"
              className="w-full rounded flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner size="md" />}
              <span>
                {isSubmitting ? "Traitement..." : "Procéder au paiement"}
              </span>
            </Button>
          </div>
          <div className="w-1/2 space-y-2 p-10 px-[7vw] md:sticky md:top-6">
            <OrderSummary
              qte={Number(quantite)}
              fraisLivraison={
                typeLivraison === "express"
                  ? 10000
                  : typeLivraison === "retrait_magasin"
                  ? 0
                  : 5000
              }
            />
          </div>
        </div>
      </form>
    </div>
  );
}
