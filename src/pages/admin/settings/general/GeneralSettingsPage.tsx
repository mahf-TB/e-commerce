import { Button } from "@/components/ui/button";
import { LegalInfoSection } from "@/features/settings/LegalInfoSection";
import { LocalizationSection } from "@/features/settings/LocalizationSection";
import { SeoSection } from "@/features/settings/SeoSection";
import { SocialMediaSection } from "@/features/settings/SocialMediaSection";
import { StoreInfoSection } from "@/features/settings/StoreInfoSection";
import { showToast } from "@/lib/toast";
import { Save } from "lucide-react";
import { useState } from "react";

export default function GeneralSettingsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [storeInfo, setStoreInfo] = useState({
    name: "Ma Boutique E-commerce",
    slogan: "Les meilleurs produits au meilleur prix",
    email: "contact@maboutique.com",
    phone: "+33 1 23 45 67 89",
    address: "123 Rue Example",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    logo: "",
    favicon: "",
  });

  const [localization, setLocalization] = useState({
    currency: "EUR",
    language: "fr",
    timezone: "Europe/Paris",
    dateFormat: "DD/MM/YYYY",
  });

  const [socialMedia, setSocialMedia] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
  });

  const [seo, setSeo] = useState({
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [legalInfo, setLegalInfo] = useState({
    siret: "",
    tva: "",
    legalName: "",
  });

  const handleStoreInfoChange = (field: string, value: string) => {
    setStoreInfo({ ...storeInfo, [field]: value });
  };

  const handleLocalizationChange = (field: string, value: string) => {
    setLocalization({ ...localization, [field]: value });
  };

  const handleSocialMediaChange = (field: string, value: string) => {
    setSocialMedia({ ...socialMedia, [field]: value });
  };

  const handleSeoChange = (field: string, value: string) => {
    setSeo({ ...seo, [field]: value });
  };

  const handleLegalInfoChange = (field: string, value: string) => {
    setLegalInfo({ ...legalInfo, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Settings:", {
        storeInfo,
        localization,
        socialMedia,
        seo,
        legalInfo,
      });

      showToast("success", "Paramètres enregistrés avec succès");
    } catch (error: any) {
      showToast("error", error?.message || "Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paramètres généraux</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configuration générale de votre boutique en ligne
          </p>
        </div>
        <Button type="submit" disabled={isSubmitting} className="rounded shadow-sm">
          <Save className="size-4 mr-1.5" />
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>

      {/* Sections */}
      <StoreInfoSection data={storeInfo} onChange={handleStoreInfoChange} />
      <LocalizationSection data={localization} onChange={handleLocalizationChange} />
      <SocialMediaSection data={socialMedia} onChange={handleSocialMediaChange} />
      <SeoSection data={seo} onChange={handleSeoChange} />
      <LegalInfoSection data={legalInfo} onChange={handleLegalInfoChange} />

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" disabled={isSubmitting} className="rounded shadow-sm">
          <Save className="size-4 mr-1.5" />
          {isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
      </div>
    </form>
  );
}
