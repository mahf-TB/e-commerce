import { Card } from "@/components/ui/card";
import InputForm from "@/components/utils/input-form";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

interface SocialMediaSectionProps {
  data: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
  };
  onChange: (field: string, value: string) => void;
}

export function SocialMediaSection({ data, onChange }: SocialMediaSectionProps) {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Réseaux sociaux</h2>
      
      <div className="space-y-4">
        <InputForm
          label="Facebook"
          name="facebook"
          value={data.facebook}
          onChange={(e) => onChange("facebook", e.target.value)}
          placeholder="https://facebook.com/maboutique"
          iconLeft={<Facebook size={14} />}
          className="bg-gray-50"
        />

        <InputForm
          label="Instagram"
          name="instagram"
          value={data.instagram}
          onChange={(e) => onChange("instagram", e.target.value)}
          placeholder="https://instagram.com/maboutique"
          iconLeft={<Instagram size={14} />}
          className="bg-gray-50"
        />

        <InputForm
          label="Twitter"
          name="twitter"
          value={data.twitter}
          onChange={(e) => onChange("twitter", e.target.value)}
          placeholder="https://twitter.com/maboutique"
          iconLeft={<Twitter size={14} />}
          className="bg-gray-50"
        />

        <InputForm
          label="LinkedIn"
          name="linkedin"
          value={data.linkedin}
          onChange={(e) => onChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/company/maboutique"
          iconLeft={<Linkedin size={14} />}
          className="bg-gray-50"
        />

        <InputForm
          label="YouTube"
          name="youtube"
          value={data.youtube}
          onChange={(e) => onChange("youtube", e.target.value)}
          placeholder="https://youtube.com/@maboutique"
          iconLeft={<Youtube size={14} />}
          className="bg-gray-50"
        />
      </div>
    </Card>
  );
}
