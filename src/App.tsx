import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_page";
import DashboardPage from "./pages/dashboard_page";
import SupplierPage from "./pages/supplier_page";
import StockPage from "./pages/stock_page";

import OrderPage from "./pages/order/index";
import CreateOrderPage from "./pages/order/create";
import UpdateOrderPage from "./pages/order/update";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateOrderPage />} />

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
