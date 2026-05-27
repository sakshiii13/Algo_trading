import React from "react";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    date: "August 10, 2025",
    title: "ICO Projection",
    description:
      "A comprehensive analysis of decentralized liquidity trends and 2026 market forecasts.",
  },
  {
    id: 2,
    date: "Sept 12, 2025",
    title: "The First Edge ICO",
    description:
      "Milestone reached: Our primary liquidity pool surpasses initial targets by 300%.",
  },
  {
    id: 3,
    date: "Oct 05, 2025",
    title: "Crypto is stable?",
    description:
      "Exploring the emergence of synthetic assets and their role in stabilizing the market.",
  },
];

const News = () => {
  return (
    <section className="relative bg-[#050816] overflow-hidden border-t border-white/5">
      
      {/* Background Kinetic Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#ff5d9f]/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7c5cff]/10 blur-[130px] rounded-full"></div>

      {/* Big Watermark Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[180px] md:text-[320px] font-black uppercase text-white/[0.02] tracking-tighter">
          news
        </h1>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 min-h-[650px]">
        {blogPosts.map((post, index) => {
          const accent =
            index === 0
              ? "#ff5d9f"
              : index === 1
              ? "#ffd55a"
              : "#7c5cff";

          return (
            <div
              key={post.id}
              className="group relative px-10 md:px-14 py-24 flex flex-col justify-center transition-all duration-500 hover:bg-white/[0.02]"
            >
              {/* Vertical Divider */}
              {index !== 0 && (
                <div className="hidden md:block absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}

              <div className="relative z-10 max-w-[340px]">
                {/* Meta Date */}
                <p className="text-slate-500 text-[12px] font-bold uppercase tracking-[0.3em] mb-6">
                  {post.date}
                </p>

                {/* Title */}
                <h2 className="text-white text-[28px] md:text-[36px] font-black leading-tight mb-8 transition-colors duration-300 group-hover:text-white">
                  {post.title}
                </h2>

                {/* Animated Accent Line */}
                <div
                  className="h-[4px] w-12 mb-8 rounded-full transition-all duration-500 ease-out group-hover:w-full group-hover:shadow-[0_0_15px_rgba(31,199,212,0.5)]"
                  style={{ background: accent }}
                ></div>

                {/* Description */}
                <p className="text-slate-400 text-[16px] leading-relaxed mb-10 group-hover:text-slate-200 transition-colors">
                  {post.description}
                </p>

                {/* Interaction Button */}
                <button className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 text-white group-hover:gap-5">
                  <span className="group-hover:text-[#ff5d9f] transition-colors">Read Article</span>
                  <ArrowRight 
                    size={18} 
                    className="transition-transform group-hover:translate-x-2" 
                    style={{ color: accent }}
                  />
                </button>
              </div>

              {/* Individual Bottom Glow for Mobile */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            </div>
          );
        })}
      </div>

      {/* Edge Polish Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </section>
  );
};

export default News;