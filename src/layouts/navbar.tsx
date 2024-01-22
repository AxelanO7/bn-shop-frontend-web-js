import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  name_user: string;
  position: string;
  username: string;
  password: string;
  status: number;
}

export default function Navbar() {
  const [navSide, setNavSide] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      if (res.status === 200) setUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/logout");
      if (res.status === 200) {
        alert("Berhasil Logout");
        window.location.href = "/";
      }
    } catch (error) {
      alert("Gagal Logout");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col fixed top z-[1] w-full">
        <nav className="bg-green flex flex-row justify-between px-10 items-center py-4 text-white">
          <div
            className="flex flex-col space-y-2"
            onClick={() => setNavSide(!navSide)}
          >
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
            <div className="w-5 h-0.5 bg-white" />
          </div>
          {/* on click option to logout */}

          <div className="flex flex-row items-center cursor-pointer">
            {/* <div className="w-5 h-5 bg-white rounded-full" /> */}
            <p>{user?.name_user}</p>
            <div className="w-4" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
              onClick={handleLogout}
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </nav>
        {navSide ? (
          <div className="bg-dark_green/75 w-max text-white py-6 space-y-4 h-screen">
            <h1 className="cursor-pointer px-10 pr-24">MAIN NAVIGATION</h1>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Dashboard
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/order";
              }}
            >
              Pemesanan Bahan Baku
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/stock";
              }}
            >
              Data Barang
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/supplier";
              }}
            >
              Data Supplier
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/print-order";
              }}
            >
              Laporan Pemesanan Bahan Baku
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/print-stock";
              }}
            >
              Laporan Stok Barang
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/print-input";
              }}
            >
              Laporan Barang Masuk
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/print-output";
              }}
            >
              Laporan Barang Keluar
            </p>
            <p
              className="cursor-pointer hover:bg-white hover:text-dark_green px-10 pr-24 py-2 rounded-md"
              onClick={() => {
                window.location.href = "/print-opname";
              }}
            >
              Laporan Stok Opname
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}
