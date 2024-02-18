import {BrowserRouter, Route, Routes,Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CustomerPage from "./pages/CustomerPage";
import StatsPage from "./pages/StatsPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProductPages from "./pages/ProductPages";
import BillsPage from "./pages/BillsPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";




function App() {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <>
    <BrowserRouter>

      <Routes>
      <Route
          path="/"
          element={
            <RouteControl>
              <HomePage />
            </RouteControl>
          }
        />
        <Route
          path="/cart"
          element={
            <RouteControl>
              <CartPage />
            </RouteControl>
          }
        />
        <Route
          path="/bills"
          element={
            <RouteControl>
              <BillsPage />
            </RouteControl>
          }
        />
        <Route
          path="/customers"
          element={
            <RouteControl>
              <CustomerPage />
            </RouteControl>
          }
        />
        <Route
          path="/stats"
          element={
            <RouteControl>
              <StatsPage />
            </RouteControl>
          }
        />
        <Route
          path="/products"
          element={
            <RouteControl>
              <ProductPages />
            </RouteControl>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
    </>

  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};








