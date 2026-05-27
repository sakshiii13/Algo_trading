import React from "react";
// import { Facebook, Twitter, Linkedin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { LiaLinkedin, LiaLinkedinIn } from "react-icons/lia";

const team = [
  {
    name: "Steven Gonzalez",
    role: "Founder & CEO",
    img: "/team1.jpg",
  },
  {
    name: "Paul Ward",
    role: "Chief Operational Officer",
    img: "/team2.jpg",
  },
  {
    name: "Walter Perry",
    role: "Lead Software Developer",
    img: "/team3.jpg",
  },
  {
    name: "Gregory Silva",
    role: "Software Architect",
    img: "/team4.jpg",
  },
];

const Team = () => {
  return (
    <section className="relative bg-[#050816] text-white py-24 md:py-32 overflow-hidden">
      
      {/* Background Neon Mist */}
      <div className="absolute top-[-100px] left-[-80px] w-[400px] h-[400px] bg-[#ff5d9f]/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] bg-[#7c5cff]/10 blur-[130px] rounded-full"></div>

      {/* Grid Lines - Deep Contrast */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-y-0 left-[25%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[50%] w-px bg-white/20"></div>
        <div className="absolute inset-y-0 left-[75%] w-px bg-white/20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter mb-4">
            Our Elite Team
          </h2>
          <div className="w-20 h-[4px] bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] mx-auto rounded-full shadow-[0_0_15px_#ff5d9f]"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {team.map((member, index) => {
            const accent =
              index % 2 === 0 ? "#ff5d9f" : "#7c5cff";

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center p-8 rounded-[35px] bg-white/[0.03] border border-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:-translate-y-4 hover:bg-white/[0.07] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* IMAGE CONTAINER */}
                <div className="relative w-48 h-48 mb-8">
                  {/* Outer Orbit Ring */}
                  <div 
                    className="absolute inset-[-8px] rounded-full border border-dashed opacity-20 group-hover:rotate-45 transition-transform duration-1000"
                    style={{ borderColor: accent }}
                  ></div>

                  {/* Profile Circle */}
                  <div
                    className="relative w-full h-full rounded-full overflow-hidden border-2 p-1 transition-all duration-500"
                    style={{ 
                        borderColor: accent,
                        boxShadow: `0 0 30px ${accent}33`
                    }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />

                    {/* Social Hover Overlay */}
                    <div className="absolute inset-0 bg-[#050816]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-[#ff5d9f] transition-colors">
                          <FaFacebook size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-[#ff5d9f] transition-colors">
                          <BsTwitter size={16} />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md hover:bg-[#ff5d9f] transition-colors">
                          <LiaLinkedinIn size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INFO */}
                <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-[#ff5d9f] transition-colors">
                  {member.name}
                </h3>
                
                <p
                  className="text-[12px] font-black uppercase tracking-[0.3em] mb-4"
                  style={{ color: accent }}
                >
                  {member.role}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed text-center opacity-80 group-hover:opacity-100 transition-opacity">
                  Architecting scalable solutions with over a decade of industry-leading experience.
                </p>

                {/* Bottom Accent Decor */}
                <div 
                    className="absolute bottom-6 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-[10] transition-all duration-700"
                    style={{ backgroundColor: accent }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;