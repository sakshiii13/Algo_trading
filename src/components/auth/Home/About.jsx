import React from "react";
import { Play, ArrowUpRight } from "lucide-react";

const stats = [
  { value: "12K+", label: "Active Investors" },
  { value: "98%", label: "Secure Transactions" },
];

const leftList = ["Blockchain Strategy", "ICO Progress", "Financial Services"];
const rightList = ["Smart Contracts", "Token Growth", "Digital Security"];

const About = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] text-white py-20 md:py-28">
      {/* Premium Dark Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[#ff5d9f]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-[#7c5cff]/10 blur-[120px] rounded-full" />
        
        {/* Glowing Grid Lines */}
        {[8, 24, 40, 56, 72, 88].map((pos) => (
          <div 
            key={pos} 
            className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" 
            style={{ left: `${pos}%` }} 
          />
        ))}

        {/* Big Stylized Background Text */}
        <div className="absolute top-10 left-6 md:left-16 text-[110px] md:text-[200px] lg:text-[280px] font-black tracking-[-0.05em] leading-none select-none opacity-[0.03] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
          about
        </div>
      </div>

      <div className="relative z-10 max-w-[1380px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-14 lg:gap-20 items-center">
          
          {/* LEFT CONTENT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff5d9f]">
              Professional Scale
            </div>
            
            <h2 className="mt-6 text-[48px] md:text-[68px] lg:text-[76px] font-black leading-[0.92] tracking-[-0.04em] text-white">
              Built for the
              <br />
              <span className="bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] bg-clip-text text-transparent">future of crypto</span>
              <br />
              investment.
            </h2>

            <p className="mt-8 text-[20px] md:text-[24px] font-medium leading-[1.6] text-slate-300 max-w-[620px]">
              A refined digital ecosystem where blockchain strategy, secure
              finance, and token growth come together beautifully.
            </p>

            {/* Stats Section */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[620px]">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[28px] border border-white/5 bg-white/[0.03] backdrop-blur-md px-6 py-6 shadow-2xl"
                >
                  <h3 className="text-[32px] md:text-[38px] font-black text-white">
                    {item.value}
                  </h3>
                  <p className="text-[14px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Features Lists */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px]">
              {[leftList, rightList].map((list, i) => (
                <div
                  key={i}
                  className="rounded-[28px] border border-white/5 bg-white/[0.02] p-6"
                >
                  <div className="space-y-4">
                    {list.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`h-2 w-2 rounded-full ${i === 0 ? 'bg-[#ff5d9f] shadow-[0_0_8px_#ff5d9f]' : 'bg-[#7c5cff] shadow-[0_0_8px_#7c5cff]'}`} />
                        <span className="text-[16px] font-semibold text-slate-300">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff5d9f] to-[#ffd55a] px-8 py-5 text-[#070b1e] font-black tracking-widest text-[13px] transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_20px_40px_rgba(31,199,212,0.3)]">
              LEARN MORE
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>

          {/* RIGHT CONTENT - MEDIA CONTAINER */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[680px]">
              {/* Complex Glow Background */}
              <div className="absolute -top-10 -left-10 w-[250px] h-[250px] rounded-full bg-[#ff5d9f]/20 blur-[60px]" />
              <div className="absolute -bottom-10 -right-10 w-[250px] h-[250px] rounded-full bg-[#7c5cff]/20 blur-[60px]" />

              <div className="relative rounded-[40px] border border-white/10 bg-[#0b1021]/40 p-3 shadow-2xl backdrop-blur-xl">
                <div className="relative overflow-hidden rounded-[32px] aspect-[16/11] bg-slate-900">
                  <img
                    src="/ICO.jpg"
                    alt="About Vision"
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Subtle Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-white/5" />

                  <div className="absolute top-6 left-6 rounded-full border border-white/10 bg-[#050816]/40 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-[#ff5d9f] backdrop-blur-md">
                    CYBER CORE 1.0
                  </div>

                  {/* High-Tech Play Button */}
                  <button className="group absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/5 border border-white/20 backdrop-blur-xl transition-all hover:scale-110">
                    <div className="absolute inset-0 rounded-full bg-[#ff5d9f]/20 animate-ping" />
                    <Play
                      size={32}
                      className="relative z-10 ml-1 text-white fill-white transition-transform group-hover:scale-110"
                    />
                  </button>
                </div>
              </div>

              {/* Decorative Tech Elements */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="h-1.5 w-12 rounded-full bg-[#ff5d9f]" />
                <div className="h-1.5 w-3 rounded-full bg-white/20" />
                <div className="h-1.5 w-3 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;