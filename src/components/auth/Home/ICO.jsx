import React from "react";
import { ShieldCheck, Smartphone, CreditCard, Globe } from "lucide-react";

const featuresLeft = [
  {
    icon: <ShieldCheck size={26} />,
    title: "Secure Wallet",
    desc: "Military-grade encryption protecting your digital assets 24/7.",
  },
  {
    icon: <Smartphone size={26} />,
    title: "Mobile App",
    desc: "Full portfolio control in the palm of your hand with zero lag.",
  },
];

const featuresRight = [
  {
    icon: <CreditCard size={26} />,
    title: "Easy Payments",
    desc: "One-tap liquidations and instant merchant settlements.",
  },
  {
    icon: <Globe size={26} />,
    title: "Global Access",
    desc: "Borderless transactions across 180+ countries instantly.",
  },
];

const ICO = () => {
  return (
    <section className="relative bg-[#050816] text-white py-24 md:py-32 overflow-hidden">
      
      {/* Background Cinematic Atmosphere */}
      <div className="absolute top-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#ff5d9f]/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-[500px] h-[500px] bg-[#7c5cff]/10 blur-[150px] rounded-full"></div>

      {/* Structured Grid Backdrop */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-y-0 left-[25%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[50%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[75%] w-px bg-white/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter uppercase italic">
            Next-Gen <span className="text-[#ff5d9f]">Features</span>
          </h2>
          <div className="w-24 h-[4px] bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] mx-auto mt-4 rounded-full shadow-[0_0_20px_#ff5d9f]"></div>
        </div>

        {/* Features Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-16 md:gap-20">

          {/* LEFT SIDE FEATURES */}
          <div className="space-y-16">
            {featuresLeft.map((item, i) => {
              const accent = i % 2 === 0 ? "#ff5d9f" : "#7c5cff";
              return (
                <div key={i} className="group flex flex-col lg:flex-row gap-6 items-center lg:items-start text-center lg:text-right">
                  <div className="flex-1 order-2 lg:order-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff5d9f] transition-colors uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto lg:ml-auto group-hover:text-slate-200 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Glass Icon Node */}
                  <div 
                    className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:rotate-[10deg] order-1 lg:order-2"
                    style={{ 
                        boxShadow: `0 0 30px ${accent}22`,
                        color: accent 
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {item.icon}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CENTRAL CORE IMAGE */}
          <div className="relative group perspective-1000">
            {/* Pulsing Core Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#ff5d9f]/30 blur-[100px] rounded-full animate-pulse"></div>
            
            <img
              src="/wallet-neon.svg"
              alt="ICO Wallet Core"
              className="relative z-10 w-[280px] md:w-[320px] mx-auto drop-shadow-[0_0_80px_rgba(124,92,255,0.25)] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3"
            />
            
            {/* Rotating Cyber Ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-dashed border-[#ff5d9f]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
          </div>

          {/* RIGHT SIDE FEATURES */}
          <div className="space-y-16">
            {featuresRight.map((item, i) => {
              const accent = i % 2 === 0 ? "#7c5cff" : "#ff5d9f";
              return (
                <div key={i} className="group flex flex-col lg:flex-row gap-6 items-center lg:items-start text-center lg:text-left">
                  {/* Glass Icon Node */}
                  <div 
                    className="relative w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 group-hover:rotate-[-10deg]"
                    style={{ 
                        boxShadow: `0 0 30px ${accent}22`,
                        color: accent 
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-[#7c5cff] transition-colors uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto lg:mr-auto group-hover:text-slate-200 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Bottom Visual Termination */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default ICO;