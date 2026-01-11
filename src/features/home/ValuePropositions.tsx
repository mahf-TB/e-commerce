import { motion } from "framer-motion";
import {
  Award,
  CreditCard,
  Headphones,
  RefreshCw,
  Shield,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Livraison Gratuite",
    description:
      "Livraison gratuite et rapide pour toutes les commandes supérieures à 50€, avec suivi en temps réel jusqu'à votre porte.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: RefreshCw,
    title: "Retour Gratuit",
    description:
      "Retour gratuit sous 30 jours sans justification — procédez au renvoi facilement et recevez votre remboursement rapidement une fois l'article reçu.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description:
      "Paiements sécurisés et cryptés, protégés par des systèmes anti-fraude avancés pour assurer la confidentialité de vos informations.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description:
      "Support client disponible 24/7 via chat, email ou téléphone — une équipe réactive prête à vous aider à tout moment.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: CreditCard,
    title: "Paiement Flexible",
    description:
      "Plusieurs options de paiement (Mvola, Airtel Money, Orange Money, cartes bancaires) avec des solutions flexibles et transparentes, sans frais cachés.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Award,
    title: "Garantie Qualité",
    description:
      "Garantie qualité sur tous nos produits : authenticité vérifiée, contrôles stricts et service après-vente dédié en cas de besoin.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

export function ValuePropositions() {
  return (
    <section className="py-16 px-4 bg-linear-to-b from-background to-muted/30">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3 font-poppins">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Des avantages pensés pour votre satisfaction
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="flex items-center ">
          <div className="relative mx-auto grid  grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-36 sm:gap-y-10 lg:grid-cols-3 ">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <CardValueProposition
                    icon={Icon}
                    title={benefit.title}
                    description={benefit.description}
                    color={benefit.color}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
{
  /* <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50 h-full">
  <CardContent className="p-6">
    <div className="flex items-start gap-4">

      <div
        className={`p-3 rounded-lg ${benefit.bgColor} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className={`h-6 w-6 ${benefit.color}`} />
      </div>


      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {benefit.title}
        </h3>
        <p className="text-sm text-muted-foreground">{benefit.description}</p>
      </div>
    </div>
  </CardContent>
</Card>; */
}

const CardValueProposition = ({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className={`size-6 ${color}`} />
        <h3 className="text-lg font-semibold font-poppins">{title}</h3>
      </div>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
};
