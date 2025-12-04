import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import InputCardPayment from "@/components/input-card-payment";
import { Button } from "@/components/ui/button";
import { InputPhoneNumber } from "@/components/input-phone";

export function PaymentMethods() {
  const [modePaye, setModePays] = useState("card");
  const [phone, setPhone] = useState("");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    cardType: null,
    isTouched: false,
    error: null,
  });

  const isCardValid = cardData.isTouched && !cardData.error;
  const handleCardDataChange = (data: any) => {
    setCardData(data);
    console.log("Données de carte:", data);
    // Vérifier si la carte est valide
    console.log("Vérifier si la carte est valide ", isCardValid);
  };
  console.log(isCardValid);

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Payment</h3>
      <RadioGroup
        defaultValue="card"
        className="gap-0 border-gray-300"
        onValueChange={(value: any) => {
          console.log(value);
          setModePays(value);
        }}
      >
        <div className="space-y-3 border  border-gray-300 rounded-t-lg rounded-b-none py-3">
          <div className="flex items-center gap-2 px-6">
            <RadioGroupItem id="card" value="card" />
            <Label htmlFor="card">Carte Bancaire</Label>
          </div>
          {modePaye === "card" && (
            <InputCardPayment onCardDataChange={handleCardDataChange} />
          )}
        </div>
        <div className="space-y-3 border  border-gray-300 rounded-t-none rounded-b-lg p-3 overflow-hidden">
          <div className="flex items-center gap-2 px-3">
            <RadioGroupItem id="mvola" value="mvola" />
            <Label htmlFor="paypal">Mvola</Label>
          </div>
          {modePaye === "mvola" && (
            <InputPhoneNumber
              id="phone-56"
              // label="Numéro de téléphone"
              className="border-none"
              hideLabel
              value={phone}
              onChange={setPhone}
              placeholder="Entrez votre numéro"
              defaultCountry="MG"
            />
          )}
        </div>
      </RadioGroup>
      <Button disabled={!isCardValid} className="w-full rounded">
        Procéder au paiement
      </Button>
    </div>
  );
}
