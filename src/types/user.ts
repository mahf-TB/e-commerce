// Types relatifs à l'authentification et à l'utilisateur
export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  photo?: string;
  [key: string]: any;
}

type Role = "admin" | "manager" | "guest" | "customer";

export interface AuthenticatedUser extends User {
  role: Role;
}

export type AuthData =
  | {
      token?: string | null;
      user?: User | null;
    }
  | null
  | undefined;

export type GoogleCredentialResponse =
  | { credential?: string }
  | null
  | undefined;

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
  username?: string;
  // ajoutez d'autres champs si votre backend l'exige
};

export interface UpdateProfilePayload {
  nom?: string;
  prenom?: string;
  adresse?: string;
  telephone?: string;
  username?: string;
  email?: string;
  // ajoutez d'autres champs si votre backend l'exige
}