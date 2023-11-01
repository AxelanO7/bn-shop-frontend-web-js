import React, { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [failedLoginPopup, setFailedLoginPopup] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const login = async () => {
    const response = await axios.post("http://localhost:8080/api/login/login", {
      username: username,
      password: password,
    });
    if (response.status === 200) {
      alert("Login berhasil");
      window.location.href = "/order";
    } else setFailedLoginPopup(true);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-t_white-100">
      <h1>SISTEM OPERASIONAL</h1>
      <h2>BN SHOP UBUD</h2>
      <div className="h-10" />
      <div className="bg-light_green py-6 px-8 flex flex-col rounded-lg w-1/2">
        <h2 className="text-center">LOGIN</h2>
        <div className="h-8" />
        <input
          className="rounded-lg px-3 py-1"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="h-6" />
        <input
          className="rounded-lg px-3 py-1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="h-8" />
        <button
          className="bg-dark_green rounded-lg px-4 py-2 w-min self-end text-white"
          onClick={() => login()}
        >
          LOGIN
        </button>
      </div>
      {failedLoginPopup ? (
        <div className="z-[1] bg-white fixed flex justify-center items-center rounded-lg flex-col px-28 py-8 border space-y-12">
          <h1>LOGIN GAGAL !</h1>
          <p>username atau password yang anda masukan salah</p>
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
