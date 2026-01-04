import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/utils/EmptyState";
import { CreateTicketModal } from "@/features/support/CreateTicketModal";
import {
  SupportTicketCard,
  type SupportTicket,
  type TicketPriority,
} from "@/features/support/SupportTicketCard";
import {
  BookOpen,
  FileText,
  HelpCircle,
  MessageSquare,
  Plus,
  Search,
  Video,
} from "lucide-react";
import { useState } from "react";

// Données de démo pour tickets
const demoTickets: SupportTicket[] = [
  {
    id: "1",
    title: "Problème de connexion à mon compte",
    description: "Je n'arrive pas à me connecter depuis ce matin.",
    status: "open",
    priority: "high",
    category: "Compte",
    createdAt: "2025-12-24T10:30:00",
    updatedAt: "2025-12-24T10:30:00",
    messagesCount: 3,
  },
  {
    id: "2",
    title: "Question sur ma dernière commande",
    description: "Où en est ma commande #12345",
    status: "resolved",
    priority: "medium",
    category: "Commande",
    createdAt: "2025-12-23T14:20:00",
    updatedAt: "2025-12-24T09:15:00",
    messagesCount: 5,
  },
];

// Articles d'aide
const helpArticles = [
  {
    id: "1",
    title: "Comment passer une commande",
    category: "Commandes",
    views: 1250,
    icon: FileText,
  },
  {
    id: "2",
    title: "Suivi de livraison",
    category: "Livraison",
    views: 980,
    icon: FileText,
  },
  {
    id: "3",
    title: "Politique de retour",
    category: "Retours",
    views: 750,
    icon: FileText,
  },
  {
    id: "4",
    title: "Modes de paiement acceptés",
    category: "Paiement",
    views: 650,
    icon: FileText,
  },
];

// FAQ
const faqItems = [
  {
    id: "1",
    question: "Comment modifier mon adresse de livraison ?",
    answer: "Vous pouvez modifier votre adresse dans Mon compte > Adresses.",
  },
  {
    id: "2",
    question: "Quels sont les délais de livraison ?",
    answer: "Les délais varient de 2 à 5 jours ouvrés selon votre localisation.",
  },
  {
    id: "3",
    question: "Comment annuler une commande ?",
    answer: "Contactez le support avant l'expédition pour annuler une commande.",
  },
];

export default function SupportPage() {
  const [tickets] = useState<SupportTicket[]>(demoTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTicket = async (data: {
    title: string;
    description: string;
    category: string;
    priority: TicketPriority;
  }) => {
    console.log("Créer ticket:", data);
  };

  const handleTicketClick = (ticket: SupportTicket) => {
    console.log("Ouvrir ticket:", ticket);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support - Aide & Documentation</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Centre d'aide, documentation et support client
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <MessageSquare className="size-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Créer un ticket</h3>
              <p className="text-xs text-muted-foreground">Contacter le support</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
              <BookOpen className="size-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Base de connaissances</h3>
              <p className="text-xs text-muted-foreground">{helpArticles.length} articles</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <HelpCircle className="size-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">FAQ</h3>
              <p className="text-xs text-muted-foreground">{faqItems.length} questions</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
              <Video className="size-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Tutoriels vidéo</h3>
              <p className="text-xs text-muted-foreground">Guides pratiques</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="help" className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="help">Centre d'aide</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
        </TabsList>

        {/* Centre d'aide */}
        <TabsContent value="help" className="space-y-4 mt-6">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpArticles.map((article) => (
              <Card
                key={article.id}
                className="p-4 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <article.icon className="size-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-gray-100 rounded">
                        {article.category}
                      </span>
                      <span>•</span>
                      <span>{article.views} vues</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-3 mt-6">
          {faqItems.map((item) => (
            <Card key={item.id} className="p-4">
              <h3 className="font-semibold text-base mb-2 flex items-start gap-2">
                <HelpCircle className="size-5 text-primary mt-0.5 shrink-0" />
                {item.question}
              </h3>
              <p className="text-sm text-muted-foreground pl-7">{item.answer}</p>
            </Card>
          ))}
        </TabsContent>

        {/* Mes tickets */}
        <TabsContent value="tickets" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {tickets.length} ticket{tickets.length > 1 ? "s" : ""}
            </p>
            <Button onClick={() => setIsModalOpen(true)} size="sm" className="rounded">
              <Plus className="size-4 mr-1.5" />
              Nouveau ticket
            </Button>
          </div>

          {tickets.length === 0 ? (
            <EmptyState
              media={<MessageSquare className="size-12" />}
              title="Aucun ticket"
              description="Créez votre premier ticket de support"
              actions={[
                {
                  label: "Créer un ticket",
                  onClick: () => setIsModalOpen(true),
                },
              ]}
            />
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <SupportTicketCard
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => handleTicketClick(ticket)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}
