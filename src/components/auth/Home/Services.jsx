import React from "react";
import { Database, ShieldCheck, Zap } from "lucide-react";

const features = [
  { 
    id: 1, 
    icon: Database, 
    title: "Virtual Database", 
    desc: "Lightning-fast, decentralized storage architecture built for scale.",
    gradient: "from-[#ff5d9f] to-[#ff8c00]" 
  },
  { 
    id: 2, 
    icon: ShieldCheck, 
    title: "Secured Money", 
    desc: "Iron-clad smart contract protocols ensuring 24/7 asset safety.",
    gradient: "from-[#7c5cff] to-[#3b82f6]" 
  },
  { 
    id: 3, 
    icon: Zap, 
    title: "Smart Integration", 
    desc: "Seamlessly bridge your assets across multiple blockchain networks.",
    gradient: "from-[#ffd55a] to-[#ffcc00]" 
  },
];

const Services = () => {
  return (
    <section className="relative py-24 bg-[#050816] overflow-hidden">
      {/* Absolute Decorative Background */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#ff5d9f]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#7c5cff]/10 blur-[150px] rounded-full" />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((item) => (
            <div 
              key={item.id} 
              className="group relative bg-[#091126]/40 p-[1px] rounded-[30px] hover:scale-[1.02] transition-all duration-500"
            >
              {/* Outer Glow Border */}
              <div className={`absolute inset-0 rounded-[30px] bg-gradient-to-br ${item.gradient} opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              <div className="bg-[#050816] rounded-[29px] p-8 h-full flex flex-col items-start border border-white/5">
                
                {/* Icon Box */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} blur-[12px] opacity-20 group-hover:opacity-40`} />
                  <div className="relative w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="text-white w-8 h-8" />
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-[15px] leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Bottom Link Style */}
                <button className="mt-auto flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.2em] text-white hover:text-[#ff5d9f] transition-colors">
                  Explore <span className="text-[20px]">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;