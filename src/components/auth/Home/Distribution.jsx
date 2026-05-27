import React, { useState } from "react";
import {
  BarChart3,
  Globe,
  HandCoins,
  ClipboardList,
  Shield,
  Coins,
  Presentation,
  ArrowUpRight,
} from "lucide-react";

const items = [
  {
    id: 1,
    title: "Trust your intuition",
    label: "Development",
    description: "Real-time data streams for faster decision making.",
    icon: <BarChart3 size={28} strokeWidth={2} />,
  },
  {
    id: 2,
    title: "Global Access",
    label: "Connectivity",
    description: "Borderless infrastructure for the modern economy.",
    icon: <Globe size={28} strokeWidth={2} />,
  },
  {
    id: 3,
    title: "Smart Support",
    label: "Algorithm",
    description: "Automated assistance powered by neural networks.",
    icon: <HandCoins size={28} strokeWidth={2} />,
  },
  {
    id: 4,
    title: "Market Analysis",
    label: "Analytics",
    description: "Predictive modeling for future asset growth.",
    icon: <ClipboardList size={28} strokeWidth={2} />,
  },
  {
    id: 5,
    title: "High Security",
    label: "Encryption",
    description: "Multi-layer protection for digital assets.",
    icon: <Shield size={28} strokeWidth={2} />,
  },
  {
    id: 6,
    title: "Fast Transactions",
    label: "Network",
    description: "Sub-second finality across all nodes.",
    icon: <Coins size={28} strokeWidth={2} />,
  },
  {
    id: 7,
    title: "Presentation Tools",
    label: "Visuals",
    description: "Crystal clear reporting for stakeholders.",
    icon: <Presentation size={28} strokeWidth={2} />,
  },
];

const Distribution = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeItem = items[activeIndex];

  const orbitSize = 520;
  const middleSize = 400;
  const innerSize = 290;
  const iconSize = 92;
  const radius = 205;

  return (
    <section className="relative overflow-hidden bg-[#050816] py-16 md:py-24 xl:py-32 text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(31,199,212,0.05),transparent)]" />
      
      {/* Starfield / Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Deep Nebula Glows */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#ff5d9f]/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7c5cff]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto grid max-w-[1380px] items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        
        {/* ORBITAL VISUALIZER */}
        <div className="flex justify-center order-2 lg:order-1">
          <div className="hidden md:block relative h-[620px] w-[620px] max-w-full scale-[0.75] lg:scale-[0.88] xl:scale-100 origin-center">
            
            {/* Outer Orbit Ring */}
            <div className="absolute left-1/2 top-1/2 h-[570px] w-[570px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(31,199,212,0.03),transparent_70%)]" />

            {/* Middle Orbit Ring */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: orbitSize,
                height: orbitSize,
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "inset 0 0 40px rgba(31,199,212,0.02)",
              }}
            />

            {/* Inner Orbit Ring */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl"
              style={{ width: innerSize, height: innerSize }}
            />

            {/* Center Info Card */}
            <div className="absolute left-1/2 top-1/2 w-[280px] lg:w-[300px] xl:w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/10 bg-slate-900/80 p-7 text-center shadow-[0_30px_70px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
              {/* Cyan Top Line */}
              <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#ff5d9f] to-transparent shadow-[0_0_15px_#ff5d9f]" />

              <p className="mb-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#ff5d9f]">
                {activeItem.label}
              </p>

              <h3 className="mb-4 text-[24px] xl:text-[26px] font-black leading-tight text-white">
                {activeItem.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-slate-400">
                {activeItem.description}
              </p>
            </div>

            {/* Orbiting Icon Nodes */}
            {items.map((item, index) => {
              const angle = (index / items.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full transition-all duration-500 z-20"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${isActive ? 1.15 : 1})`,
                  }}
                >
                  {/* Glowing Aura for Active Node */}
                  <span
                    className={`absolute inset-0 rounded-full blur-[24px] transition-all duration-500 ${
                      isActive ? "opacity-100 scale-125 bg-[#ff5d9f]/30" : "opacity-0"
                    }`}
                  />

                  {/* Icon Circle */}
                  <span
                    className={`relative z-10 flex h-full w-full items-center justify-center rounded-full border transition-all duration-500 ${
                      isActive
                        ? "border-[#ff5d9f] bg-[#ff5d9f] text-[#050816] shadow-[0_0_35px_rgba(255,93,159,0.4)]"
                        : "border-white/10 bg-slate-900 text-slate-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                </button>
              );
            })}
          </div>

          {/* MOBILE VIEW (CARDS) */}
          <div className="md:hidden w-full space-y-4">
            <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
              <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-[#ff5d9f]">
                {activeItem.label}
              </p>
              <h3 className="mb-4 text-[28px] font-bold text-white">{activeItem.title}</h3>
              <p className="text-slate-400 leading-relaxed">{activeItem.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                    activeIndex === index 
                      ? "bg-[#ff5d9f] border-[#ff5d9f] text-[#050816]" 
                      : "bg-white/5 border-white/5 text-slate-400"
                  }`}
                >
                  {item.icon}
                  <span className="text-[12px] font-bold uppercase tracking-tighter">{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT TEXT CONTENT */}
        <div className="max-w-[620px] order-1 lg:order-2 text-center lg:text-left mx-auto lg:mx-0">
          <div className="inline-block mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#ff5d9f]">
            Infrastructure Core
          </div>

          <h2 className="mb-6 text-[44px] sm:text-[56px] md:text-[68px] xl:text-[82px] font-black leading-[0.95] tracking-tight text-white">
            Clean cyan
            <br />
            <span className="bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] bg-clip-text text-transparent">
              token system
            </span>
          </h2>

          <p className="mb-10 text-[18px] md:text-[20px] leading-relaxed text-slate-400 max-w-[540px] mx-auto lg:mx-0">
            Advanced architectural nodes synchronized in a high-frequency orbital array. 
            Optimized for maximum throughput and seamless interaction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
            <button className="group flex h-[64px] items-center gap-3 rounded-full bg-gradient-to-r from-[#ff5d9f] to-[#16a3ac] px-10 text-[#050816] font-black tracking-widest transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(31,199,212,0.4)]">
              PURCHASE
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <div className="text-[13px] font-bold text-slate-500 border-l border-white/10 pl-5 tracking-wide">
              7 ACTIVE NODES <br /> IN REAL-TIME ORBIT
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Distribution;