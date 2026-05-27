import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";

const slides = [
  {
    text: "The architectural integrity of this platform is unmatched. We've scaled our operations by 300% without a single millisecond of downtime.",
    name: "Alice Adams",
    role: "Lead Engineer",
    avatar: "/alice.png",
  },
  {
    text: "Integrating the token system was seamless. The UI feels like it's from a decade into the future, but it works perfectly today.",
    name: "John Doe",
    role: "Full Stack Developer",
    avatar: "/boy.png",
  },
];

const SliderSection = () => {
  const [index, setIndex] = useState(0);

  return (
    <section className="relative py-32 bg-[#050816] overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#ff5d9f] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#7c5cff] rounded-full blur-[150px] opacity-10" />

      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-[0.2em] text-[#ffd55a]">
              <Sparkles size={12} /> Trusted by experts
            </div>
            <h2 className="text-[50px] md:text-[70px] font-black text-white leading-[0.9]">
              Verified <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff]">Impact.</span>
            </h2>
          </div>

          <div className="flex gap-4">
            <button onClick={() => setIndex(index === 0 ? slides.length - 1 : index - 1)} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#ff5d9f] hover:border-[#ff5d9f] transition-all"><ChevronLeft /></button>
            <button onClick={() => setIndex(index === slides.length - 1 ? 0 : index + 1)} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#ff5d9f] hover:border-[#ff5d9f] transition-all"><ChevronRight /></button>
          </div>
        </div>

        {/* The Card */}
        <div className="relative group p-1 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent">
          <div className="bg-[#0b1021] rounded-[39px] p-10 md:p-16 border border-white/5 shadow-2xl">
            
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
              
              {/* Image Side */}
              <div className="relative">
                <div className="aspect-square rounded-[30px] overflow-hidden border border-white/10 bg-slate-900 shadow-inner">
                   <img src={slides[index].avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Author" />
                </div>
                <div className="absolute -bottom-4 -left-4 p-4 bg-[#ff5d9f] rounded-2xl shadow-xl">
                   <Quote className="text-white" size={24} />
                </div>
              </div>

              {/* Text Side */}
              <div className="space-y-10">
                <p className="text-[22px] md:text-[30px] text-slate-300 leading-relaxed font-light italic">
                  "{slides[index].text}"
                </p>
                
                <div className="flex justify-between items-center border-t border-white/10 pt-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{slides[index].name}</h3>
                    <p className="text-[#7c5cff] font-semibold text-sm tracking-widest uppercase">{slides[index].role}</p>
                  </div>
                  
                  {/* Slider Dots */}
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <div key={i} className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-[#ff5d9f]' : 'w-2 bg-white/20'}`} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SliderSection;