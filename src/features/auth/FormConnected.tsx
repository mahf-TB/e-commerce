import { Spinner } from "@/components/icon/spinner";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import InputForm from "@/components/input-form";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
import { setAuthToken } from "@/lib/axios";
import authService from "@/services/authService";
import useAuthStore from "@/store/use-auth.store";
import { isValidEmail } from "@/utils/helpers";
import { Lock, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import FormRegister from "./FormRegister";

const FormConnected = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/account";
  const { invalidateAuthUser } = useAuthInvalidate();
  const { pending, setPending, step, setStep } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const loginUser = async () => {
    const result = await authService.loginUser({ email, password });
    if (result) {
      await invalidateAuthUser();
      setAuthToken(result.token ?? null);
      navigate(from, { replace: true });
    }
  };
  const registerUser = async () => {
    const result = await authService.registerUser({ ...userInfo, email });
    if (result) {
      await invalidateAuthUser();
      setAuthToken(result.token ?? null);
      navigate(from, { replace: true });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    if (!email || !isValidEmail(email)) {
      setError("Veuillez saisir une adresse email valide.");
      setPending(false);
      return;
    }
    try {
      // appel API pour vérifier si l'email existe
      const res = await authService.checkEmail({ email });
      console.log(res);
      if (res.exists) {
        if (step === "login") {
          await loginUser();
        } else {
          setStep("login");
        }
      } else {
        if (step === "register") {
          await registerUser();
        } else {
          setStep("register");
          setError("Votre email n'avez pas de compte. Veuillez vous inscrire.");
        }
      }
      return;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
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
          {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
        </div>
        {step === "login" && (
          <div>
            <InputForm
              name="password"
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Mot de passe"
              placeholder="votre mot de passe"
              iconLeft={<Lock size={14} />}
            />
            {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
          </div>
        )}

        {step === "register" && (
          <FormRegister userInfo={userInfo} setUserInfo={setUserInfo} />
        )}

        {/* Button de submit */}
        <Button
          type="submit"
          className="w-full rounded flex items-center justify-center gap-2 mt-5"
          disabled={pending}
        >
          {pending && <Spinner size="md" />}
          <span>{pending ? "Connexion..." : "Se connecter"}</span>
        </Button>
      </form>
    </div>
  );
};

export default FormConnected;
