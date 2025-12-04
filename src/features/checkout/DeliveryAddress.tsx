import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputForm from "@/components/input-form";
import {  MapPin } from "lucide-react";
import { InputPhoneNumber } from "@/components/input-phone";
import { useState } from "react";

export function DeliveryAddress() {
  const [phone, setPhone] = useState("");
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
          required
        />
        <InputForm
          name="nom"
          label="Nom"
          placeholder="Entrez votre nom"
          type="text"
        />
      </div>

      <InputForm
        name="address"
        label="Adresse"
        type="text"
        required
        placeholder="Entrez votre adresse"
        iconLeft={<MapPin size={14} />}
      />

      <InputPhoneNumber
        id="phone"
        label="Numéro de téléphone"
        value={phone}
        onChange={setPhone}
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
