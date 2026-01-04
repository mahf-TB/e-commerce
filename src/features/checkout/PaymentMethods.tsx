import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import InputCardPayment from "@/components/utils/input-card-payment";
import { InputPhoneNumber } from "@/components/utils/input-phone";

interface PaymentMethodsProps {
  modePaye?: string;
  phone?: string;
  onModePayeChange?: (value: "card" | "espece" | "mvola") => void;
  onPhoneChange?: (value: string) => void;
  onCardDataChange?: (data: any) => void;
}

export function PaymentMethods({
  modePaye = "card",
  phone = "",
  onModePayeChange,
  onPhoneChange,
  onCardDataChange,
}: PaymentMethodsProps) {
  const handleCardDataChange = (data: any) => {
    onCardDataChange?.(data);
    console.log("Données de carte:", data);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Payment</h3>
      <RadioGroup
        value={modePaye}
        className="gap-0 border-gray-300"
        onValueChange={(value: any) => {
          console.log(value);
          onModePayeChange?.(value);
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
        <div className="space-y-3 border border-t-0 p-3 border-gray-300 rounded-none py-3">
          <div className="flex items-center gap-2 px-3">
            <RadioGroupItem id="mvola" value="mvola" />
            <Label htmlFor="mvola">Mvola</Label>
          </div>
          {modePaye === "mvola" && (
            <InputPhoneNumber
              id="phone-56"
              // label="Numéro de téléphone"
              className="border-none"
              hideLabel
              value={phone}
              onChange={(value) => onPhoneChange?.(value)}
              placeholder="Entrez votre numéro"
              defaultCountry="MG"
            />
          )}
        </div>
        <div className="space-y-3 border border-t-0 border-gray-300 rounded-b-lg rounded-t-none p-3 overflow-hidden">
          <div className="flex items-center gap-2 px-3">
            <RadioGroupItem id="espece" value="espece" />
            <Label htmlFor="espece">Espèce</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
