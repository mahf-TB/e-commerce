import AvatarUpload from "@/components/AvatarUpload";
import InputForm from "@/components/input-form";
import SegmentedControl from "@/components/segmented-control";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthUser, { useUpdateProfileUser } from "@/hooks/use-auth-user";
import { showToast } from "@/lib/toast";
import { getLibelleRole } from "@/utils/helpers";
import { Lock, Mail, Trash, UserCircle, UserLock } from "lucide-react";
import React, { useEffect, useState } from "react";

const MonCompte = () => {
  const { user, isLoading } = useAuthUser();
  const updateUserMutation = useUpdateProfileUser();
  const [activeTab, setActiveTab] = useState("infos");

  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
  });

  // Charger les données de l'utilisateur
  useEffect(() => {
    if (user) {
      setUserInfo({
        email: user.email || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      showToast("error", "Impossible de récupérer l'utilisateur");
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        payload: {
          email: userInfo.email,
          username: userInfo.username,
        },
      });

      showToast("success", "Vos informations ont été mises à jour avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour:", error);
      showToast(
        "error",
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Erreur lors de la mise à jour"
      );
    }
  };

  const handleDeleteAvatar = async () => {
    showToast("error", "Impossible de récupérer l'utilisateur");
    if (!user?.id) {
      showToast("error", "Impossible de récupérer l'utilisateur");
      return;
    }

    // try {
    //   await updateUserMutation.mutateAsync({
    //   });

    //   showToast("success", "Avatar supprimé avec succès");
    // } catch (error: any) {
    //   console.error("Erreur lors de la suppression de l'avatar:", error);
    //   showToast(
    //     "error",
    //     error?.response?.data?.message ||
    //       "Erreur lors de la suppression de l'avatar"
    //   );
    // }
  };

  if (isLoading) {
    return <div className="flex justify-center p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header avec SegmentedControl */}
      <div className="flex items-center justify-around">
        <div>
          <h1 className="text-2xl font-bold">Mon compte</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos informations personnelles et paramètres de sécurité
          </p>
        </div>
        <SegmentedControl
          value={activeTab}
          onValueChange={setActiveTab}
          options={[
            {
              value: "infos",
              label: "Informations",
              icon: <UserCircle size={16} />,
            },
            {
              value: "password",
              label: "Mot de passe",
              icon: <Lock size={16} />,
            },
          ]}
          showIcon
        />
      </div>
      <div className="flex items-start justify-center gap-2">
        {/* Contenu conditionnel */}
        {/* Informations de base */}
        {activeTab === "infos" ? (
          <Card className="shadow-none rounded w-3/4 border-none">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles. Ces informations
                seront utilisées pour vos commandes et communications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  {/* Section Avatar */}
                  <div className="flex items-center gap-6 p-4 rounded-lg border border-dashed border-gray-300 bg-gray-50/50">
                    <AvatarUpload
                      userId={user.id}
                      initialImage={user.photo}
                      size={80}
                      autoUpload={true}
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        Photo de profil
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        Cliquez sur l'avatar pour télécharger une nouvelle
                        photo. Format JPG, PNG jusqu'à 5MB.
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleDeleteAvatar}
                        className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={updateUserMutation.isPending}
                      >
                        <Trash size={14} className="mr-2" />
                        {updateUserMutation.isPending
                          ? "Suppression..."
                          : "Supprimer l'avatar"}
                      </Button>
                    </div>
                  </div>
                  {/* role*/}
                    <InputForm
                    name="role"
                    label="Rôle"
                    type="text"
                    value={getLibelleRole(user?.role)}
                    aria-label="Rôle d'utilisateur"
                    placeholder="Ex: johndoe"
                    className="bg-gray-50 focus:border-transparent focus:ring-0 focus-visible:ring-0 outline-none cursor-not-allowed"
                    iconLeft={<UserLock size={14} />}
                    readOnly
                    />
                  {/* Nom d'utilisateur */}
                  <InputForm
                    name="username"
                    label="Nom d'utilisateur"
                    type="text"
                    value={userInfo.username}
                    required
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "");
                      setUserInfo({ ...userInfo, username: value });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.preventDefault();
                      }
                    }}
                    aria-label="Nom d'utilisateur"
                    placeholder="Ex: johndoe"
                    className="bg-gray-50"
                    iconLeft={<UserCircle size={14} />}
                  />
                  {/* Email */}
                  <InputForm
                    name="email"
                    label="Nouvel email de récupération"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    placeholder="nouveau.email@exemple.com"
                    iconLeft={<Mail size={14} />}
                    className="bg-gray-50"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="rounded px-10"
                    disabled={updateUserMutation.isPending}
                  >
                    {updateUserMutation.isPending
                      ? "Enregistrement..."
                      : "Enregistrer les modifications"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : (
          <ChangerMotDePasse />
        )}
      </div>
    </div>
  );
};

export default MonCompte;

const ChangerMotDePasse = () => {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("error", "Les mots de passe ne correspondent pas");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showToast("error", "Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // TODO: Appel API pour changer le mot de passe
    showToast("loading", "Modification du mot de passe...");

    setTimeout(() => {
      showToast("success", "Mot de passe modifié avec succès");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1000);
  };

  return (
    <Card className="shadow-none border-none rounded  w-3/4 ">
      <CardHeader>
        <CardTitle>Changer le mot de passe</CardTitle>
        <CardDescription>
          Assurez-vous d'utiliser un mot de passe fort avec au moins 8
          caractères
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4 ">
          <InputForm
            name="current-password"
            label="Mot de passe actuel"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: e.target.value,
              })
            }
            required
            className="bg-gray-50"
            iconLeft={<Lock size={14} />}
            placeholder="Entrez votre mot de passe actuel"
          />
          <InputForm
            name="new-password"
            label="Nouveau mot de passe"
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            required
            className="bg-gray-50"
            iconLeft={<Lock size={14} />}
            placeholder="Minimum 8 caractères"
          />
          <InputForm
            name="confirm-password"
            label="Confirmer le nouveau mot de passe"
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: e.target.value,
              })
            }
            required
            className="bg-gray-50"
            iconLeft={<Lock size={14} />}
            placeholder="Répétez votre nouveau mot de passe"
          />
          <div className="flex justify-end pt-4">
            <Button type="submit" className="rounded px-10">
              Changer le mot de passe
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
