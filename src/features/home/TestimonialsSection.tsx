import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Cliente fidèle",
    avatar: "/avatars/marie.jpg",
    rating: 5,
    comment:
      "Service exceptionnel ! La livraison était rapide et les produits exactement comme décrits. Je recommande vivement !",
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Acheteur régulier",
    avatar: "/avatars/thomas.jpg",
    rating: 5,
    comment:
      "Excellent rapport qualité-prix. Le service client est très réactif et professionnel. Je n'achète plus ailleurs !",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Nouvelle cliente",
    avatar: "/avatars/sophie.jpg",
    rating: 4,
    comment:
      "Très satisfaite de ma première commande. L'interface est intuitive et le suivi de commande impeccable.",
  },
  {
    id: 4,
    name: "Jean Moreau",
    role: "Client VIP",
    avatar: "/avatars/jean.jpg",
    rating: 5,
    comment:
      "Je suis client depuis 2 ans et je n'ai jamais été déçu. La qualité est toujours au rendez-vous !",
  },
  {
    id: 5,
    name: "Isabelle Petit",
    role: "Cliente satisfaite",
    avatar: "/avatars/isabelle.jpg",
    rating: 5,
    comment:
      "Le système de retour est simple et efficace. Le service après-vente est à l'écoute et très professionnel.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-muted/30 relative">

      {/* <div className="absolute bottom-20 right-10 w-32 h-32 bg-gray-300/80 rounded-full blur-xl animate-pulse delay-700" /> */}
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
              Ce Que Disent Nos Clients
            </h2>
            <p className="text-muted-foreground text-lg">
              Des milliers de clients satisfaits à travers la France
            </p>
          </motion.div>
        </div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="h-full border-2 hover:border-primary/50 rounded-md transition-all duration-300">
                    <CardContent className="px-6">
                      <div className="flex items-center justify-between gap-4 mb-2">
                          
                          {/* Rating */}
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < testimonial.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                )}
                              />
                            ))}
                          </div>
                          {/* Quote Icon */}
                          <div className="">
                            <Quote className="h-10 w-10 text-primary/30" />
                          </div>
                      </div>

                      {/* Comment */}
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        "{testimonial.comment}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "50K+", label: "Clients Satisfaits" },
            { value: "4.8/5", label: "Note Moyenne" },
            { value: "98%", label: "Taux de Satisfaction" },
            { value: "12K+", label: "Avis Positifs" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-lg bg-background/50"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
