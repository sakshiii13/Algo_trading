import React from "react";

const roadmapData = [
  {
    id: 1,
    quarter: "Q3 2017",
    title: "London Office",
    desc: "Aliquam lorem ante, dapibus in, viverra quis.",
  },
  {
    id: 2,
    quarter: "Q4 2017",
    title: "New Startup",
    desc: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    id: 3,
    quarter: "Q1 2018",
    title: "Move Forward",
    desc: "Aliquam lorem ante dapibus in viverra quis feugiat.",
  },
  {
    id: 4,
    quarter: "Q2 2018",
    title: "Indian Market",
    desc: "Aliquam lorem ante dapibus in viverra.",
  },
  {
    id: 5,
    quarter: "Q1 2019",
    title: "Future is Now",
    desc: "Aliquam lorem ante dapibus in viverra quis.",
  },
];

const desktopData = [
  { ...roadmapData[0], position: "top", left: "12%" },
  { ...roadmapData[1], position: "bottom", left: "30%" },
  { ...roadmapData[2], position: "top", left: "49%" },
  { ...roadmapData[3], position: "bottom", left: "67%" },
  { ...roadmapData[4], position: "top", left: "85%" },
];

const Roadmap = () => {
  return (
    <section className="relative bg-[#050816] text-white overflow-hidden py-16 md:py-20 xl:py-32">
      {/* Cinematic Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#ff5d9f]/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#7c5cff]/10 blur-[130px] rounded-full"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 hidden lg:block opacity-[0.03]">
        {[12, 24, 36, 48, 60, 72, 84].map((pos, i) => (
          <div
            key={i}
            className="absolute inset-y-0 w-px bg-white"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      {/* Massive Background Title */}
      <div className="absolute inset-0 flex justify-center pointer-events-none select-none">
        <h1 className="text-[90px] sm:text-[130px] md:text-[170px] lg:text-[240px] xl:text-[320px] font-black text-white/[0.02] uppercase mt-10">
          roadmap
        </h1>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[36px] sm:text-[48px] md:text-[60px] font-black tracking-tighter">
            Roadmap
          </h2>
          <div className="w-20 h-[4px] bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] mx-auto mt-4 rounded-full shadow-[0_0_15px_#ff5d9f]"></div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden relative max-w-2xl mx-auto">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>

          <div className="space-y-10">
            {roadmapData.map((item, index) => {
              const accent = index % 2 === 0 ? "#ff5d9f" : "#7c5cff";
              return (
                <div key={item.id} className="relative pl-12 sm:pl-16 group">
                  <div
                    className="absolute left-0 top-6 w-8 h-8 rounded-full border-2 bg-[#050816] z-10 transition-all duration-300 group-hover:scale-110"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 20px ${accent}66`,
                    }}
                  ></div>

                  <div className="rounded-[28px] bg-white/5 border border-white/10 p-6 backdrop-blur-xl shadow-2xl transition-all group-hover:bg-white/10">
                    <p className="text-[14px] font-black tracking-widest mb-2 uppercase" style={{ color: accent }}>
                      {item.quarter}
                    </p>
                    <h3 className="text-[20px] font-bold mb-3 text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-[15px] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:block relative h-[700px]">
          {/* Main Horizontal Neon Line */}
          <div className="absolute top-1/2 left-[5%] right-[5%] -translate-y-1/2">
            <div className="relative h-[2px] bg-white/10 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff5d9f] via-[#7c5cff] to-[#ff5d9f] rounded-full shadow-[0_0_20px_#ff5d9faa]"></div>
            </div>
          </div>

          {desktopData.map((item, index) => {
            const accent = index % 2 === 0 ? "#ff5d9f" : "#7c5cff";

            return (
              <div
                key={item.id}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: item.left }}
              >
                <div className="relative flex flex-col items-center group">
                  {item.position === "top" && (
                    <>
                      <div className="mb-14 w-[260px] xl:w-[320px] rounded-[30px] bg-slate-900/60 border border-white/5 p-7 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:bg-slate-800/80 group-hover:border-white/20">
                        <h3 className="text-[20px] xl:text-[22px] font-bold mb-3 text-white">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-[14px] leading-relaxed group-hover:text-slate-200 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                      <div className="w-px h-14 bg-gradient-to-b from-white/20 to-transparent" />
                    </>
                  )}

                  {/* Pulsing Node */}
                  <div
                    className="relative z-10 w-8 h-8 rounded-full border-2 bg-[#050816] transition-all duration-500 group-hover:scale-125"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 25px ${accent}`,
                    }}
                  >
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20`} style={{ backgroundColor: accent }}></div>
                  </div>

                  {item.position === "bottom" && (
                    <>
                      <div className="w-px h-14 bg-gradient-to-t from-white/20 to-transparent" />
                      <div className="mt-14 w-[260px] xl:w-[320px] rounded-[30px] bg-slate-900/60 border border-white/5 p-7 backdrop-blur-2xl shadow-2xl transition-all duration-500 group-hover:translate-y-4 group-hover:bg-slate-800/80 group-hover:border-white/20">
                        <h3 className="text-[20px] xl:text-[22px] font-bold mb-3 text-white">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-[14px] leading-relaxed group-hover:text-slate-200 transition-colors">
                          {item.desc}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Quarter Label */}
                  <p
                    className={`absolute text-[13px] font-black uppercase tracking-[0.3em] ${
                      item.position === "top"
                        ? "top-[54%] mt-8"
                        : "bottom-[54%] mb-8"
                    }`}
                    style={{ color: accent, textShadow: `0 0 10px ${accent}55` }}
                  >
                    {item.quarter}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;