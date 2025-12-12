// src/routes/AppRoutes.tsx
import AccountLayout from "@/layouts/AccountLayout";
import AdminLayout from "@/layouts/AdminLayout";
import UserLayout from "@/layouts/UserLayout";
import AccountPage from "@/pages/account/AccountPage";
import MyOrderPage from "@/pages/account/myOrders/MyOrderPage";
import Commande from "@/pages/admin/commandes/Commande";
import Customer from "@/pages/admin/Customer/Customer";
import AdminDashboard from "@/pages/admin/dashboard/AdminDashboard";
import AddProduct from "@/pages/admin/ProduitGerer/AddProduct";
import Products from "@/pages/admin/ProduitGerer/Products";
import CartPage from "@/pages/cart/CartPage";
import CheckoutPage from "@/pages/checkout/CheckoutPage";
import CheckoutPageItem from "@/pages/checkout/CheckoutPageItem";
import LoginPage from "@/pages/connexion/ConnexionPage";
import LoginAdmin from "@/pages/connexion/LoginAdmin";
import HomePage from "@/pages/home/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProductItemsPage from "@/pages/product/ProductItemsPage";
import ProductPage from "@/pages/product/ProductPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import AdminLoginRoutes from "./AdminLoginRoutes";
import EditProduct from "@/pages/admin/ProduitGerer/EditProduct";
import EditProductImages from "@/pages/admin/ProduitGerer/EditProductImages_new";


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
            <CartPage />
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
      { path: "produits", element: <Products /> },
      { path: "produits/ajouter", element: <AddProduct /> },
      { path: "produits/:id", element: <EditProduct /> },
      { path: "produits/:id/images", element: <EditProductImages /> },
      { path: "clients", element: <Customer /> },
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
