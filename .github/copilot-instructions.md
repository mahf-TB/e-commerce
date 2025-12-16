# Copilot Instructions - E-Commerce App

## Architecture Overview

Application e-commerce React + TypeScript utilisant:
- **Build**: Vite avec SWC (plugin react-swc pour Fast Refresh)
- **UI**: shadcn/ui (style "new-york") avec Radix UI + Tailwind CSS v4 + Framer Motion
- **État**: Zustand (stores) + TanStack Query (server state)
- **Routing**: React Router v7 avec layouts imbriqués
- **Auth**: JWT avec localStorage + Google OAuth (@react-oauth/google)

## Project Structure

```
src/
├── components/     # Composants UI réutilisables (data-table, inputs custom, etc.)
├── features/       # Fonctionnalités métier (auth/, cart/, checkout/, orders/, products/)
├── layouts/        # UserLayout, AdminLayout, AccountLayout avec <Outlet/>
├── pages/          # Pages routées par domaine (admin/, account/, cart/, product/, etc.)
├── routes/         # Définitions router + guards (PrivateRoutes, AdminRoutes, PublicRoutes)
├── services/       # Appels API (authService, produitService, commandeService, etc.)
├── hooks/          # Hooks custom avec TanStack Query
├── store/          # Stores Zustand (use-auth.store, use-panier.store, use-system.store)
├── types/          # Types TypeScript (user, product, order, Paginated<T>)
└── lib/            # Utils (axios, toast, cn())
```

## Development Workflow

**Commandes clés:**
```bash
npm run dev      # Démarre Vite dev server
npm run build    # TypeScript check + build production
npm run lint     # ESLint avec flat config
npm run preview  # Preview du build
```

**Environnement:** Variable `VITE_API_BASE_URL` (défaut: `http://localhost:8080/api`)

## Code Conventions

### 1. Imports & Alias
- Utiliser l'alias `@/` pour tous les imports depuis `src/` (ex: `import { cn } from "@/lib/utils"`)
- Organisation: React/libs → types → hooks → components → styles

### 2. Authentification
- **Deux instances axios**: `api` (public) et `apiAuth` (avec token Bearer)
- Token stocké dans localStorage via `setAuthToken(token)` après login
- Hook `useAuthUser()` retourne `{ isAuthenticated, user, isLoading }` avec TanStack Query
- Guards de route: `<PrivateRoutes>`, `<PublicRoutes>`, `<AdminRoutes>`, `<AdminLoginRoutes>`

Exemple:
```tsx
const { isAuthenticated, user } = useAuthUser();
// Query key: ["auth", "me"], enabled si hasToken()
```

### 3. TanStack Query Patterns
- **Query keys structurées**: `["auth", "me"]`, `["product", productId]`, `["commandes", { page, limit, ... }]`
- **Invalidation**: `useAuthInvalidate()` pour refresh après login/logout
- Types de retour explicites: `useQuery<User>({ queryKey, queryFn })`

### 4. Zustand Stores
- **Panier** (`use-panier.store.ts`): Persiste avec `zustand/middleware/persist`
  - État: `cartItems: CartItem[]`, `isOpen: boolean`
  - Actions: `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `getTotalPrice()`
- **Auth** (`use-auth.store.ts`): Gestion flow UI (pending, step: check|login|register)
- Pas de logique métier complexe dans stores, déléguer aux services

### 5. UI Components
- **shadcn/ui**: Composants dans `src/components/ui/` (button, card, dialog, etc.)
- **Custom**: `data-table.tsx`, `input-form.tsx`, `feedback-popover.tsx`
- **Styling**: Fonction `cn()` pour merge classes Tailwind (`cn("base", condition && "extra")`)
- **Toasts**: Utiliser `showToast(variant, message, options)` de `@/lib/toast` (wrapper Sonner)

### 6. Routing & Layouts
- Router définit dans `src/routes/AppRoutes.tsx` avec `createBrowserRouter`
- **3 layouts**:
  - `UserLayout`: Header + NavbarMenu (caché sur /checkout)
  - `AdminLayout`: Sidebar + Outlet (vérifie rôle admin)
  - `AccountLayout`: NavLink latéral pour pages compte utilisateur
- Toujours wrapper les routes protégées avec `<PrivateRoutes>` ou guards équivalents

### 7. Types & Data Modeling
- Types partagés dans `src/types/index.ts` (exporte user, product, order)
- Utiliser `Paginated<T>` pour réponses paginées API:
  ```ts
  type Paginated<T> = { items: T[]; page: number; limit: number; totalItems: number; totalPages: number }
  ```
- Interfaces API nommées explicitement (ex: `LoginCredentials`, `RegisterPayload`, `AuthData`)

### 8. Services Layer
- Chaque domaine a son service (authService, produitService, commandeService)
- Fonctions async retournant `Promise<Type>` explicite
- Utiliser `api` ou `apiAuth` selon besoin d'authentification
- Exemple: `await apiAuth.get("/auth/me")` dans `fetchMe()`

## Key Files Reference

| Fichier | Purpose |
|---------|---------|
| [src/lib/axios.ts](src/lib/axios.ts) | Instances axios + gestion token |
| [src/hooks/use-auth-user.ts](src/hooks/use-auth-user.ts) | Hook auth principal avec TanStack Query |
| [src/store/use-panier.store.ts](src/store/use-panier.store.ts) | Store panier (persisté) |
| [src/routes/AppRoutes.tsx](src/routes/AppRoutes.tsx) | Router configuration complète |
| [src/lib/utils.ts](src/lib/utils.ts) | Fonction `cn()` pour classes Tailwind |
| [components.json](components.json) | Config shadcn/ui (aliases, style) |

## Common Patterns

**Créer une nouvelle page:**
1. Créer dans `src/pages/{domaine}/NomPage.tsx`
2. Ajouter route dans `AppRoutes.tsx` sous le layout approprié
3. Si protégée: wrapper avec `<PrivateRoutes>`

**Ajouter un hook de données:**
1. Créer `use-{nom}.ts` dans `src/hooks/`
2. Définir query key structurée: `["domain", params]`
3. Retourner objet destructurable avec alias (`{ ...query, data: typedData }`)

**Ajouter un composant UI:**
- Composants génériques → `src/components/`
- Composants métier → `src/features/{domaine}/`
- Toujours typer props avec interface explicite
