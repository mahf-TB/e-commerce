import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import InputForm from "@/components/utils/input-form";
import { InputPhoneNumber } from "@/components/utils/input-phone";
import { MapPin } from "lucide-react";

interface DeliveryAddressProps {
  prenom?: string;
  nom?: string;
  adresse?: string;
  contact?: string;
  onPrenomChange?: (value: string) => void;
  onNomChange?: (value: string) => void;
  onAdresseChange?: (value: string) => void;
  onContactChange?: (value: string) => void;
}

export function DeliveryAddress({
  prenom = "",
  nom = "",
  adresse = "",
  contact = "",
  onPrenomChange,
  onNomChange,
  onAdresseChange,
  onContactChange,
}: DeliveryAddressProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold font-poppins">
        Adresse de livraison
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InputForm
          name="prenom"
          label="Prénom"
          placeholder="Entrez votre prénom"
          type="text"
          value={prenom}
          onChange={(e) => onPrenomChange?.(e.target.value)}
          required
        />
        <InputForm
          name="nom"
          label="Nom"
          placeholder="Entrez votre nom"
          type="text"
          value={nom}
          onChange={(e) => onNomChange?.(e.target.value)}
        />
      </div>

      <InputForm
        name="address"
        label="Adresse"
        type="text"
        required
        placeholder="Entrez votre adresse"
        value={adresse}
        onChange={(e) => onAdresseChange?.(e.target.value)}
        iconLeft={<MapPin size={14} />}
      />

      <InputPhoneNumber
        id="phone"
        label="Numéro de téléphone"
        value={contact}
        onChange={(value) => onContactChange?.(value)}
        placeholder="Entrez votre numéro"
        required
      />

      <div className="flex items-center space-x-2">
        <Checkbox id="save-info" />
        <Label htmlFor="save-info" className="text-sm text-muted-foreground">
          Enregistrer ces informations pour la prochaine fois
        </Label>
      </div>
    </div>
  );
}
