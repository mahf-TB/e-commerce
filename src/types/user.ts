// Types relatifs à l'authentification et à l'utilisateur
export interface User {
  id?: string;
  username?: string;
  email?: string;
  role:string;
  photo?: string;
  [key: string]: any;
}

type Role = "admin" | "user" | "guest";

export interface AuthenticatedUser extends User {
  role: Role;
}

export type AuthData = { token?: string | null; user?: User | null } | null | undefined;

export type GoogleCredentialResponse = { credential?: string } | null | undefined;


export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterPayload = {
  email: string;
  password: string;
  nom?: string;
  prenom?: string;
  adresse?: string;
  telephone?: string;
  // ajoutez d'autres champs si votre backend l'exige
};

