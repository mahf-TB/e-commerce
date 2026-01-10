import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/helpers";

export default function BlockPub() {
  return (
    <section className="py-16 px-4 ">
      <div className="mx-auto container space-y-8  md:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-xl space-y-6 text-center md:space-y-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">
            Flash Deals du Jour
          </h2>
          <p className="text-muted-foreground text-lg">
            Promotions exceptionnelles valables seulement aujourd’hui. Livraison
            rapide et retours simplifiés.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2"
        >
          <Card className="grid grid-rows-[1fr_auto] gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <div className="relative">
              <div className="absolute -top-20 left-0">
                <img
                  className="md:h-56 md:w-56 w-32 h-32 object-cover"
                  src="/images/pc1.png"
                  alt="Enceinte Bluetooth"
                />
              </div>
              <div className="absolute   top-0 left-1/2  right-0">
                <img
                  className="md:h-44 md:w-44 w-32 h-32 object-cover"
                  src="/images/ip11.png"
                  alt="Enceinte Bluetooth"
                />
              </div>
              <div className="absolute    -bottom-10  right-0">
                <img
                  className="md:h-44 md:w-44 w-32 h-32 object-cover"
                  src="/images/jbl.png"
                  alt="Enceinte Bluetooth"
                />
              </div>
              <div className="absolute    -bottom-5  left-10">
                <img
                  className="md:h-44 md:w-44 w-32 h-32 object-cover"
                  src="/images/tvmi.png"
                  alt="Enceinte Bluetooth"
                />
              </div>
            </div>
            <CardContent>
              <div className="grid  grid-rows-[1fr_auto] gap-6">
                {/* Badge */}

                <div className="">
                  <h3 className="text-2xl font-bold text-black font-poppins">
                    Stabilité pendant l'effort, étanches et autonomie longue
                    durée.
                  </h3>
                  <p className="text-sm text-black/80">
                    Son cristallin, autonomie 30h, réduction de bruit active et
                    confort ergonomique.Stabilité pendant l'effort, étanches et
                    autonomie longue durée.
                  </p>
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-3xl font-extrabold text-black">
                      <span className="text-lg font-normal">À partir du </span>{" "}
                      {formatPrice(850000)}
                    </div>
                    <div className="text-sm text-black/70 line-through">
                      {formatPrice(999000)}
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    Offre limitée
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="shadow-xl bg-black text-gray-100"
                  >
                    <Link to="/product/ecouteurs-x100">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Acheter maintenant
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="">
                    <Link to="/products?category=audio">
                      Voir la collection
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* block droite long  */}
          <Card className="md:col-span-2 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                className="h-full w-full object-cover dark:invert"
                src="/images/ecouteur.jpg"
                alt="Nike Logo"
                height="24"
                width="auto"
              />
            </div>

            <CardContent className="h-full w-2/3 pt-6 z-40">
              <div className="grid h-full max-w-md grid-rows-[auto_1fr_auto] gap-4">
                <div className="w-2/3">
                  <h3 className="text-2xl font-bold text-black font-poppins">
                    Écouteurs Sans Fil X100
                  </h3>
                  <p className="text-sm text-black/80">
                    Son cristallin, autonomie 30h, réduction de bruit active et
                    confort ergonomique.
                  </p>
                </div>

                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-3xl font-extrabold text-black">
                      29,99€
                    </div>
                    <div className="text-sm text-black/70 line-through">
                      59,99€
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="shadow-xl bg-black text-gray-100"
                  >
                    <Link to="/product/ecouteurs-x100">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Acheter maintenant
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="text-black border-white/40"
                  >
                    <Link to="/products?category=audio">
                      Voir la collection
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* deux autres produits en vente flash */}
          <Card className="relative p-0">
            <div className="absolute  z-40 sm:-bottom-20 bottom-1/2  right-0">
              <img
                className="h-44 w-44 object-cover"
                src="/images/jbl.png"
                alt="Enceinte Bluetooth"
              />
            </div>
            <CardContent className="py-6 z-40">
              <div className="grid grid-rows-[auto_1fr_auto] gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Enceinte Bluetooth B200
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Puissante, compacte et résistante à l'eau (IPX6).
                  </p>
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-xl font-bold">39,99€</div>
                    <div className="text-sm text-muted-foreground line-through">
                      79,99€
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    Quantité limitée
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild size="sm" className="">
                    <Link to="/product/enceinte-b200">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Acheter
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative p-0 ">
            <div className="absolute z-40 sm:-bottom-10 bottom-1/2 right-0">
              <img
                className="h-44 w-44 object-cover"
                src="/images/casque.png"
                alt="Casque Gaming"
              />
            </div>
            <CardContent className="py-6 z-40">
              <div className="grid  grid-rows-[auto_1fr_auto] gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Casque Gaming Pro G7
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Micro anti-bruit, son surround et confort longue durée.
                  </p>
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-xl font-bold">59,99€</div>
                    <div className="text-sm text-muted-foreground line-through">
                      119,99€
                    </div>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    Livraison 24-48h
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild size="sm" className="">
                    <Link to="/product/casque-gaming-g7">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Acheter
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
