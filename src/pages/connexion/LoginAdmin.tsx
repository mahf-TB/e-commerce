import { useState } from "react";
import { Button } from "@/components/ui/button";
import useGoogleAuth from "@/hooks/use-google-auth";
import googleIcon from "@/assets/google-icon.svg";
import InputForm from "@/components/input-form";
import { Lock, Mail } from "lucide-react";
import { isValidEmail } from "@/utils/helpers";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import authService from "@/services/authService";
import { setAuthToken } from "@/lib/axios";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
import useAuthStore from "@/store/use-auth.store";
import { useNavigate } from "react-router-dom";
import GoogleOneTap from "@/features/auth/GoogleOneTap";

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
      console.error("Erreur de connexion :", error || error);
      setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
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
      navigate("/account");
    }
  };

  return (
    <AnimatedBackground className="h-svh">
      <div className="flex items-center justify-center h-full w-full ">
        <div className="p-8 rounded w-full max-w-lg">
          <div className="mb-6 text-start">
            <h2 className="text-2xl font-bold mb-2 font-poppins">
              Accédez à l'espace administrateur
            </h2>
            <p className="text-sm text-gray-600">
              Connectez-vous pour gérer vos commandes, produits et paramètres.
              Utilisez votre adresse e-mail ou la connexion Google.
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
              {(loading || pending) && (
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              <span>{loading ? "Connexion..." : "Se connecter"}</span>
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          <GoogleOneTap route="admin" />
          <p className="text-xs text-gray-400 mt-2">
            Nous respectons votre vie privée — vos données ne seront pas
            partagées.
          </p>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default LoginAdmin;
