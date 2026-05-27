import React from "react";
// import { Facebook, Twitter, Linkedin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { LiaLinkedinIn } from "react-icons/lia";

const team = [
  {
    name: "Steven Gonzalez",
    role: "Strategic Advisor",
    img: "/team1.jpg",
  },
  {
    name: "Paul Ward",
    role: "Legal Consultant",
    img: "/team2.jpg",
  },
  {
    name: "Walter Perry",
    role: "Financial Analyst",
    img: "/team3.jpg",
  },
  {
    name: "Gregory Silva",
    role: "Technical Advisor",
    img: "/team4.jpg",
  },
];

const Advisors = () => {
  return (
    <section className="relative bg-[#050816] text-white py-24 md:py-32 overflow-hidden">
      
      {/* Deep Space Accents */}
      <div className="absolute top-[-10%] left-[-5%] w-[450px] h-[450px] bg-[#ff5d9f]/10 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-[#ffd55a]/10 blur-[140px] rounded-full"></div>

      {/* Background Grid Structure */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-y-0 left-[25%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[50%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[75%] w-px bg-white/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-24">
          <h2 className="text-[42px] md:text-[60px] font-black tracking-tighter mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Advisory Board
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ff5d9f] via-[#ffd55a] to-[#ff5d9f] mx-auto rounded-full shadow-[0_0_15px_rgba(255,93,159,0.4)]"></div>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          
          {team.map((member, index) => {
            const accent =
              index % 2 === 0 ? "#ff5d9f" : "#ffd55a";

            return (
              <div key={index} className="group text-center relative">
                
                {/* IMAGE CIRCLE */}
                <div className="relative w-56 h-56 mx-auto mb-8">
                  
                  {/* Outer Glow Pulse */}
                  <div 
                    className="absolute inset-0 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{ background: accent }}
                  ></div>

                  {/* The Frame */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden border-[1px] p-2 transition-all duration-500"
                    style={{ 
                      borderColor: 'rgba(255,255,255,0.1)',
                      boxShadow: `inset 0 0 20px rgba(0,0,0,0.5)` 
                    }}
                  >
                    {/* Inner Neon Border */}
                    <div 
                        className="absolute inset-0 rounded-full border-2 opacity-40 group-hover:opacity-100 transition-opacity"
                        style={{ borderColor: accent }}
                    ></div>

                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Cyber Overlay */}
                    <div className="absolute inset-0 bg-[#050816]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <div className="flex gap-4">
                        <FaFacebook size={20} className="hover:text-[#ff5d9f] cursor-pointer transition-colors" />
                        <BsTwitter size={20} className="hover:text-[#ff5d9f] cursor-pointer transition-colors" />
                        <LiaLinkedinIn size={20} className="hover:text-[#ff5d9f] cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-2 tracking-tight">
                    {member.name}
                  </h3>

                  <p 
                    className="text-[11px] font-black uppercase tracking-[0.4em] mb-4 inline-block px-3 py-1 rounded border border-white/5 bg-white/5"
                    style={{ color: accent }}
                  >
                    {member.role}
                  </p>

                  <p className="text-slate-500 text-sm px-4 leading-relaxed group-hover:text-slate-300 transition-colors">
                    Global industry leader providing critical insights into market expansion and risk mitigation.
                  </p>
                </div>

                {/* Hover Background Decor */}
                <div className="absolute inset-0 -z-10 bg-white/[0.02] rounded-[40px] scale-90 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Edge Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#050816] to-transparent z-10 opacity-50"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#050816] to-transparent z-10 opacity-50"></div>
    </section>
  );
};

export default Advisors;