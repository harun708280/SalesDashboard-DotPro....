import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState("admin@dot.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const secretToken='YzJjZmZjOTYzMjY4YzM5ZTRjNjg2MzZkZDNhNjcwNjcwNDcyMmViMjIzYmNiNTYzNTYwNzE2ZjBhNzc5MjhiYw'

    if (email === "admin@dot.com" && password === "123456") {
      Cookies.set("mockToken", secretToken, { expires: 7 });
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/bgLogin.png')" }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 w-[90%] max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <img src="/logo2.png" alt="Logo" className="h-12 bg-white rounded-full object-cover" />
        </div>
        <h2 className="text-2xl font-semibold text-white text-center mb-4">Welcome Back Dot Admin</h2>

        {error && <p className="text-red-300 text-center mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-white block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="text-white block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
