import React from "react";
import { ShieldCheck, DollarSign, Sparkles, Globe } from "lucide-react";

const tokenMetrics = [
  {
    icon: <ShieldCheck size={24} />,
    label: "Audit Verified",
    value: "100%",
    accent: "#ff5d9f",
  },
  {
    icon: <DollarSign size={24} />,
    label: "Circulating Supply",
    value: "28M",
    accent: "#7c5cff",
  },
  {
    icon: <Sparkles size={24} />,
    label: "Staking APY",
    value: "18.8%",
    accent: "#ffd55a",
  },
  {
    icon: <Globe size={24} />,
    label: "Global Reach",
    value: "180+",
    accent: "#16a3ac",
  },
];

const Token = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,93,159,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(124,92,255,0.14),transparent_28%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050816] to-transparent" />

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#ff5d9f]">
              Token Utility
            </div>
            <h2 className="mt-6 text-[42px] md:text-[60px] lg:text-[72px] font-black leading-[0.92] tracking-[-0.03em]">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5d9f] via-[#ffd55a] to-[#7c5cff]">EDGE Token</span>
              <br /> is engineered to reward long-term holders.
            </h2>
            <p className="mt-8 text-[18px] md:text-[20px] leading-[1.85] text-slate-400 max-w-[580px]">
              Experience a token economy designed for deflationary momentum, community rewards, and cross-chain interoperability.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Governance", value: "DAO voting rights" },
                { label: "Staking", value: "Earn yield in crypto" },
                { label: "Liquidity", value: "Automated pool support" },
                { label: "Access", value: "Premium launch events" },
              ].map((item) => (
                <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="text-[13px] uppercase tracking-[0.3em] text-slate-500 mb-3">{item.label}</p>
                  <p className="text-[17px] font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[540px]">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-[#ff5d9f]/20 via-transparent to-[#7c5cff]/15 blur-3xl" />
            <div className="relative rounded-[40px] border border-white/10 bg-[#091126]/90 p-8 shadow-[0_35px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">TOKEN PRICE</p>
                  <p className="mt-3 text-[44px] font-black text-white">$0.48</p>
                </div>
                <div className="rounded-3xl bg-white/5 px-4 py-2 text-[12px] uppercase tracking-[0.25em] text-[#ffd55a]">
                  +8.6%
                </div>
              </div>

              <div className="grid gap-4">
                {tokenMetrics.map((item) => (
                  <div key={item.label} className="grid grid-cols-[auto_1fr] gap-4 items-center rounded-[28px] border border-white/10 bg-white/5 p-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl" style={{ color: item.accent }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[14px] uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
                      <p className="mt-2 text-[18px] font-black text-white">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-[32px] border border-white/10 bg-[#050816]/80 p-6">
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

export default Token;
