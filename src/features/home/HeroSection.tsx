import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    title: "Nouvelle Collection Hiver 2026",
    subtitle: "Découvrez les dernières tendances",
    description: "Jusqu'à -50% sur une sélection d'articles",
    image: ["/images/souris.png", "/images/pc1.png", "/images/pcs.png"],
    cta: "Découvrir",
    ctaLink: "/products",
    bgGradient: "from-blue-600 to-purple-600",
  },
  {
    id: 2,
    title: "Offres Exceptionnelles",
    subtitle: "Promotions limitées",
    description: "Profitez de nos meilleurs prix de l'année",
    image: ["/images/ip11.png", "/images/casque.png"],
    cta: "Voir les offres",
    ctaLink: "/products?sort=promo",
    bgGradient: "from-orange-500 to-red-600",
  },
  {
    id: 3,
    title: "Livraison Gratuite",
    subtitle: "Sur toutes vos commandes",
    description: "Sans minimum d'achat pendant 48h",
     image: ["/images/jbl.png", "/images/tvmi.png", ""],
    cta: "Commander",
    ctaLink: "/products",
    bgGradient: "from-green-500 to-teal-600",
  },
];

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-background to-muted/20">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full overflow-hidden">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-linear-to-r ${slide.bgGradient} opacity-90`}
                />

                {/* Animated Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]" />
                </div>

                {/* Content */}
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <div className="max-w-3xl">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index, duration: 0.6 }}
                    >
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white mb-6">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {slide.subtitle}
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight font-poppins">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-xl md:text-2xl text-white/90 mb-8">
                        {slide.description}
                      </p>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Button
                          asChild
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
                        >
                          <Link to={slide.ctaLink}>
                            <ShoppingBag className="mr-2 h-5 w-5" />
                            {slide.cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="bg-transparent border-2 border-white text-white hover:bg-white/30 hover:text-white"
                        >
                          <Link to="/categories">Explorer les catégories</Link>
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="flex gap-8 mt-12">
                        <div>
                          <div className="text-3xl font-bold text-white">
                            2000+
                          </div>
                          <div className="text-sm text-white/80">Produits</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">
                            50K+
                          </div>
                          <div className="text-sm text-white/80">Clients</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-white">
                            4.8★
                          </div>
                          <div className="text-sm text-white/80">Note</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <div className="relative w-[520px] h-[520px]">
                      {/* Cercles animés centraux */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full animate-pulse" />
                        <div className="absolute inset-6 bg-white/5 backdrop-blur-sm rounded-full animate-pulse delay-150" />
                        <div className="absolute inset-12 bg-white/5 backdrop-blur-sm rounded-full animate-pulse delay-300" />
                      </div>

                      {/* Image décorative : haut-gauche */}
                      {slide.image[0] && (
                        <div className="absolute left-10 top-0 w-36 h-36  overflow-hidden   transform -translate-x-6 -translate-y-6">
                          <img
                            src={slide.image[0]}
                            alt={`${slide.title} decor`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Image décorative : droite-centre */}
                      {slide.image[1] && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96  overflow-hidden ">
                          <img
                            src={slide.image[1]}
                            alt={`${slide.title} decor-main`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Image décorative : bas-droite */}
                      {slide.image[2] && (
                        <div className="absolute right-10 bottom-0 w-full h-32 overflow-hidden  transform translate-x-6 translate-y-6">
                          <img
                            src={slide.image[2]}
                            alt={`${slide.title} decor2`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30" />
        <CarouselNext className="right-4 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30" />
      </Carousel>
    </section>
  );
}
