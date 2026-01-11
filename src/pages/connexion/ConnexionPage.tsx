import FormConnected from "@/features/auth/FormConnected";
import GoogleOneTap from "@/features/auth/GoogleOneTap";
import { cn } from "@/lib/utils";
import useAuthStore from "@/store/use-auth.store";
import React from "react";

const ConnexionPage = () => {
  const step = useAuthStore((s) => s.step);
  const setStep = useAuthStore((s) => s.setStep);

  React.useEffect(() => {
    setStep("login");
  }, [setStep]);
  return (
    <div className="">
      <div
        className={cn(
          "flex items-center justify-center h-full w-full mt-20",
          step === "register" && "mt-5"
        )}
      >
        <div className="p-4 rounded w-full max-w-lg">
          <div className="mb-3 text-start">
            <h2 className="text-2xl font-bold mb-2 font-poppins">
              {step === "register"
                ? "Créez votre compte"
                : "Connectez-vous pour accéder à votre compte"}
            </h2>
            <p className="text-sm text-gray-600">
              {step === "register"
                ? "Inscrivez-vous pour passer des commandes et gérer vos informations. Utilisez votre adresse e‑mail ou inscrivez‑vous rapidement avec Google."
                : "Pour consulter vos commandes et gérer vos informations. Utilisez votre adresse e-mail ou connectez-vous rapidement avec Google."}
            </p>
          </div>
          <FormConnected />
          <div className="my-4 flex items-center gap-3">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>
          <GoogleOneTap />
          <p className="text-xs text-gray-400 mt-2">
            {step === "register" ? (
              <>
                Vous avez déjà un compte ?{" "}
                <button
                  type="button"
                  onClick={() => setStep("login")}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Connectez-vous
                </button>
              </>
            ) : (
              <>
                Pas de compte ?{" "}
                <button
                  type="button"
                  onClick={() => setStep("register")}
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Créez-en un
                </button>
              </>
            )}
          </p>
          <p className="text-xs text-gray-400 ">
            {step === "register"
              ? "En vous inscrivant, vous acceptez nos conditions. Nous respectons votre vie privée — vos données ne seront pas partagées."
              : "Nous respectons votre vie privée — vos données ne seront pas partagées."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnexionPage;
