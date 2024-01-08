import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillsPage from "./pages/BillsPage";
import CustomerPage from "./pages/CustomerPage";
import StatsPage from "./pages/StatsPage";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";




function App() {
  return (
    <>
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/bills" element={<BillsPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </BrowserRouter>
    </>

  );
}

export default App;
