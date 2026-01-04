import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputForm from "@/components/utils/input-form";
import SelectForm from "@/components/utils/select-form";
import { useCreateUser } from "@/hooks/use-users";
import { showToast } from "@/lib/toast";
import { GripVertical, Lock, Mail, User } from "lucide-react";
import { useState } from "react";

// Pretend we have initial image files
export interface AddUserModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AddUserModal({
  open,
  onOpenChange,
  trigger,
  title,
  description,
}: AddUserModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    role: "",
    username: "",
    password: "",
  });

  const createUserMutation = useCreateUser();

  // Utiliser l'état externe si fourni, sinon l'état interne
  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = (value: boolean) => {
    if (onOpenChange) {
      onOpenChange(value);
    } else {
      setInternalOpen(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !userInfo.email ||
      !userInfo.username ||
      !userInfo.password ||
      !userInfo.role
    ) {
      showToast("error", "Veuillez remplir tous les champs requis");
      return;
    }

    try {
      await createUserMutation.mutateAsync({
        email: userInfo.email,
        username: userInfo.username,
        password: userInfo.password,
        role: userInfo.role as
          | "admin"
          | "manager"
          | "support"
          | "customer"
          | "guest",
      });

      showToast("success", "Utilisateur créé avec succès");

      // Réinitialiser le formulaire
      setUserInfo({
        email: "",
        role: "",
        username: "",
        password: "",
      });

      // Fermer le modal (fonctionne en mode contrôlé et non-contrôlé)
      handleOpenChange(false);
    } catch (error: any) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      showToast(
        "error",
        error?.response?.data?.message ||
          "Erreur lors de la création de l'utilisateur"
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger && trigger}</DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5 rounded border border-muted-foreground">
        <DialogHeader className="contents space-y-0 text-left bg-gray-900">
          <DialogTitle className="border-b p-4  font-poppins text-white bg-gray-950 flex items-center gap-1 uppercase font-medium">
             <GripVertical size={16} /> {title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="overflow-y-auto">
            <div className="px-6 pt-4 pb-6">
              <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <InputForm
                    name="email"
                    label="Email"
                    type="email"
                    value={userInfo.email}
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    aria-label="Email"
                    placeholder="Ex: example@mail.com"
                    iconLeft={<Mail size={14} />}
                  />
                </div>
                <div className="*:not-first:mt-2">
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
                    placeholder="Ex: johndoe-manager"
                    iconLeft={<User size={14} />}
                  />
                </div>
                <div className="*:not-first:mt-2">
                  <SelectForm
                  // icon={LockKeyhole}
                    label="Role"
                    required
                    className="w-full"
                    placeholder="Selectionnez son rôle"
                    value={userInfo.role}
                    onChange={(e) => setUserInfo({ ...userInfo, role: e })}
                    options={[
                      { value: "admin", label: "Administrateur" },
                      { value: "manager", label: "Manager" },
                      { value: "support", label: "Support" },
                    ]}
                  />
                </div>
                <div className="*:not-first:mt-2">
                  <InputForm
                    name="password"
                    label="Mot de passe"
                    type="password"
                    value={userInfo.password}
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                    aria-label="Mot de passe"
                    placeholder="votre mot de passe"
                    iconLeft={<Lock size={14} />}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="border-t px-6 py-4">
            <DialogClose asChild className="rounded px-5">
              <Button
                type="button"
                variant="outline"
                disabled={createUserMutation.isPending}
              >
                Annuler
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded px-10"
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending
                ? "Enregistrement..."
                : "Enregistrer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

