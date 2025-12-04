// src/routes/AppRoutes.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import AdminLayout from "@/layouts/AdminLayout";
import HomePage from "@/pages/home/HomePage";
import ProductPage from "@/pages/product/ProductPage";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/checkout/CheckoutPage";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import Commande from "@/pages/admin/commandes/Commande";
import PrivateRoutes from "./PrivateRoutes";
import ProductItemsPage from "@/pages/product/ProductItemsPage";
import AccountPage from "@/pages/account/AccountPage";
import LoginPage from "@/pages/connexion/ConnexionPage";
import LoginAdmin from "@/pages/connexion/LoginAdmin";
import NotFoundPage from "@/pages/NotFoundPage";
import AccountLayout from "@/layouts/AccountLayout";
import MyOrderPage from "@/pages/account/myOrders/MyOrderPage";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import Products from "@/pages/admin/ProduitGerer/Products";
import Customer from "@/pages/admin/Customer/Customer";
import AddProduct from "@/pages/admin/ProduitGerer/AddProduct";

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
          { path: "orders", element: <MyOrderPage /> },
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
        children: [{ path: "success", element: <CartPage /> }],
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
      { path: "produits", element: <Products /> },
      { path: "produits/ajouter", element: <AddProduct /> },
      { path: "clients", element: <Customer /> },
    ],
  },
  {
    path: "/admin-login",
    element: (
      <PublicRoutes>
        <LoginAdmin />
      </PublicRoutes>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
