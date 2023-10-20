import React, { useState } from "react";

export default function LoginPage() {
  const [popup, setPopup] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-t_white-100">
      <h1>SISTEM OPERASIONAL</h1>
      <h2>BN SHOP UBUD</h2>
      <div className="h-10" />
      <div className="bg-light_green py-6 px-8 flex flex-col rounded-lg w-1/2">
        <h2 className="text-center">LOGIN</h2>
        <div className="h-8" />
        <input className="rounded-lg px-3 py-1" placeholder="username" />
        <div className="h-6" />
        <input className="rounded-lg px-3 py-1" placeholder="password" />
        <div className="h-8" />
        <button
          className="bg-dark_green rounded-lg px-4 py-2 w-min self-end text-white"
          onClick={() => setPopup(true)}
        >
          LOGIN
        </button>
      </div>
      {popup ? (
        <div className="z-[1] bg-white fixed flex justify-center items-center rounded-lg flex-col px-28 py-8 border space-y-12">
          <h1>LOGIN GAGAL !</h1>
          <p>username atau password yang anda masukan salah</p>
          <button
            className="bg-dark_green rounded-lg px-4 py-2 w-min text-white"
            onClick={() => setPopup(false)}
          >
            Konfirmasi
          </button>
        </div>
      ) : null}
    </div>
  );
}
