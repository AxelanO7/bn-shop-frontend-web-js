import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SupplierPage from "./pages/SupplierPage";
import StockPage from "./pages/StockPage";
import OrderPage from "./pages/OrderPage";
import DetailOrderPage from "./pages/DetailOrderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/stock" element={<StockPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/detail-order/" element={<DetailOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
