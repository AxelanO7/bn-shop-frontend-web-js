import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login_page";
import DashboardPage from "./pages/dashboard_page";

import StockPage from "./pages/stock";
import PrintStockPage from "./pages/stock/print";
import ReportStockPage from "./pages/stock/report";

import CreateInputPage from "./pages/input/create";
import PrintInputPage from "./pages/input/print";
import ReportInputPage from "./pages/input/report";

import CreateOutputPage from "./pages/output/create";
import PrintOutputPage from "./pages/output/print";
import ReportOutputPage from "./pages/output/report";

import CreateOpnamePage from "./pages/opname/create";
import PrintOpnamePage from "./pages/opname/print";
import ReportOpnamePage from "./pages/opname/report";

import OrderPage from "./pages/order/index";
import CreateOrderPage from "./pages/order/create";
import UpdateOrderPage from "./pages/order/update";
import PrintOrderPage from "./pages/order/print";
import ReportOrderPage from "./pages/order/report";

import SupplierPage from "./pages/supplier/supplier_page";

import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/stock" element={<StockPage />} />
        <Route path="/print-stock" element={<PrintStockPage />} />
        <Route
          path="/report-stock/:startDate/:endDate"
          element={<ReportStockPage />}
        />

        <Route path="/add-input" element={<CreateInputPage />} />
        <Route path="/print-input" element={<PrintInputPage />} />
        <Route
          path="/report-input/:startDate/:endDate"
          element={<ReportInputPage />}
        />

        <Route path="/add-output" element={<CreateOutputPage />} />
        <Route path="/print-output" element={<PrintOutputPage />} />
        <Route
          path="/report-output/:startDate/:endDate"
          element={<ReportOutputPage />}
        />

        <Route path="/add-opname" element={<CreateOpnamePage />} />
        <Route path="/print-opname" element={<PrintOpnamePage />} />
        <Route path="/report-opname/:date" element={<ReportOpnamePage />} />

        <Route path="/order" element={<OrderPage />} />
        <Route path="/add-order" element={<CreateOrderPage />} />
        <Route path="/edit-order/:id" element={<UpdateOrderPage />} />
        <Route path="/print-order" element={<PrintOrderPage />} />
        <Route
          path="/report-order/:startDate/:endDate"
          element={<ReportOrderPage />}
        />

        <Route path="/supplier" element={<SupplierPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
