import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import InputForm from "@/components/utils/input-form";
import TextareaForm from "@/components/utils/textarea-form";
import { Upload, X } from "lucide-react";
import { useState } from "react";

interface StoreInfoSectionProps {
  data: {
    name: string;
    slogan: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    logo?: string;
    favicon?: string;
  };
  onChange: (field: string, value: string) => void;
}

export function StoreInfoSection({ data, onChange }: StoreInfoSectionProps) {
  const [logoPreview, setLogoPreview] = useState(data.logo || "");
  const [faviconPreview, setFaviconPreview] = useState(data.favicon || "");

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        onChange("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFaviconPreview(result);
        onChange("favicon", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Informations de la boutique</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Logo */}
          <div>
            <label className="block text-sm font-medium mb-2">Logo</label>
            <div className="flex items-center gap-4">
              {logoPreview && (
                <div className="relative">
                  <img src={logoPreview} alt="Logo" className="w-20 h-20 object-contain border rounded" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 bg-white shadow-md"
                    onClick={() => {
                      setLogoPreview("");
                      onChange("logo", "");
                    }}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Upload className="size-4" />
                  <span className="text-sm">{logoPreview ? "Changer" : "Télécharger"}</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          {/* Favicon */}
          <div>
            <label className="block text-sm font-medium mb-2">Favicon</label>
            <div className="flex items-center gap-4">
              {faviconPreview && (
                <div className="relative">
                  <img src={faviconPreview} alt="Favicon" className="w-12 h-12 object-contain border rounded" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6 bg-white shadow-md"
                    onClick={() => {
                      setFaviconPreview("");
                      onChange("favicon", "");
                    }}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              )}
              <label className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Upload className="size-4" />
                  <span className="text-sm">{faviconPreview ? "Changer" : "Télécharger"}</span>
                </div>
                <input
                  type="file"
                  accept="image/x-icon,image/png"
                  className="hidden"
                  onChange={handleFaviconChange}
                />
              </label>
            </div>
          </div>
        </div>

        <InputForm
          label="Nom de la boutique"
          name="name"
          value={data.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Ex: Ma Super Boutique"
          required
          className="bg-gray-50"
        />

        <TextareaForm
          label="Slogan / Description"
          name="slogan"
          value={data.slogan}
          onChange={(e: any) => onChange("slogan", e.target.value)}
          placeholder="Ex: Les meilleurs produits au meilleur prix"
          rows={2}
          className="bg-gray-50"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputForm
            label="Email principal"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="contact@boutique.com"
            required
            className="bg-gray-50"
          />

          <InputForm
            label="Téléphone"
            name="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            placeholder="+33 1 23 45 67 89"
            className="bg-gray-50"
          />
        </div>

        <InputForm
          label="Adresse"
          name="address"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="123 Rue Example"
          className="bg-gray-50"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputForm
            label="Ville"
            name="city"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="Paris"
            className="bg-gray-50"
          />

          <InputForm
            label="Code postal"
            name="postalCode"
            value={data.postalCode}
            onChange={(e) => onChange("postalCode", e.target.value)}
            placeholder="75001"
            className="bg-gray-50"
          />

          <InputForm
            label="Pays"
            name="country"
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="France"
            className="bg-gray-50"
          />
        </div>
      </div>
    </Card>
  );
}
