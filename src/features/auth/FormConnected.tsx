import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import InputForm from "@/components/input-form";
import { Lock, Mail } from "lucide-react";
import useAuthStore from "@/store/use-auth.store";
import { isValidEmail } from "@/utils/helpers";
import FormRegister from "./FormRegister";
import authService from "@/services/authService";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "@/lib/axios";

const FormConnected = () => {
  const navigate = useNavigate();
  const { invalidateAuthUser } = useAuthInvalidate();
  const { pending,setPending, step, setStep } = useAuthStore();
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
      navigate("/account");
    }
  };
  const registerUser = async () => {
    console.log();

    const result = await authService.registerUser({ ...userInfo, email });
    if (result) {
      await invalidateAuthUser();
      setAuthToken(result.token ?? null);
      navigate("/account");
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
          {(pending) && (
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
          <span>{pending ? "Connexion..." : "Se connecter"}</span>
        </Button>
      </form>
    </div>
  );
};

export default FormConnected;
