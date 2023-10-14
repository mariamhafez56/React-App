import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Cart from "./Components/Cart/Cart";
import Brand from "./Components/Brands/Brand";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import ProductDetials from "./Components/ProductDetials/ProductDetials";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import AuthContextProvider from "./Contexts/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProtectedSign from "./Components/ProtectedSign/ProtectedSign";
import CartContextProvider, { CartContext } from "./Contexts/CartContext";

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Navigate to={"home"} />
            </ProtectedRoute>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedSign>
              <Login />
            </ProtectedSign>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedSign>
              <Register />
            </ProtectedSign>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetials/:id",

          element: (
            <ProtectedRoute>
              <ProductDetials />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <AuthContextProvider>
          <RouterProvider router={routers}></RouterProvider>
        </AuthContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
