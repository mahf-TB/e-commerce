import { Card } from "@/components/ui/card";
import InputForm from "@/components/utils/input-form";

interface LegalInfoSectionProps {
  data: {
    siret: string;
    tva: string;
    legalName: string;
  };
  onChange: (field: string, value: string) => void;
}

export function LegalInfoSection({ data, onChange }: LegalInfoSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Informations légales</h2>
      
      <div className="space-y-4">
        <InputForm
          label="Raison sociale"
          name="legalName"
          value={data.legalName}
          onChange={(e) => onChange("legalName", e.target.value)}
          placeholder="Ex: SARL Ma Boutique"
          className="bg-gray-50"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            label="SIRET"
            name="siret"
            value={data.siret}
            onChange={(e) => onChange("siret", e.target.value)}
            placeholder="123 456 789 00012"
            className="bg-gray-50"
          />

          <InputForm
            label="TVA Intracommunautaire"
            name="tva"
            value={data.tva}
            onChange={(e) => onChange("tva", e.target.value)}
            placeholder="FR 12 345678901"
            className="bg-gray-50"
          />
        </div>
      </div>
    </Card>
  );
}
