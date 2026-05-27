import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaFacebookF,
  FaVimeoV,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-[#050816] text-white overflow-hidden border-t border-white/5">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-[#ff5d9f]/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[-100px] right-[-80px] w-[300px] h-[300px] bg-[#7c5cff]/10 blur-[130px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-16">
          
          {/* BRAND BLOCK */}
          <div>
            <h1 className="text-[36px] font-black tracking-tighter mb-8 italic">
              EDGE<span className="text-[#ff5d9f]">.</span>
            </h1>

            <p className="text-slate-500 text-[15px] leading-relaxed max-w-[260px] mb-10">
              Leading the decentralization movement with high-velocity liquidity and military-grade security.
            </p>

            {/* Social Nodes */}
            <div className="flex flex-wrap gap-3">
              {[
                FaFacebookF,
                FaTwitter,
                FaLinkedin,
                FaVimeoV,
                FaInstagram,
                FaGithub,
              ].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:border-[#ff5d9f]/50 transition-all duration-300 group cursor-pointer"
                >
                  <Icon className="text-slate-400 group-hover:text-[#ff5d9f] transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#ff5d9f] mb-8">
              Ecosystem
            </h3>
            <ul className="space-y-4 text-slate-400 text-[15px] font-medium">
              {[
                "Token Sales",
                "Roadmap",
                "Governance",
                "Infrastructure",
                "Edge Wallet",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-white transition-all cursor-pointer flex items-center group"
                >
                  <span className="w-0 h-[1px] bg-[#ff5d9f] group-hover:w-4 transition-all mr-0 group-hover:mr-3 opacity-0 group-hover:opacity-100"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#ff5d9f] mb-8">
              Intelligence
            </h3>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-6">
              Connect with our specialized team for strategic partnership inquiries.
            </p>
            <p className="text-white font-bold text-[15px] border-l-2 border-[#ff5d9f] pl-4">
              ops@edge-token.io
            </p>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#ff5d9f] mb-8">
              Transmission
            </h3>
            <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
              Join 50k+ users receiving weekly protocol updates.
            </p>

            <div className="relative group">
              <input
                type="email"
                placeholder="Secure Email Address"
                className="w-full h-[56px] rounded-2xl bg-white/5 border border-white/10 px-6 pr-14 text-white placeholder:text-slate-600 outline-none focus:border-[#ff5d9f]/50 transition-all"
              />
              <button className="absolute right-2 top-2 w-[40px] h-[40px] rounded-xl bg-[#ff5d9f] text-[#050816] flex items-center justify-center hover:scale-105 transition shadow-[0_0_20px_rgba(255,93,159,0.3)] group-hover:shadow-[0_0_30px_rgba(31,199,212,0.5)]">
                <span className="text-xl font-bold">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[13px] font-medium tracking-wide">
            © 2026 <span className="text-white">EDGE PROTOCOL</span>. 
            ENCRYPTED BY <span className="text-[#ff5d9f]">BITPAL</span>.
          </p>

          <div className="flex gap-8 text-slate-500 text-[13px] font-bold uppercase tracking-widest">
            <span className="hover:text-white cursor-pointer transition-colors">
              Legal
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;