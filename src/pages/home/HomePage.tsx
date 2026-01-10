import BlockPub from "@/features/home/BlockPub";
import { BrandsSection } from "@/features/home/BrandsSection";
import { CategoriesSection } from "@/features/home/CategoriesSection";
import { FeaturedProducts } from "@/features/home/FeaturedProducts";
import FooterSection from "@/features/home/Footer";
import { HeroSection } from "@/features/home/HeroSection";
import { NewsletterSection } from "@/features/home/NewsletterSection";
import { PromoBanner } from "@/features/home/PromoBanner";
import { TestimonialsSection } from "@/features/home/TestimonialsSection";
import { ValuePropositions } from "@/features/home/ValuePropositions";
// import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <>
      {/* <Helmet>
        <title>Accueil - Votre E-Commerce de Confiance</title>
        <meta
          name="description"
          content="Découvrez notre large sélection de produits de qualité avec livraison gratuite et service client 24/7. Les meilleures offres du moment !"
        />
      </Helmet> */}

      <div className="min-h-screen bg-white">
        {/* Hero Section avec Carousel */}
        <HeroSection />

        {/* Categories Section */}
        <CategoriesSection />

        {/* Featured Products */}
        <FeaturedProducts
          sort="rating_desc"
          title="Produits en Vedette"
          description="Notre sélection des meilleurs produits"
        />

        {/* Promo Banners */}
        <BlockPub />
        <PromoBanner />

        {/* Featured Products */}
        <FeaturedProducts
          sort="newest"
          title="Nouveaux Arrivages"
          description="Notre sélection des nouveaux produits"
        />
        <FeaturedProducts
          sort="popular"
          title="Meilleures Ventes"
          description="Top produits les plus vendus. Notre sélection des meilleurs vendeurs"
        />
        {/* Value Propositions */}
        <ValuePropositions />
        {/* Brands Section */}
        <BrandsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Newsletter */}
        <NewsletterSection />
        <FooterSection />
      </div>
    </>
  );
};

export default HomePage;
