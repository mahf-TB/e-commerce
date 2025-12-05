import { useCallback } from "react";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import authService from "@/services/authService";
import useAuthStore from "@/store/use-auth.store";

export default function useGoogleAuth() {
  const {pending , setPending} = useAuthStore();


  const handleSuccessGoogle = useCallback(async (credentialResponse: any) => {
    setPending(true);
    try {
      await authService.processGoogleCredential(credentialResponse);
    } catch (e) {
      console.error("Login Google échoué", e);
    } finally {
      setPending(false);
    }
  }, [setPending]);

  const handleError = useCallback(() => {
    setPending(false);
    console.log("Login Google échoué");
  }, [setPending]);

  // On initialise One Tap lorsqu'on demande un login
  useGoogleOneTapLogin({
    onSuccess: handleSuccessGoogle,
    onError: handleError,
    // le hook sera actif tout le temps, mais One Tap ne s'affiche que quand Google peut
  });

  const login = useCallback(() => {
    // One Tap se déclenchera automatiquement si possible
    setPending(true);
  }, [setPending]);

  return { login, pending };
}
