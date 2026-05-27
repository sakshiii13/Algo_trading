import React, { useState } from "react";
import { forgetPassword } from "../../api/user/user.api";
import Swal from "sweetalert2";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../redux/slice/loaderSlice";
import { Link } from "react-router-dom";
import { Routers } from "../../constant/router";

const ForgatePassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email is required",
        background: "#050816",
        color: "#fff",
      });
    }

    try {
      dispatch(showLoader());

      const res = await forgetPassword({ email });

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.message || "Reset link sent to your email",
          background: "#050816",
          color: "#fff",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res?.message || "Something went wrong",
          background: "#050816",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Server error",
        background: "#050816",
        color: "#fff",
      });
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#050816] font-[Inter] overflow-hidden">
      
      {/* LEFT SIDE (FORM) */}
      <div className="relative flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16">
        
        {/* Background Glow */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[120px]"></div>

        <div className="relative z-10 w-full max-w-md">

          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black tracking-widest text-[#ff5d9f] backdrop-blur-md">
              <span className="text-[#ff5d9f] text-base animate-pulse">⬡</span>
              EDGE_ACCESS
            </div>

            <h2 className="mt-8 text-4xl sm:text-5xl font-black text-white leading-tight tracking-tighter italic uppercase">
              Reset <span className="text-[#ff5d9f]">Password</span>
            </h2>

            <p className="text-sm text-slate-500 mt-4 font-mono uppercase tracking-wider">
              Enter your email to receive reset instructions.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div className="group">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 block ml-1">
                Registered_Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#ff5d9f]"
                />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 rounded-2xl border border-white/5 bg-white/[0.03] pl-12 pr-4 text-sm text-white font-mono outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
              </div>
            </div>

            {/* Submit */}
            <button className="w-full h-14 rounded-2xl bg-[#ff5d9f] hover:bg-[#ff8a1c] text-black font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-[#ff5d9f]/20 transition-all active:scale-95 group">
              Send Reset E-mail
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Back to login */}
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mt-10 text-center">
            Remember Password?
            <Link
              to={Routers.LOGIN}
              className="text-[#ff5d9f] hover:text-white ml-2"
            >
              LOGIN
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (VISUAL SAME AS LOGIN) */}
      <div className="hidden lg:block relative overflow-hidden bg-[#050816]">
        <img
          src="https://img.freepik.com/premium-psd/bitcoin-safe-secure-digital-currency-storage-secure-crypto-vault-filled-with-golden-coins-representi_1465813-44.jpg"
          alt="crypto"
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050816_100%)] opacity-60"></div>

        <div className="absolute inset-0 flex flex-col justify-end p-16 text-white">
          <div className="max-w-lg space-y-6">
            <div className="flex items-center gap-3 text-[#ff5d9f]">
              <ShieldCheck size={24} className="animate-bounce" />
              <p className="text-[10px] font-black tracking-[0.4em] uppercase">
                Recovery_Mode_Enabled
              </p>
            </div>

            <h2 className="text-5xl font-black leading-tight italic uppercase tracking-tighter">
              Secure <br />
              <span className="text-[#ff5d9f]">Recovery.</span>
            </h2>

            <p className="text-slate-400 text-sm font-mono uppercase tracking-wider">
              Your identity verification ensures safe password recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgatePassword;