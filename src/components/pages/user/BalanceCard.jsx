import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Plus, Wallet, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const BalanceCard = ({ balance = 1086000 }) => {
  const [time, setTime] = useState(new Date());

  // 🔥 Redux se profile image lo
  const user = useSelector((state) => state.auth?.user);

  console.log("User from Redux:", user);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // live time

    return () => clearInterval(interval);
  }, []);

  const formatBalance = (num) => {
    return num.toLocaleString("en-IN"); // Indian format
  };

  return (
    <div className="relative group overflow-hidden bg-[#0a101f] border border-white/10 rounded-md p-8 shadow-md transition-all duration-500 hover:border-[#ff5d9f]/30">
      
      {/* Background Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#ff5d9f]/10 blur-[80px] rounded-full group-hover:bg-[#ff5d9f]/20 transition-all duration-700" />
      
      {/* Profile */}
      <div className="relative flex justify-center">
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#ff5d9f] to-blue-600 shadow-[0_0_20px_rgba(255,93,159,0.3)]">
          <img
            src={user?.profilePhoto || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-[#0a101f]"
          />
          {/* Online status dot */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-[#0a101f] rounded-full shadow-[0_0_10px_#10b981]" />
        </div>
      </div>

      {/* Balance Text */}
      <div className="flex items-center justify-center gap-2 mt-6 opacity-50">
        <Wallet size={12} className="text-[#ff5d9f]" />
        <p className="text-white tracking-[4px] text-[10px] font-black uppercase">MY BALANCE</p>
      </div>

      {/* Amount */}
      <h2 className="text-5xl font-black mt-2 text-white tracking-tighter flex items-center justify-center gap-1">
        <span className="text-[#ff5d9f] text-2xl font-medium italic">$</span>
        {formatBalance(balance)}
      </h2>

      {/* Live Time */}
      <div className="flex items-center justify-center gap-2 mt-4 text-slate-500">
        <Clock size={12} className="animate-pulse" />
        <p className="text-[11px] font-mono font-bold tracking-widest uppercase">
          {time.toLocaleTimeString([], { hour12: false })}
        </p>
      </div>

      {/* Button */}
      <Link to="/investment" className="block mt-8">
        <button className="w-full group/btn relative overflow-hidden flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 transition-all duration-300 hover:bg-[#ff5d9f] hover:border-[#ff5d9f] cursor-pointer">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#ff5d9f] group-hover/btn:bg-[#050816] group-hover/btn:text-[#ff5d9f] text-black p-2 rounded-xl transition-colors">
              <Plus size={18} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-black tracking-[0.2em] text-white group-hover/btn:text-black transition-colors uppercase">
              INVEST NOW
            </span>
          </div>

          <span className="text-white/30 group-hover/btn:text-black/50 text-2xl transition-colors relative z-10">›</span>

          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
        </button>
      </Link>

      {/* Small UI Detail */}
      <div className="absolute top-4 left-6">
        <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">
          SECURE_VAULT_NODE
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;