import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SupplierPage from "./pages/SupplierPage";
import StockPage from "./pages/StockPage";

import OrderPage from "./pages/order/index";
import CreateOrderPage from "./pages/order/create";
import UpdateOrderPage from "./pages/order/update";

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
        <Route path="/add-order/" element={<CreateOrderPage />} />
        <Route path="/update-order/" element={<UpdateOrderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
