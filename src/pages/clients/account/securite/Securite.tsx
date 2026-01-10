import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogAlert from "@/components/utils/dialog-alert";
import InputForm from "@/components/utils/input-form";
import useAuthUser from "@/hooks/use-auth-user";
import { showToast } from "@/lib/toast";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Key,
  Mail,
  Monitor,
  Shield,
  Smartphone,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

const Securite = () => {
  const { user, isLoading } = useAuthUser();
  console.log(user);
  

  // Vérifier si l'utilisateur est connecté via Google
  const isGoogleAuth = user?.provider === "google" || user?.providerId !== null;

  // État pour le changement de mot de passe
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // État pour l'email de récupération
  const [recoveryEmail, setRecoveryEmail] = useState("");

  // Mock data pour les sessions actives
  const [sessions] = useState([
    {
      id: 1,
      device: "Chrome sur Windows",
      location: "Paris, France",
      ip: "192.168.1.1",
      lastActive: "Il y a 2 minutes",
      current: true,
      icon: <Monitor size={20} />,
    },
    {
      id: 2,
      device: "Safari sur iPhone",
      location: "Lyon, France",
      ip: "192.168.1.2",
      lastActive: "Il y a 2 jours",
      current: false,
      icon: <Smartphone size={20} />,
    },
  ]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("error", "Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showToast("error", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    try {
      // TODO: Appeler l'API pour changer le mot de passe
      // await changePassword(passwordForm.currentPassword, passwordForm.newPassword);

      showToast("success", "Mot de passe modifié avec succès");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors du changement de mot de passe"
      );
    }
  };

  const handleRecoveryEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Appeler l'API pour mettre à jour l'email de récupération
      // await updateRecoveryEmail(recoveryEmail);

      showToast("success", "Email de récupération mis à jour");
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message || "Erreur lors de la mise à jour"
      );
    }
  };

  const handleLogoutSession = (sessionId: number) => {
    // TODO: Appeler l'API pour déconnecter une session
    showToast("success", "Session déconnectée");
  };

  const handleLogoutAllSessions = () => {
    // TODO: Appeler l'API pour déconnecter toutes les autres sessions
    showToast("success", "Toutes les autres sessions ont été déconnectées");
  };

  const handleDeleteAccount = async () => {
    try {
      // TODO: Appeler l'API pour supprimer le compte
      // await deleteAccount(user.id);

      showToast("success", "Compte supprimé avec succès");
      // Rediriger vers la page d'accueil
    } catch (error: any) {
      showToast(
        "error",
        error?.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-6">Chargement...</div>;
  }

  return (
    <div className="">
      <div className="space-y-6 flex flex-col items-center">
        {/* Changement de mot de passe - Masqué si Google OAuth */}
        {!isGoogleAuth && (
          <Card className="shadow-none rounded w-3/4">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key size={20} className="text-gray-600" />
                <CardTitle>Mot de passe</CardTitle>
              </div>
              <CardDescription>
                Modifiez votre mot de passe pour sécuriser votre compte. Utilisez
                un mot de passe fort avec au moins 8 caractères.
              </CardDescription>
            </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <InputForm
                name="currentPassword"
                label="Mot de passe actuel"
                type={showPasswords.current ? "text" : "password"}
                value={passwordForm.currentPassword}
                required
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: e.target.value,
                  })
                }
                placeholder="Entrez votre mot de passe actuel"
                iconLeft={<Key size={14} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        current: !showPasswords.current,
                      })
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                }
                className="bg-gray-50"
              />

              <InputForm
                name="newPassword"
                label="Nouveau mot de passe"
                type={showPasswords.new ? "text" : "password"}
                value={passwordForm.newPassword}
                required
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                placeholder="Entrez votre nouveau mot de passe"
                iconLeft={<Key size={14} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        new: !showPasswords.new,
                      })
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                }
                className="bg-gray-50"
              />

              <InputForm
                name="confirmPassword"
                label="Confirmer le nouveau mot de passe"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                required
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirmez votre nouveau mot de passe"
                iconLeft={<Key size={14} />}
                iconRight={
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords({
                        ...showPasswords,
                        confirm: !showPasswords.confirm,
                      })
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                  </button>
                }
                className="bg-gray-50"
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" className="rounded px-10">
                  Modifier le mot de passe
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        )}

        {/* Information pour utilisateurs Google OAuth */}
        {isGoogleAuth && (
          <Card className="shadow-none rounded w-3/4 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                <CardTitle className="text-blue-900">
                  Connexion via Google
                </CardTitle>
              </div>
              <CardDescription className="text-blue-700">
                Votre compte est sécurisé par Google. Vous n'avez pas besoin de gérer 
                un mot de passe local. Pour modifier vos paramètres de sécurité, 
                consultez votre{" "}
                <a 
                  href="https://myaccount.google.com/security" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium underline hover:text-blue-800"
                >
                  compte Google
                </a>.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        {/* Email de récupération */}
        <Card className="shadow-none rounded w-3/4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail size={20} className="text-gray-600" />
              <CardTitle>Email de récupération</CardTitle>
            </div>
            <CardDescription>
              Cet email sera utilisé pour récupérer votre compte en cas d'oubli
              de mot de passe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRecoveryEmailUpdate} className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={16} className="text-green-600" />
                <span className="text-sm text-gray-600">
                  Email actuel: <strong>{user?.email}</strong>
                </span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Vérifié
                </Badge>
              </div>

              <InputForm
                name="recoveryEmail"
                label="Nouvel email de récupération"
                type="email"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                placeholder="nouveau.email@exemple.com"
                iconLeft={<Mail size={14} />}
                className="bg-gray-50"
              />

              <div className="flex justify-end pt-2">
                <Button type="submit" className="rounded px-10">
                  Mettre à jour l'email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sessions actives */}
        {/* <Card className="shadow-none rounded w-3/4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Monitor size={20} className="text-gray-600" />
                  <CardTitle>Sessions actives</CardTitle>
                </div>
                <CardDescription>
                  Gérez les appareils qui ont accès à votre compte.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogoutAllSessions}
                className="rounded"
              >
                Déconnecter tous les autres
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white rounded-lg border">
                      {session.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        {session.current && (
                          <Badge
                            variant="outline"
                            className="text-green-600 border-green-600"
                          >
                            Session actuelle
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {session.location} • {session.ip}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Déconnecter
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        {/* Zone de danger */}
        <Card className="shadow-none rounded w-3/4 border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" />
              <CardTitle className="text-red-600">Zone de danger</CardTitle>
            </div>
            <CardDescription>
              Actions irréversibles qui affecteront définitivement votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between p-4 border border-red-200 rounded-lg bg-red-50/50">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  Supprimer mon compte
                </h3>
                <p className="text-sm text-gray-600">
                  Une fois supprimé, votre compte et toutes vos données seront
                  définitivement effacés. Cette action est irréversible.
                </p>
              </div>
              <DialogAlert
                trigger={
                  <Button variant={"destructive"} size="sm" className="ml-4 rounded">
                    <Trash2 size={14} className="mr-2" />
                    Supprimer le compte
                  </Button>
                }
                title="Êtes-vous absolument sûr ?"
                description={
                  <div>
                    Cette action est irréversible. Cela supprimera
                    définitivement votre compte et toutes vos données de nos
                    serveurs, y compris :
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Vos informations personnelles</li>
                      <li>Votre historique de commandes</li>
                      <li>Votre liste de favoris</li>
                      <li>Toutes vos préférences</li>
                    </ul>
                  </div>
                }
                confirmText="Oui, supprimer mon compte"
                onConfirm={handleDeleteAccount}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Securite;
