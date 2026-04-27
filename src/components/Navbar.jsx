import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] =
    useState(false);
  const [user, setUser] = useState(null);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Saved Jobs", path: "/saved-jobs" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // Register
  const handleRegister = () => {
    localStorage.setItem(
      "user",
      JSON.stringify(registerData)
    );

    setUser(registerData);
    alert("Registered Successfully 🎉");
    setShowRegister(false);
  };

  // Login
  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (
      savedUser &&
      savedUser.email === loginData.email &&
      savedUser.password === loginData.password
    ) {
      setUser(savedUser);
      alert("Login Successful 🎉");
      setShowLogin(false);
    } else {
      alert("Invalid Credentials");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logout Successful");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/20 backdrop-blur-xl shadow-lg">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition duration-300"
          >
            HireHub
          </Link>

          {/* Modern Nav Buttons */}
          <div className="hidden md:flex items-center gap-4 bg-white/20 backdrop-blur-xl border border-white/20 px-3 py-2 rounded-2xl shadow-md">

            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() =>
                  setActive(item.name)
                }
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${active === item.name
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-white/50 hover:text-blue-600"
                  }`}
              >
                {item.name}
              </Link>
            ))}

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {user ? (
              <>
                <div className="px-4 py-2 rounded-xl bg-white/30 backdrop-blur-md border border-white/20 text-blue-700 font-semibold hover:scale-105 transition duration-300">
                  {user.name}
                </div>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 hover:scale-105 hover:shadow-lg active:scale-95 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    setShowLogin(true)
                  }
                  className="px-4 py-2 rounded-xl text-gray-700 hover:bg-white/40 hover:text-blue-600 hover:scale-105 active:scale-95 transition duration-300"
                >
                  Login
                </button>

                <button
                  onClick={() =>
                    setShowRegister(true)
                  }
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg active:scale-95 transition duration-300"
                >
                  Register
                </button>
              </>
            )}

          </div>

        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl p-8">

            <h2 className="text-3xl font-bold text-white mb-6">
              Login
            </h2>

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/70 outline-none mb-4 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/70 outline-none mb-5 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] transition duration-300"
            >
              Login
            </button>

            <button
              onClick={() =>
                setShowLogin(false)
              }
              className="w-full mt-3 py-3 rounded-xl bg-white/30 text-white hover:bg-white/40 transition duration-300"
            >
              Close
            </button>

          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center px-4">
          <div className="w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-2xl border border-white/20 shadow-2xl p-8">

            <h2 className="text-3xl font-bold text-white mb-6">
              Register
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-xl bg-white/70 outline-none mb-4 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl bg-white/70 outline-none mb-4 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-white/70 outline-none mb-5 focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
            />

            <button
              onClick={handleRegister}
              className="w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] transition duration-300"
            >
              Register
            </button>

            <button
              onClick={() =>
                setShowRegister(false)
              }
              className="w-full mt-3 py-3 rounded-xl bg-white/30 text-white hover:bg-white/40 transition duration-300"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;