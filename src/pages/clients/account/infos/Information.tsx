import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AvatarUpload from "@/components/utils/AvatarUpload";
import InputForm from "@/components/utils/input-form";
import { InputPhoneNumber } from "@/components/utils/input-phone";
import useAuthUser, { useUpdateProfileUser } from "@/hooks/use-auth-user";

import { showToast } from "@/lib/toast";
import { MapPin, Trash, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const Information = () => {
  const { user, isLoading } = useAuthUser();
  const updateUserMutation = useUpdateProfileUser();

  console.log(user);

  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    adresse: "",
    username: "",
  });

  // Charger les données de l'utilisateur
  useEffect(() => {
    if (user) {
      setUserInfo({
        nom: user.nom || "",
        prenom: user.prenom || "",
        telephone: user.telephone || "",
        adresse: user.adresse || "",
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
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          telephone: userInfo.telephone,
          adresse: userInfo.adresse,
          username: userInfo.username,
        },
      });

      showToast("success", "Vos informations ont été mises à jour avec succès");
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour:", error);
      showToast(
        "error",
        error?.response?.data?.message || "Erreur lors de la mise à jour"
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
    <div className="">
      <div className=" space-x-3 flex items-start justify-center gap-2">
        {/* Informations de base */}
        <Card className="shadow-none rounded w-3/4 bg-none!">
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
                      Cliquez sur l'avatar pour télécharger une nouvelle photo.
                      Format JPG, PNG jusqu'à 5MB.
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

                <div className="grid grid-cols-2 gap-4">
                  {/* Nom et Prénom */}
                  <InputForm
                    name="prenom"
                    label="Prénom"
                    type="text"
                    value={userInfo.prenom}
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, prenom: e.target.value })
                    }
                    aria-label="Prénom"
                    placeholder="Ex: John"
                    iconLeft={<User size={14} />}
                    className="bg-gray-50 w-full"
                  />
                  <InputForm
                    name="nom"
                    label="Nom"
                    type="text"
                    value={userInfo.nom}
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, nom: e.target.value })
                    }
                    aria-label="Nom"
                    placeholder="Ex: Doe"
                    iconLeft={<User size={14} />}
                    className="bg-gray-50 w-full"
                  />
                </div>

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
                  iconLeft={<User size={14} />}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputForm
                    name="adresse"
                    label="Adresse complète"
                    type="text"
                    value={userInfo.adresse}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, adresse: e.target.value })
                    }
                    aria-label="Adresse"
                    placeholder="Ex: 123 Main St, Cityville, Country"
                    iconLeft={<MapPin size={14} />}
                    className="bg-gray-50"
                  />

                  {/* Téléphone */}
                  <InputPhoneNumber
                    label="Téléphone"
                    value={userInfo.telephone}
                    onChange={(e) => setUserInfo({ ...userInfo, telephone: e })}
                    aria-label="Téléphone"
                    placeholder="Ex: +1 234 567 890"
                    className="bg-gray-50"
                  />
                </div>
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
      </div>
    </div>
  );
};

export default Information;
