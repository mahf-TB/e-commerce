import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          Désolé, la page que vous recherchez est introuvable.
        </p>
        <Link to="/">
          <Button size={"lg"} className="rounded">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
