import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [failedLoginPopup, setFailedLoginPopup] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login/login",
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        alert("Login berhasil");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setFailedLoginPopup(true);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-light_green">
      <h1 className="font-bold text-3xl">SISTEM OPERASIONAL</h1>
      <div className="h-2" />
      <h2 className="font-normal text-2xl">BN SHOP UBUD</h2>
      <div className="h-10" />
      <div className="bg-slate-200 shadow-md py-8 px-12 flex flex-col rounded-3xl	w-1/2">
        <h2 className="text-center font-normal text-2xl">LOGIN</h2>
        <div className="h-8" />
        <input
          className="rounded-lg px-3 py-1"
          placeholder="Username"
          value={username!}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="h-8" />
        <input
          className="rounded-lg px-3 py-1"
          placeholder="Password"
          value={password!}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="h-8" />
        <button
          className="bg-dark_green rounded-2xl px-8 py-2 w-min self-end text-white font-medium"
          onClick={() => login()}
        >
          LOGIN
        </button>
      </div>
      {failedLoginPopup ? (
        <div className="z-[1] bg-white fixed flex justify-center items-center rounded-lg flex-col px-28 py-8 border space-y-12">
          <h1>LOGIN GAGAL !</h1>
          <p>Username atau Password yang anda masukan salah</p>
          <button
            className="bg-dark_green rounded-lg px-4 py-2 w-min text-white"
            onClick={() => setFailedLoginPopup(false)}
          >
            Konfirmasi
          </button>
        </div>
      ) : null}
    </div>
  );
}
