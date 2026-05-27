import React from "react";

const partners = [
  { id: 1, src: "/c1.png" },
  { id: 2, src: "/c2.png" },
  { id: 3, src: "/c3.png" },
  { id: 4, src: "/c4.png" },
  { id: 5, src: "/c5.png" },
  { id: 6, src: "/c6.png" },
  { id: 7, src: "/c7.png" },
  { id: 8, src: "/c8.png" },
  { id: 9, src: "/c9.png" },
  { id: 10, src: "/c10.png" },
  { id: 11, src: "/c11.png" },
  { id: 12, src: "/c12.png" },
];

const Partners = () => {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 md:py-32">
      
      {/* Background Texture & Overlay */}
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center opacity-10 grayscale mix-blend-overlay"
        style={{ backgroundImage: "url('/bg2.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816]"></div>

      {/* Atmospheric Glows */}
      <div className="absolute top-[-100px] left-[-50px] w-[350px] h-[350px] bg-[#ff5d9f]/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-50px] w-[350px] h-[350px] bg-[#ffd55a]/10 blur-[130px] rounded-full"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* Heading & Meta */}
        <div className="mb-20">
          <div className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[#ff5d9f] text-[11px] font-black uppercase tracking-[0.4em] mb-6">
            Global Ecosystem
          </div>
          <h2 className="text-[42px] md:text-[60px] font-black text-white tracking-tighter italic">
            TRUSTED BY <span className="text-white/40">INDUSTRY GIANTS</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#ff5d9f] to-transparent mx-auto mt-6 opacity-50"></div>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-x-20 gap-y-16 lg:gap-x-28 lg:gap-y-20">
          {partners.map((item, index) => {
            const accent =
              index % 3 === 0
                ? "#ff5d9f"
                : index % 3 === 1
                ? "#ffd55a"
                : "#7c5cff";

            return (
              <div key={item.id} className="group relative flex items-center justify-center">
                
                {/* Individual Hover Spotlight */}
                <div
                  className="absolute inset-0 blur-[45px] opacity-0 group-hover:opacity-30 transition-all duration-700 scale-150"
                  style={{ background: accent }}
                ></div>

                {/* Logo Image */}
                <img
                  src={item.src}
                  alt={`Partner ${item.id}`}
                  className="relative h-[48px] md:h-[58px] w-auto object-contain transition-all duration-500
                  filter brightness-0 invert opacity-40
                  group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 
                  group-hover:scale-110"
                />
                
                {/* Micro Decoration for Hover */}
                <div 
                  className="absolute -bottom-4 w-0 h-[2px] bg-white transition-all duration-500 group-hover:w-full opacity-0 group-hover:opacity-20"
                  style={{ backgroundColor: accent }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subtle Divider Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
    </section>
  );
};

export default Partners;