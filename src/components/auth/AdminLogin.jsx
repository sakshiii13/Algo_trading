import React, { useState } from "react";
import { adminLogin } from "../../api/admin/admin.api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";
import { AdminRouters } from "../../constant/router";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return Swal.fire("Error", "All fields are required", "error");
    }

    try {
      const res = await adminLogin(formData);

      if (res?.success) {
        dispatch(
          loginSuccess({
            user: res.data,
            token: res.token,
          })
        );

        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("role", "admin");

        Swal.fire("Success", "Admin Login Successful", "success");

        navigate(AdminRouters.DASHBOARD);
      } else {
        Swal.fire("Error", res?.message || "Login failed", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="h-screen overflow-hidden grid lg:grid-cols-2 bg-[#f8fafc] font-[Inter]">
      <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-3 overflow-hidden bg-gradient-to-br from-[#f8fafc] via-[#eef4ff] to-[#f5f3ff]">
        <div className="absolute top-[-80px] left-[-50px] w-[200px] h-[200px] rounded-full bg-cyan-200/40 blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-40px] w-[220px] h-[220px] rounded-full bg-purple-200/40 blur-3xl"></div>

        <div className="relative z-10 w-full max-w-[460px] rounded-[24px] border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.10)] px-5 py-5 sm:px-6 sm:py-6">
          <div className="mb-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
              <ShieldCheck size={14} className="text-cyan-600" />
              ADMIN PANEL
            </div>

            <h2 className="mt-4 text-[28px] sm:text-[32px] font-semibold text-gray-900 leading-tight">
              Admin login
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Enter admin credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-gray-200 bg-white/85 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[13px] font-medium text-gray-700 mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-gray-200 bg-white/85 pl-11 pr-12 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button className="w-full h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-cyan-200/60 hover:scale-[1.01] transition duration-300 mt-2">
              LOGIN AS ADMIN
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:block h-screen relative overflow-hidden">
        <img
          src="https://img.freepik.com/free-psd/cryptocurrency-digital-wallet-3d-illustration_1419-2747.jpg?t=st=1775730570~exp=1775734170~hmac=97714c876f41e3fd4a1ab357d482026e760a56263d41b669e68818d7cc756ce2"
          alt="admin"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/75 via-[#0b1021]/45 to-cyan-900/50"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-8 xl:p-12 text-white">
          <div className="max-w-lg">
            <p className="text-cyan-300 text-xs font-medium tracking-[0.28em] uppercase mb-3">
              Secure Access
            </p>
            <h2 className="text-3xl xl:text-5xl font-semibold leading-tight">
              Control the platform from one secure admin dashboard
            </h2>
            <p className="mt-3 text-white/75 text-sm xl:text-base leading-6">
              Monitor activity, manage users, and access administrative tools
              through a premium and secure control panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;