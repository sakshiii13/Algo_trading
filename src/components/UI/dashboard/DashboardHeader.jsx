import React from "react";
import { LogOut, Shield, Radio } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.clear();
    navigate("/");
  };

  return (
    // Floating Capsule Container - Screen par premium tairta hua widget
    <div className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] mx-auto my-4 sticky top-4 z-[100] transition-all">
      <div className="relative w-full rounded-2xl bg-slate-950/40 backdrop-blur-2xl border border-white/[0.06] p-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Futuristic Laser Edge Line (Bottom Glow) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

        {/* Left: Cyber Command Badge */}
        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.04] pl-3 pr-4 py-1.5 rounded-xl">
          <div className="relative flex items-center justify-center">
            <Radio size={14} className="text-emerald-400 animate-pulse" />
            <span className="absolute w-2 h-2 rounded-full bg-emerald-400/40 animate-ping"></span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800"></div>
          <div>
            <span className="block text-[9px] font-black tracking-widest text-indigo-400 uppercase leading-none mb-1">
              NODE_OPERATOR
            </span>
            <h2 className="text-xs font-bold text-slate-200 font-mono tracking-tight leading-none">
              {user?.name || "PROTOCOL_ALPHA"}
            </h2>
          </div>
        </div>

        {/* Center/Right: Modular Control Hub */}
        <div className="flex items-center gap-2 bg-slate-900/60 p-1 rounded-xl border border-white/[0.04]">
          
          {/* Quick System Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-slate-400 font-medium">
            <Shield size={12} className="text-indigo-400" />
            <span>SECURE_LINK</span>
          </div>

          <div className="hidden md:block h-4 w-[1px] bg-slate-800 mx-1"></div>

          {/* User Profile Trigger - Linked directly to user profile route */}
          <div 
            onClick={() => navigate("/profile")} // <-- Apne exact profile url route ke hisab se isko adjust kar lena (e.g., "/dashboard/profile")
            className="p-1 flex items-center gap-2 bg-white/[0.02] border border-white/[0.05] rounded-lg group cursor-pointer hover:bg-white/[0.05] hover:border-indigo-500/30 transition-all duration-300"
            title="Open Control Matrix"
          >
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="operator"
                className="w-7 h-7 rounded-md object-cover border border-white/10 group-hover:border-indigo-500/40 transition-colors"
              />
            ) : (
              <div className="w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xs font-mono font-bold text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                {user?.name?.charAt(0)?.toUpperCase() || "O"}
              </div>
            )}
            <span className="text-xs font-medium text-slate-300 hidden sm:inline-block pr-1 group-hover:text-indigo-300 transition-colors">
              Profile
            </span>
          </div>

          {/* Terminate Session Action */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-9 h-9 rounded-lg 
            bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white
            border border-rose-500/20 hover:border-rose-500
            transition-all duration-300 group"
            title="Disconnect Terminal"
          >
            <LogOut
              size={14}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardHeader;