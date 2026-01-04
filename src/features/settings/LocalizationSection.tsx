import { Card } from "@/components/ui/card";
import SelectForm from "@/components/utils/select-form";

interface LocalizationSectionProps {
  data: {
    currency: string;
    language: string;
    timezone: string;
    dateFormat: string;
  };
  onChange: (field: string, value: string) => void;
}

const currencies = [
  { value: "EUR", label: "Euro (€)" },
  { value: "USD", label: "Dollar US ($)" },
  { value: "GBP", label: "Livre Sterling (£)" },
  { value: "CHF", label: "Franc Suisse (CHF)" },
];

const languages = [
  { value: "fr", label: "Français" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "de", label: "Deutsch" },
];

const timezones = [
  { value: "Europe/Paris", label: "Europe/Paris (UTC+1)" },
  { value: "Europe/London", label: "Europe/London (UTC+0)" },
  { value: "America/New_York", label: "America/New York (UTC-5)" },
  { value: "Asia/Tokyo", label: "Asia/Tokyo (UTC+9)" },
];

const dateFormats = [
  { value: "DD/MM/YYYY", label: "JJ/MM/AAAA (31/12/2025)" },
  { value: "MM/DD/YYYY", label: "MM/JJ/AAAA (12/31/2025)" },
  { value: "YYYY-MM-DD", label: "AAAA-MM-JJ (2025-12-31)" },
];

export function LocalizationSection({ data, onChange }: LocalizationSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Localisation & Formats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectForm
          label="Devise par défaut"
          value={data.currency}
          onChange={(value) => onChange("currency", value)}
          options={currencies}
          className="bg-gray-50"
        />

        <SelectForm
          label="Langue par défaut"
          value={data.language}
          onChange={(value) => onChange("language", value)}
          options={languages}
          className="bg-gray-50"
        />

        <SelectForm
          label="Fuseau horaire"
          value={data.timezone}
          onChange={(value) => onChange("timezone", value)}
          options={timezones}
          className="bg-gray-50"
        />

        <SelectForm
          label="Format de date"
          value={data.dateFormat}
          onChange={(value) => onChange("dateFormat", value)}
          options={dateFormats}
          className="bg-gray-50"
        />
      </div>
    </Card>
  );
}
