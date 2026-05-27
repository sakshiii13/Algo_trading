import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) { clearInterval(interval); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050816] py-20 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,93,159,0.1),transparent_50%)]" />
      
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* UPPER CONTENT SECTION */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex mt-5 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.24em] text-[#ffd55a] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd55a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffd55a]"></span>
            </span>
            Exclusive Pre-Sale Live
          </div>

          <h1 className="mt-8 max-w-4xl text-[48px] font-black leading-[1] tracking-[-0.03em] sm:text-[72px] lg:text-[90px]">
            Launch your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5d9f] via-[#7c5cff] to-[#ffd55a]">future crypto empire</span> with premium tokenomics.
          </h1>

          <p className="mt-8 max-w-2xl text-[18px] text-slate-400 leading-relaxed">
            A next-gen launchpad built for visionary founders. Get instantly recognized, trade with confidence, and grow with an ultra-polished token experience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="h-[60px] min-w-[240px] rounded-full bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] font-bold tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,93,159,0.3)]">
              START INVESTING
            </button>
            <button className="h-[60px] min-w-[240px] rounded-full border border-white/10 bg-white/5 font-semibold hover:bg-white/10 transition-all">
              EXPLORE ROADMAP
            </button>
          </div>
        </div>

        {/* LOWER DASHBOARD SECTION */}
        <div className="mt-24 grid gap-6 lg:grid-cols-3">
          {/* Main Card */}
          <div className="lg:col-span-2 rounded-[40px] border border-white/10 bg-[#091126]/60 p-8 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <p className="text-[12px] uppercase tracking-[0.3em] text-[#ffd55a]">Live Presale</p>
                <h3 className="text-[40px] font-black mt-2">$0.45 <span className="text-[16px] text-slate-500 font-normal">/ Token</span></h3>
                <div className="mt-6 h-3 w-full max-w-md bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] w-[28%]" />
                </div>
                <p className="text-[12px] text-slate-500 mt-3 uppercase tracking-widest">28% Progress • 500M Supply</p>
              </div>
              
              {/* Countdown Timer */}
              <div className="bg-[#020617] rounded-3xl p-6 border border-white/5">
                <p className="text-[12px] text-slate-400 mb-4 uppercase tracking-widest">Presale ends in</p>
                <div className="grid grid-cols-4 gap-3 text-center">
                  {[time.days, time.hours, time.minutes, time.seconds].map((val, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold">{val}</div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest">
                        {['D', 'H', 'M', 'S'][i]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Column */}
          <div className="grid grid-rows-2 gap-6">
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-6 flex flex-col justify-center">
              <span className="text-slate-500 text-[12px] uppercase tracking-widest">Liquidity Boost</span>
              <span className="text-[32px] font-black">4.3x</span>
            </div>
            <div className="rounded-[40px] border border-white/10 bg-white/5 p-6 flex flex-col justify-center">
              <span className="text-slate-500 text-[12px] uppercase tracking-widest">Security Audit</span>
              <span className="text-[32px] font-black">100%</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;