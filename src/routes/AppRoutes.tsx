// src/routes/AppRoutes.tsx
import AccountLayout from "@/layouts/AccountLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AdminSettingsLayout from "@/layouts/SettingsLayout";
import UserLayout from "@/layouts/UserLayout";
import AccountPage from "@/pages/clients/account/AccountPage";
import Wishlist from "@/pages/clients/account/favoris/Wishlist";
import Information from "@/pages/clients/account/infos/Information";
import DetailsMyOrder from "@/pages/clients/account/myOrders/DetailsMyOrder";
import MyOrderPage from "@/pages/clients/account/myOrders/MyOrderPage";
import Notifications from "@/pages/clients/account/notifications/notifications";
import NotificationsList from "@/pages/clients/account/notifications/NotificationsList";
import Securite from "@/pages/clients/account/securite/Securite";
import AvisPage from "@/pages/admin/avis/AvisPage";
import CommandeAttente from "@/pages/admin/commandes/CommandeAttente";
import CommandeItem from "@/pages/admin/commandes/CommandeItem";
import Commande from "@/pages/admin/commandes/Commandes";
import Customer from "@/pages/admin/Customer/Customer";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import Paiement from "@/pages/admin/paiement/Paiement";
import AddProduct from "@/pages/admin/ProduitGerer/AddProduct";
import EditProduct from "@/pages/admin/ProduitGerer/EditProduct";
import EditProductImages from "@/pages/admin/ProduitGerer/EditProductImages_new";
import Products from "@/pages/admin/ProduitGerer/Products";
import CategoriesKanbanPage from "@/pages/admin/settings/categorie/CategoriesKanbanPage";
import GeneralSettingsPage from "@/pages/admin/settings/general/GeneralSettingsPage";
import MarquesPage from "@/pages/admin/settings/marques/MarquesPage";
import MonCompte from "@/pages/admin/settings/mon-compte/MonCompte";
import Security from "@/pages/admin/settings/security/Security";
import SupportPage from "@/pages/admin/settings/support/SupportPage";
import UserStaff from "@/pages/admin/user/UserStaff";
import CartPage from "@/pages/clients/cart/CartPage";
import CheckoutPage from "@/pages/clients/checkout/CheckoutPage";
import CheckoutPageItem from "@/pages/clients/checkout/CheckoutPageItem";
import PurchaseSuccess from "@/pages/clients/checkout/PurchaseSuccess";
import LoginPage from "@/pages/connexion/ConnexionPage";
import LoginAdmin from "@/pages/connexion/LoginAdmin";
import ErrorServerPage from "@/pages/ErrorServerPage";
import HomePage from "@/pages/clients/home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductItemsPage from "@/pages/clients/product/ProductItemsPage";
import ProductPage from "@/pages/clients/product/ProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLoginRoutes from "./AdminLoginRoutes";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import NotificationsPages from "@/pages/admin/settings/notifications/Notifications";
import CategoryProductPage from "@/pages/clients/category-product/category-product";


const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/connexion",
        element: (
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        ),
      },
      { path: "products", element: <ProductPage /> },
      { path: "products/:id", element: <ProductItemsPage /> },
      { path: "category", element: <CategoryProductPage /> },
      { path: "category/:id", element: <CategoryProductPage /> },
      { path: "cart", element: <CartPage /> },
      {
        path: "account",
        element: (
          <PrivateRoutes>
            <AccountLayout />
          </PrivateRoutes>
        ),
        children: [
          { index: true, element: <AccountPage /> },
          { path: "dashboard", element: <AccountPage /> },
          { path: "orders", element: <MyOrderPage /> },
          { path: "orders/:id", element: <DetailsMyOrder /> },
          { path: "infos-user", element: <Information /> },
          { path: "wishlist", element: <Wishlist /> },
          { path: "notifications", element: <Notifications /> },
          { path: "security", element: <Securite /> },
        ],
      },
      {
        path: "notifications-list",
        element: (
          <PrivateRoutes>
            <NotificationsList />
          </PrivateRoutes>
        ),
      },
      {
        path: "checkout",
        element: (
          <PrivateRoutes>
            <CheckoutPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "checkout/:produitId/:variantId",
        element: (
          <PrivateRoutes>
            <CheckoutPageItem />
          </PrivateRoutes>
        ),
      },
      {
        path: "checkout/success",
        element: (
          <PrivateRoutes>
            <PurchaseSuccess />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <AdminLayout />
      </AdminRoutes>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "commande", element: <Commande /> },
      { path: "commande/:id", element: <CommandeItem /> },
      { path: "file-attente", element: <CommandeAttente /> },
      { path: "produits", element: <Products /> },
      { path: "produits/ajouter", element: <AddProduct /> },
      { path: "produits/:id", element: <EditProduct /> },
      { path: "produits/:id/images", element: <EditProductImages /> },
      { path: "clients", element: <Customer /> },
      { path: "users", element: <UserStaff /> },
      { path: "paiement", element: <Paiement /> },
      
    ],
  },
  {
    path: "/admin/parametre",
    element: (
      <AdminRoutes>
        <AdminSettingsLayout />
      </AdminRoutes>
    ),
    children: [
      { index: true, element: <MonCompte /> },
      { path: "account", element: <MonCompte /> },
      { path: "categories", element: <CategoriesKanbanPage /> },
      { path: "security", element: <Security /> },
      { path: "marques", element: <MarquesPage /> },
      { path: "users", element: <UserStaff /> },
      { path: "support", element: <SupportPage /> },
      { path: "general", element: <GeneralSettingsPage /> },
      { path: "avis", element: <AvisPage /> },
      { path: "notifications", element: <NotificationsPages /> },
    ],
  },
  {
    path: "/admin-login",
    element: (
      <AdminLoginRoutes redirectTo="/admin/dashboard">
        <LoginAdmin />
      </AdminLoginRoutes>
    ),
  },
  {
    path: "/erreur-serveur",
    element: <ErrorServerPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
