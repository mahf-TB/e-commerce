import { Card } from "@/components/ui/card";
import InputForm from "@/components/utils/input-form";
import TextareaForm from "@/components/utils/textarea-form";

interface SeoSectionProps {
  data: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  onChange: (field: string, value: string) => void;
}

export function SeoSection({ data, onChange }: SeoSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">SEO & Référencement</h2>
      
      <div className="space-y-4">
        <InputForm
          label="Meta titre"
          name="metaTitle"
          value={data.metaTitle}
          onChange={(e) => onChange("metaTitle", e.target.value)}
          placeholder="Titre du site pour les moteurs de recherche"
          className="bg-gray-50"
        //   helperText={`${data.metaTitle.length}/60 caractères`}
        />

        <TextareaForm
          label="Meta description"
          name="metaDescription"
          value={data.metaDescription}
          onChange={(e: any) => onChange("metaDescription", e.target.value)}
          placeholder="Description du site pour les moteurs de recherche"
          rows={3}
          className="bg-gray-50"
        //   helperText={`${data.metaDescription.length}/160 caractères`}
        />

        <InputForm
          label="Meta keywords"
          name="metaKeywords"
          value={data.metaKeywords}
          onChange={(e) => onChange("metaKeywords", e.target.value)}
          placeholder="mot-clé1, mot-clé2, mot-clé3"
          className="bg-gray-50"
        //   helperText="Séparez les mots-clés par des virgules"
        />
      </div>
    </Card>
  );
}
