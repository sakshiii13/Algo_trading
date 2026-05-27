import React from "react";
import { Shield, Coins, Zap } from "lucide-react";

const stats = [
  {
    id: 1,
    value: "75%",
    label: "Security",
    icon: <Shield size={38} strokeWidth={2} />,
    color: "#ff5d9f",
    glow: "shadow-[0_0_20px_rgba(255,93,159,0.3)]",
  },
  {
    id: 2,
    value: "150%",
    label: "Transparency",
    icon: <Coins size={38} strokeWidth={2} />,
    color: "#ffd55a",
    glow: "shadow-[0_0_20px_rgba(243,211,140,0.3)]",
  },
  {
    id: 3,
    value: "220%",
    label: "Efficiency",
    icon: <Zap size={38} strokeWidth={2} />,
    color: "#7c5cff",
    glow: "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
  },
];

const Grow = () => {
  return (
    <section
      className="relative overflow-hidden bg-[#050816] bg-fixed bg-center bg-cover text-white py-24 md:py-32"
      style={{ backgroundImage: "url('/back11.jpg')" }}
    >
      {/* Ambient Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050816]/80 via-[#070b1e]/70 to-[#050816]/80" />
      <div className="absolute top-0 left-0 h-full w-full opacity-60 bg-[radial-gradient(circle_at_top_left,_rgba(255,93,159,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(124,92,255,0.16),transparent_30%)]" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#ffd55a]">
              Network Velocity
            </div>

            <h2 className="mt-6 text-[42px] md:text-[64px] lg:text-[76px] font-black leading-[0.92] tracking-[-0.03em] text-white">
              Accelerate your
              <br />
              <span className="bg-gradient-to-r from-[#ff5d9f] via-[#ffd55a] to-[#7c5cff] bg-clip-text text-transparent">
                token growth.
              </span>
            </h2>

            <p className="mt-8 max-w-[640px] text-[18px] md:text-[20px] leading-[1.8] text-slate-400">
              Optimize your capital with high-speed liquidity rails, multi-layer security, and a token economy crafted for exponential momentum.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button className="inline-flex h-[60px] rounded-full bg-gradient-to-r from-[#ff5d9f] via-[#ffd55a] to-[#7c5cff] px-8 text-[15px] font-black text-[#050816] tracking-[0.12em] items-center transition duration-300 hover:scale-[1.02]">
                VIEW TOKENOMICS
              </button>
              <button className="inline-flex h-[60px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-[15px] font-semibold text-white transition duration-300 hover:border-[#ff5d9f]/40 hover:bg-white/10">
                JOIN THE LAUNCH
              </button>
            </div>
          </div>

          <div className="relative px-4 py-8 rounded-[40px] border border-white/10 bg-[#091126]/80 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
            <div className="absolute inset-0 rounded-[40px] bg-[linear-gradient(135deg,rgba(255,93,159,0.14),rgba(124,92,255,0.12),rgba(255,213,90,0.08))]" />
            <div className="relative z-10 grid gap-6">
              <div className="rounded-[30px] border border-white/10 bg-[#0b1021]/80 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Current Price</p>
                    <p className="mt-3 text-[42px] font-black text-white">$0.48</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.25em] text-[#ffd55a]">
                    +8.6%
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.id} className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-center">
                    <div className="flex items-center justify-center mb-5 h-[72px] w-[72px] rounded-[28px] bg-[#0b1021] mx-auto" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <p className="text-[30px] font-black text-white">{item.value}</p>
                    <p className="mt-2 text-[12px] uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[32px] border border-white/10 bg-[#050816]/80 p-6">
                <div className="mb-5 flex items-center justify-between text-[12px] uppercase tracking-[0.3em] text-slate-500">
                  <span>Allocation</span>
                  <span>100M total</span>
                </div>
                <div className="grid gap-4">
                  {[
                    { label: "Holder Rewards", percent: 32, color: "#ff5d9f" },
                    { label: "Liquidity Fund", percent: 28, color: "#7c5cff" },
                    { label: "Team Reserve", percent: 20, color: "#ffd55a" },
                    { label: "Ecosystem", percent: 20, color: "#16a3ac" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm font-semibold text-white mb-2">
                        <span>{item.label}</span>
                        <span>{item.percent}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.percent}%`, background: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Grow;
