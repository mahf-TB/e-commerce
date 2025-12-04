import InputForm from "@/components/input-form";
import { Lock, MapPin, Phone, User } from "lucide-react";
import React, { useState } from "react";


type UserInfo = {
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  password:string;
};

interface RegisterState {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}


const FormRegister = ({userInfo , setUserInfo}:RegisterState) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center w-full gap-2">
        <InputForm
          name="nom"
          label="Nom"
          type="text"
          value={userInfo.nom}
          required
          onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}
          aria-label="Nom"
          placeholder="votre nom"
          iconLeft={<User size={14} />}
        />
        <InputForm
          name="prenom"
          label="Prenom"
          type="text"
          value={userInfo.prenom}
          onChange={(e) => setUserInfo({ ...userInfo, prenom: e.target.value })}
          aria-label="Prenom"
          placeholder="votre prenom"
          iconLeft={<User size={14} />}

        />
      </div>
      <div className="flex items-center w-full gap-2">
        <InputForm
          name="adresse"
          label="Adresse"
          type="text"
          value={userInfo.adresse}
          onChange={(e) => setUserInfo({ ...userInfo, adresse: e.target.value })}
          aria-label="Prenom"
          placeholder="votre prenom"
          iconLeft={<MapPin size={14} />}
        />
        <InputForm
          name="telephone"
          label="Telephone"
          type="text"
          value={userInfo.telephone}
          onChange={(e) => setUserInfo({ ...userInfo, telephone: e.target.value })}
          aria-label="Telephone"
          placeholder="votre telephone"
          iconLeft={<Phone size={14} />}
        />
      </div>
      <div>
        <InputForm
          name="password"
          label="Mot de passe"
          type="password"
          value={userInfo.password}
          onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
          aria-label="Mot de passe"
          placeholder="votre mot de passe"
          iconLeft={<Lock size={14} />}
        />
          {error && <div className="text-xs text-red-500 mt-1">{error}</div>}
      </div>
    </>
  );
};

export default FormRegister;
