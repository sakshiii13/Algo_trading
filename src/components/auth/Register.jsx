// src/pages/auth/Register.jsx

import React, { useState } from "react";
import { userRegister } from "../../api/user/user.api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slice/authSlice";

import { UserRouters } from "../../constant/router";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    referredBy: "",
  });

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.password ||
      !formData.referredBy
    ) {
      return Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields",
        background: "#050816",
        color: "#fff",
        confirmButtonColor: "#ff5d9f",
      });
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.mobile, // IMPORTANT FIX
        password: formData.password,
        referredBy: formData.referredBy,
      };

      console.log("REGISTER PAYLOAD 👉", payload);

      const res = await userRegister(payload);

      console.log("REGISTER RESPONSE 👉", res);

      if (res?.success) {
        const userData = res?.data?.user || res?.data;

        dispatch(
          loginSuccess({
            user: userData,
            token: res?.token,
          })
        );

        // ================= SAVE SESSION =================

        if (res?.token) {
          sessionStorage.setItem("token", res.token);
        }

        if (userData?.role) {
          sessionStorage.setItem("role", userData.role);
        }

        sessionStorage.setItem(
          "user",
          JSON.stringify(userData)
        );

        Swal.fire({
          icon: "success",
          title: "Registration Success",
          text: res?.message || "Account created successfully",
          background: "#050816",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(UserRouters.DASHBOARD);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: res?.message || "Registration failed",
          background: "#050816",
          color: "#fff",
          confirmButtonColor: "#ff5d9f",
        });
      }
    } catch (error) {
      console.log("REGISTER ERROR 👉", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.message ||
          "Something went wrong during registration",
        background: "#050816",
        color: "#fff",
        confirmButtonColor: "#ff5d9f",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#050816] font-[Inter] overflow-hidden">
      
      {/* LEFT SIDE */}
      <div className="relative flex items-center justify-center px-4 sm:px-6 lg:px-12 py-6 overflow-hidden bg-[#050816]">

        <div className="absolute top-[-50px] left-[-50px] w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="absolute bottom-[-50px] right-[-50px] w-[250px] h-[250px] rounded-full bg-pink-500/10 blur-[100px]" />

        <div className="relative z-10 w-full max-w-[460px] rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-2xl shadow-2xl px-6 py-6 sm:px-8 sm:py-8">

          {/* HEADER */}

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black tracking-widest text-[#ff5d9f]">
              <span className="text-[#ff5d9f] text-sm animate-pulse">
                ⬡
              </span>
              USER_REGISTRATION
            </div>

            <h2 className="mt-4 text-[32px] sm:text-[38px] font-black text-white leading-tight italic uppercase tracking-tighter">
              Create <span className="text-[#ff5d9f]">Account</span>
            </h2>

            <p className="text-xs text-slate-500 mt-2 font-mono uppercase tracking-widest">
              Establish your identity in the network.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3.5"
          >

            {/* NAME */}

            <div className="md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block ml-1">
                Name
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="User A"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-white/5 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block ml-1">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="a@gmail.com"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-white/5 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* MOBILE */}

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block ml-1">
                Mobile
              </label>

              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  placeholder="9999999999"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-white/5 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block ml-1">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="******"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-white/5 bg-white/[0.03] pl-11 pr-12 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500/50"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#ff5d9f]"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* REFERRAL */}

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1.5 block ml-1">
                Referral Code
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  name="referredBy"
                  value={formData.referredBy}
                  placeholder="Referral Code"
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-white/5 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 w-full h-12 rounded-xl bg-[#ff5d9f] hover:bg-[#ff8a1c] text-black font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-[#ff5d9f]/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-60"
            >
              {loading ? "CREATING..." : "CREATE ACCOUNT"}

              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-6 text-center">
            Existing User?
            <Link
              to="/login"
              className="text-[#ff5d9f] hover:text-white transition-colors ml-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="hidden lg:block relative overflow-hidden bg-[#050816]">

        <img
          src="https://img.freepik.com/premium-psd/bitcoin-safe-secure-digital-currency-storage-secure-crypto-vault-filled-with-golden-coins-representi_1465813-44.jpg"
          alt="crypto"
          className="w-full h-full object-cover opacity-50 grayscale"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16 text-white">
          <div className="max-w-lg space-y-6">

            <div className="flex items-center gap-3 text-[#ff5d9f]">
              <ShieldCheck
                size={28}
                className="animate-pulse"
              />

              <p className="text-[10px] font-black tracking-[0.4em] uppercase">
                Protocol_Security_Established
              </p>
            </div>

            <h2 className="text-4xl xl:text-5xl font-black leading-tight italic uppercase tracking-tighter">
              The_Next_Evolution
              <br />

              <span className="text-[#ff5d9f]">
                Of_Asset_Control.
              </span>
            </h2>

            <div className="w-24 h-1 bg-cyan-500/50" />

            <p className="mt-3 text-slate-400 text-xs font-mono leading-relaxed uppercase tracking-wider">
              Encryption at rest. Total decentralization.
              <br />
              Join the network and manage your digital assets
              with a precision-engineered dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;