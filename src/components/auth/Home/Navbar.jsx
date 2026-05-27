import { useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { mainContant } from "../../../constant/MainContant";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "HOME", id: "home" },
    { name: "ABOUT", id: "about" },
    { name: "SERVICES", id: "services" },
    { name: "ROADMAP", id: "roadmap" },
  ];

  const handleScroll = (id) => {
    
    if (location.pathname !== "/") {
      navigate("/");
      
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
     
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[999] px-4 pt-6">
      <div className="max-w-[1200px] mx-auto bg-[#070b1e]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
              <img src={mainContant.logo} alt="logo" className="h-12 w-12 object-contain" />
            </div>
            <span className="text-white/40 font-bold text-[10px] uppercase tracking-[0.2em] hidden sm:block">
              {mainContant.appName}
            </span>
          </div>

          <ul className="hidden xl:flex items-center gap-2">
            {menu.map((item) => (
              <li key={item.name} className="group relative">
                <button 
                  onClick={() => handleScroll(item.id)}
                  className="relative px-5 py-6 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 hover:text-white transition-all"
                >
                  {item.name}
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#ff5d9f] transition-all duration-300 group-hover:w-6" />
                </button>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => navigate("/login")} 
            className="relative h-12 px-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] text-[10px] font-black uppercase tracking-[0.3em] text-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,93,159,0.4)]"
          >
            Login <ArrowUpRight size={14} className="ml-2" />
          </button>
        </div>
      </div>
    </nav>
  );
}