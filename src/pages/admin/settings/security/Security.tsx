import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showToast } from "@/lib/toast";
import {
  CheckCircle2,
  Key,
  Monitor,
  Shield,
  ShieldAlert,
  Smartphone,
  XCircle
} from "lucide-react";
import { useState } from "react";

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  ipAddress: string;
  device: string;
  status: "success" | "failed" | "warning";
}

const Security = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(true);

  // Données d'exemple pour les sessions actives
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([
    {
      id: "1",
      device: "Chrome - Windows",
      location: "Paris, France",
      ipAddress: "192.168.1.100",
      lastActive: "Il y a 2 minutes",
      isCurrent: true,
    },
    {
      id: "2",
      device: "Safari - iPhone 14",
      location: "Lyon, France",
      ipAddress: "192.168.1.150",
      lastActive: "Il y a 2 heures",
      isCurrent: false,
    },
    {
      id: "3",
      device: "Firefox - MacOS",
      location: "Marseille, France",
      ipAddress: "192.168.1.200",
      lastActive: "Il y a 1 jour",
      isCurrent: false,
    },
  ]);

  // Données d'exemple pour les logs d'activité
  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      action: "Connexion réussie",
      timestamp: "23 Déc 2025, 14:30",
      ipAddress: "192.168.1.100",
      device: "Chrome - Windows",
      status: "success",
    },
    {
      id: "2",
      action: "Modification du mot de passe",
      timestamp: "22 Déc 2025, 10:15",
      ipAddress: "192.168.1.100",
      device: "Chrome - Windows",
      status: "success",
    },
    {
      id: "3",
      action: "Tentative de connexion échouée",
      timestamp: "21 Déc 2025, 08:45",
      ipAddress: "192.168.50.25",
      device: "Unknown",
      status: "failed",
    },
    {
      id: "4",
      action: "Activation 2FA",
      timestamp: "20 Déc 2025, 16:20",
      ipAddress: "192.168.1.100",
      device: "Chrome - Windows",
      status: "warning",
    },
  ]);

  const handleRevokeSession = (sessionId: string) => {
    if (!confirm("Voulez-vous vraiment révoquer cette session ?")) return;

    showToast("loading", "Révocation de la session...");

    setTimeout(() => {
      setActiveSessions((prev) =>
        prev.filter((session) => session.id !== sessionId)
      );
      showToast("success", "Session révoquée avec succès");
    }, 1000);
  };

  const handleRevokeAllSessions = () => {
    if (
      !confirm("Voulez-vous vraiment déconnecter tous les autres appareils ?")
    )
      return;

    showToast("loading", "Révocation de toutes les sessions...");

    setTimeout(() => {
      setActiveSessions((prev) => prev.filter((session) => session.isCurrent));
      showToast("success", "Toutes les sessions ont été révoquées");
    }, 1000);
  };

  const handleEnable2FA = () => {
    if (!twoFactorEnabled) {
      // TODO: Afficher un dialog pour scanner le QR code
      showToast("info", "Configuration de l'authentification à deux facteurs");
    }
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="">
      <Tabs defaultValue="password" className="space-y-6 ">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="size-6" />
                Sécurité
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Gérez vos paramètres de sécurité et protégez votre compte
              </p>
            </div>
            <TabsList>
              <TabsTrigger value="password">
                <Key className="size-4 mr-2" />
                Mot de passe
              </TabsTrigger>
              <TabsTrigger value="2fa">
                <Smartphone className="size-4 mr-2" />
                2FA
              </TabsTrigger>
              <TabsTrigger value="sessions">
                <Monitor className="size-4 mr-2" />
                Sessions actives
              </TabsTrigger>
              <TabsTrigger value="activity">
                <ShieldAlert className="size-4 mr-2" />
                Journal d'activité
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-start justify-center gap-2 ">

            <div className="w-3/4">
              {/* Onglet Mot de passe */}
              <TabsContent value="password" className="space-y-4">
                {/* Paramètres de sécurité supplémentaires */}
                <Card className="shadow-none border-none rounded">
                  <CardHeader>
                    <CardTitle>Paramètres de sécurité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                      <div className="space-y-0.5">
                        <Label htmlFor="login-notifications">
                          Notifications de connexion
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Recevoir un email lors de chaque nouvelle connexion
                        </p>
                      </div>
                      <Switch
                        id="login-notifications"
                        checked={loginNotifications}
                        onCheckedChange={setLoginNotifications}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">
                          Déconnexion automatique
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Se déconnecter après 30 minutes d'inactivité
                        </p>
                      </div>
                      <Switch
                        id="session-timeout"
                        checked={sessionTimeout}
                        onCheckedChange={setSessionTimeout}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Onglet 2FA */}
              <TabsContent value="2fa" className="space-y-4">
                <Card className="shadow-none border-none rounded">
                  <CardHeader>
                    <CardTitle>Authentification à deux facteurs (2FA)</CardTitle>
                    <CardDescription>
                      Ajoutez une couche de sécurité supplémentaire à votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Smartphone className="size-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Application d'authentification
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Utilisez une app comme Google Authenticator ou Authy
                          </p>
                          <p className="text-sm font-medium mt-2">
                            Statut:{" "}
                            <span
                              className={
                                twoFactorEnabled
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }
                            >
                              {twoFactorEnabled ? "Activé" : "Désactivé"}
                            </span>
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={twoFactorEnabled ? "destructive" : "default"}
                        onClick={handleEnable2FA}
                        className="rounded"
                      >
                        {twoFactorEnabled ? "Désactiver" : "Activer"}
                      </Button>
                    </div>
                    {twoFactorEnabled && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle2 className="size-5" />
                          <p className="font-medium">
                            Authentification à deux facteurs activée
                          </p>
                        </div>
                        <p className="text-sm text-green-700 mt-2">
                          Votre compte est maintenant protégé par une
                          authentification à deux facteurs.
                        </p>
                      </div>
                    )}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Codes de récupération
                      </h4>
                      <p className="text-sm text-blue-800 mb-3">
                        Générez des codes de secours au cas où vous perdriez
                        l'accès à votre appareil.
                      </p>
                      <Button variant="outline" size="sm" className="rounded">
                        Générer les codes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Onglet Sessions actives */}
              <TabsContent value="sessions" className="space-y-4">
                <Card className="shadow-none border-none rounded">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Sessions actives</CardTitle>
                        <CardDescription>
                          Gérez les appareils connectés à votre compte
                        </CardDescription>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleRevokeAllSessions}
                        className="rounded"
                      >
                        Déconnecter tous les autres
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <Monitor className="size-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{session.device}</h4>
                              {session.isCurrent && (
                                <Badge variant="default" className="text-xs">
                                  Session actuelle
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {session.location} • {session.ipAddress}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Dernière activité: {session.lastActive}
                            </p>
                          </div>
                        </div>
                        {!session.isCurrent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRevokeSession(session.id)}
                            className="rounded"
                          >
                            Révoquer
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Onglet Journal d'activité */}
              <TabsContent value="activity" className="space-y-4">
                <Card className="shadow-none border-none rounded">
                  <CardHeader>
                    <CardTitle>Journal d'activité</CardTitle>
                    <CardDescription>
                      Historique des actions importantes sur votre compte
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {activityLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                log.status === "success"
                                  ? "bg-green-100"
                                  : log.status === "failed"
                                  ? "bg-red-100"
                                  : "bg-orange-100"
                              }`}
                            >
                              {log.status === "success" ? (
                                <CheckCircle2 className="size-4 text-green-600" />
                              ) : log.status === "failed" ? (
                                <XCircle className="size-4 text-red-600" />
                              ) : (
                                <ShieldAlert className="size-4 text-orange-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">
                                {log.action}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {log.device} • {log.ipAddress}
                              </p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {log.timestamp}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Security;
