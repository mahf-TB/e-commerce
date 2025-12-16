// src/routes/AppRoutes.tsx
import AccountLayout from "@/layouts/AccountLayout";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import AccountPage from "@/pages/account/AccountPage";
import DetailsMyOrder from "@/pages/account/myOrders/DetailsMyOrder";
import MyOrderPage from "@/pages/account/myOrders/MyOrderPage";
import Commande from "@/pages/admin/commandes/Commande";
import CommandeAttente from "@/pages/admin/commandes/CommandeAttente";
import Customer from "@/pages/admin/Customer/Customer";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AddProduct from "@/pages/admin/ProduitGerer/AddProduct";
import EditProduct from "@/pages/admin/ProduitGerer/EditProduct";
import EditProductImages from "@/pages/admin/ProduitGerer/EditProductImages_new";
import Products from "@/pages/admin/ProduitGerer/Products";
import UserStaff from "@/pages/admin/user/UserStaff";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/checkout/CheckoutPage";
import CheckoutPageItem from "@/pages/checkout/CheckoutPageItem";
import PurchaseSuccess from "@/pages/checkout/PurchaseSuccess";
import LoginPage from "@/pages/connexion/ConnexionPage";
import LoginAdmin from "@/pages/connexion/LoginAdmin";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductItemsPage from "@/pages/product/ProductItemsPage";
import ProductPage from "@/pages/product/ProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminLoginRoutes from "./AdminLoginRoutes";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import Paiement from "@/pages/admin/paiement/Paiement";


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
      { path: "category", element: <HomePage /> },
      { path: "category/:id", element: <HomePage /> },
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
          { path: "wishlist", element: <CartPage /> },
          { path: "notifications", element: <CartPage /> },
        ],
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
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "commande", element: <Commande /> },
      { path: "commande-attente", element: <CommandeAttente /> },
      { path: "produits", element: <Products /> },
      { path: "produits/ajouter", element: <AddProduct /> },
      { path: "produits/:id", element: <EditProduct /> },
      { path: "produits/:id/images", element: <EditProductImages /> },
      { path: "clients", element: <Customer /> },
      { path: "users", element: <UserStaff /> },
      { path: "account", element: <Customer /> },
      { path: "paiement", element: <Paiement /> },
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
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
