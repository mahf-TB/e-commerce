import { Spinner } from "@/components/icon/spinner";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/utils/AnimatedBackground";
import InputForm from "@/components/utils/input-form";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
import { setAuthToken } from "@/lib/axios";
import authService from "@/services/authService";
import useAuthStore from "@/store/use-auth.store";
import { isValidEmail } from "@/utils/helpers";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const { invalidateAuthUser } = useAuthInvalidate();
  const { pending } = useAuthStore();
  const navigate = useNavigate();
  // State pour les champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !isValidEmail(email)) {
      setError("Veuillez saisir une adresse email valide.");
      setLoading(false);
      return;
    }
    // placeholder: ici vous pouvez appeler votre API de connexion par email
    try {
      await loginUser();
    } catch (error) {
      console.error("Erreur de connexion : ", error || error);
      setError("Échec. Veuillez vérifier vos identifiants.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const loginUser = async () => {
    const result = await authService.loginUser({ email, password });
    if (result) {
      await invalidateAuthUser();
      setAuthToken(result.token ?? null);
      // Redirect based on user role
      if (result.user?.role === "customer") {
        navigate("/account", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
    }
  };

  return (
    <AnimatedBackground className="h-svh">
      <div className="flex items-center justify-between h-full w-full flex-col">
        <div className="p-8 rounded w-full max-w-lg">
          <div className="mb-6 text-start">
            <h2 className="text-2xl font-bold mb-2 font-poppins">
              Accédez à l'espace administrateur
            </h2>
            <p className="text-sm text-gray-600">
              Connectez-vous pour gérer vos commandes, produits et paramètres.
              Veuillez utiliser votre adresse e-mail et mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Email */}
            <div>
              <InputForm
                name="address"
                label="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email"
                placeholder="votre@email.com"
                iconLeft={<Mail size={14} />}
              />
              {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
              )}
            </div>
            {/* Mot de passe */}
            <div>
              <InputForm
                name="password"
                label="Mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Mot de passe"
                placeholder="votre mot de passe"
                iconLeft={<Lock size={14} />}
              />
              {error && (
                <div className="text-xs text-red-500 mt-1">{error}</div>
              )}
            </div>
            {/* Button de submit */}
            <Button
              type="submit"
              className="w-full rounded flex items-center justify-center gap-2 mt-5"
              disabled={loading || pending}
            >
              {(loading || pending) && <Spinner size="md" />}
              <span>{loading ? "Connexion..." : "Se connecter"}</span>
            </Button>
          </form>
        </div>
        <p className="text-xs text-gray-400 ">
          Nous respectons votre vie privée — vos données ne seront pas
          partagées.
        </p>
      </div>
    </AnimatedBackground>
  );
};

export default LoginAdmin;
