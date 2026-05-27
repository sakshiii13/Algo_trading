import React from "react";
import { Cpu, ShieldCheck, RefreshCw, Layers } from "lucide-react";

const DashboardFooter = () => {
  return (
    <footer className="mt-12 mb-4 px-2 sm:px-4">
      {/* ── ELITE FLOATING GLASS ISLAND ── */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#070b19]/60 via-[#040712]/80 to-[#02040a]/40 border border-slate-900/80 rounded-[24px] md:rounded-[32px] p-5 md:p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
        
        {/* Subtle Decorative Ambient Lighting */}
        <div className="absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-[#ff5d9f]/5 blur-2xl pointer-events-none" />
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#6a98e0]/5 blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          
          {/* LEFT: Branding & Dynamic Operational Infrastructure */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-850/80 rounded-xl text-[10px] font-black text-slate-300 tracking-wider shadow-inner">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>SECURE_NODE_ACTIVE</span>
            </div>
            
            <div className="space-y-0.5">
              <p className="text-[12px] font-bold text-slate-400 tracking-wide">
                © {new Date().getFullYear()}{" "}
                <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent font-black tracking-tight">EDGE</span>
                <span className="text-slate-600 font-normal"> • Protocol Architecture</span>
              </p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                Mainnet Systems: <span className="text-slate-400">Optimal Cluster</span>
              </p>
            </div>
          </div>

          {/* RIGHT: High-End Telemetry Metrics & Versioning */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Real-time Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/30 border border-slate-850/40 text-[10px] font-semibold text-slate-500 font-mono">
              <RefreshCw size={11} className="text-[#6a98e0] animate-spin [animation-duration:8s]" />
              <span>PING: 12ms</span>
            </div>

            {/* Architecture Node Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900/50 border border-slate-850/60 text-slate-400 shadow-sm group-hover:border-[#ff5d9f]/20 transition-colors duration-300">
              <Cpu size={12} className="text-[#ff5d9f]" />
              <span className="text-[10px] font-extrabold font-mono tracking-widest uppercase">
                v1.2.0-PRO
              </span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;