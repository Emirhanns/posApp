import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillsPage from "./pages/BillsPage";
import CustomerPage from "./pages/CustomerPage";
import StatsPage from "./pages/StatsPage";




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


      </Routes>

    </BrowserRouter>
    </>

  );
}

export default App;
