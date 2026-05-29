import React, { useState } from "react";
import { userLogin } from "../../api/user/user.api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";
import { Routers, UserRouters } from "../../constant/router";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "All fields are required",
        background: "#050816",
        color: "#fff",
      });
    }

    try {
      setLoading(true);
      const res = await userLogin(formData);

      if (res?.success) {
        dispatch(
          loginSuccess({
            user: res.data,
            token: res.token,
          })
        );

        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("role", res.data?.role);
        sessionStorage.setItem("user", JSON.stringify(res.data));

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Successful",
          background: "#050816",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(UserRouters.DASHBOARD);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.message || "Login failed",
          background: "#050816",
          color: "#fff",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
        background: "#050816",
        color: "#fff",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillTestCreds = () => {
    setFormData({ email: "b@gmail.com", password: "123456" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#050816] font-[Inter] overflow-hidden">
      {/* Left Section: Form */}
      <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 bg-[#050816]">
        {/* Animated Background Elements */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[120px]"></div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo & Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black tracking-widest text-[#ff5d9f] backdrop-blur-md">
              <span className="text-[#ff5d9f] text-base animate-pulse">⬡</span>
              EDGE_ACCESS
            </div>

            <h2 className="mt-8 text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter italic uppercase">
              Welcome <span className="text-[#ff5d9f]">Back</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-500 mt-4 font-mono uppercase tracking-wider">
              Verify credentials to access the node.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={fillTestCreds}
                className="text-xs text-slate-400 hover:text-[#ff5d9f] transition-colors"
              >
              
              </button>
            </div>

            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">
                Identity_Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#ff5d9f] transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-white/5 bg-white/[0.03] pl-12 pr-4 text-sm text-white font-mono outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">
                Access_Key
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#ff5d9f] transition-colors"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-14 rounded-2xl border border-white/5 bg-white/[0.03] pl-12 pr-12 text-sm text-white font-mono outline-none transition-all focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#ff5d9f] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
              <label className="flex items-center gap-2 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors">
                <input type="checkbox" className="accent-[#ff5d9f] rounded border-white/10 bg-white/5 w-4 h-4" />
                Persistence_Mode
              </label>
              <Link to={Routers.FORGATE_PASSWORD} >
                <button type="button" className="text-cyan-500 cursor-pointer hover:text-[#ff5d9f] transition-colors">
                  Forgot_Password?
                </button>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-14 rounded-2xl bg-[#ff5d9f] ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#ff8a1c]"} text-black font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-[#ff5d9f]/20 transition-all active:scale-95 group`}
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={18} className={`${loading ? "animate-spin" : "group-hover:translate-x-1 transition-transform"}`} />
            </button>
          </form>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-10 text-center">
            New Entity?{" "}
            <Link
              to="/register"
              className="text-[#ff5d9f] hover:text-white transition-colors ml-2"
            >
              CREATE_ACCOUNT
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section: Visual */}
      <div className="hidden lg:block relative overflow-hidden bg-[#050816]">
        <img
          src="https://img.freepik.com/premium-psd/bitcoin-safe-secure-digital-currency-storage-secure-crypto-vault-filled-with-golden-coins-representi_1465813-44.jpg"
          alt="crypto"
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
        />

        {/* Cyber Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050816_100%)] opacity-60"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-16 xl:p-20 text-white">
          <div className="max-w-lg space-y-6">
            <div className="flex items-center gap-3 text-[#ff5d9f]">
              <ShieldCheck size={24} className="animate-bounce" />
              <p className="text-[10px] font-black tracking-[0.4em] uppercase">
                Secure_Vault_Protocol_v3.0
              </p>
            </div>
            <h2 className="text-5xl xl:text-6xl font-black leading-tight italic uppercase tracking-tighter">
              Manage_Assets <br />
              <span className="text-[#ff5d9f]">With_Logic.</span>
            </h2>
            <div className="w-20 h-1 bg-cyan-500/50"></div>
            <p className="text-slate-400 text-sm font-mono leading-relaxed uppercase tracking-wider">
              Encryption at rest. Total decentralization. Professional-grade 
              performance tracking for the modern high-frequency operator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
