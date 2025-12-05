import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/google-icon.svg";
import { GoogleLogin } from "@react-oauth/google";
import { useRef } from "react";
import useAuthStore from "@/store/use-auth.store";
import authService from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { useAuthInvalidate } from "@/hooks/use-auth-invalidate";
const GoogleOneTap = ({ route }: { route?: string }) => {
  const { invalidateAuthUser } = useAuthInvalidate();
  const { pending, setPending } = useAuthStore();
  const navigate = useNavigate();

  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const handleCustomClick = () => {
    const btn = googleBtnRef.current?.querySelector("div[role=button]");
    btn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const handleSuccess = async (response: any) => {
    const idToken = response.credential; // ID token JWT
    setPending(true);
    try {
      const result = await authService.processGoogleCredential(
        {
          credential: idToken,
        },
        route
      );
      
      if (result) {
        await invalidateAuthUser();
        // If a route was explicitly provided, go there. Otherwise use role-based default.
        if (route) {
          navigate(`/${route}`);
        } else if (result.user?.role !== "customer") {
          navigate("/admin");
        } else {
          navigate("/account");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="w-full flex items-center rounded justify-center gap-3 border-gray-300"
        onClick={handleCustomClick}
        disabled={pending}
      >
        <img src={googleIcon} alt="Google" className="w-5 h-5" />
        <span>Continuer avec Google</span>
      </Button>
      {/* bouton Google invisible */}
      <div style={{ display: "none" }} ref={googleBtnRef}>
        <GoogleLogin onSuccess={handleSuccess} onError={() => {}} />
      </div>
    </div>
  );
};

export default GoogleOneTap;
