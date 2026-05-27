import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { mainContant } from "../../../constant/MainContant";

export default function Navbar() {
  const [active, setActive] = useState("HOME");
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  const menu = [
    { name: "HOME", items: ["Home 1", "Home 2", "Home 3"] },
    { name: "PAGES", items: ["About", "Team", "FAQ", "Pricing"] },
    { name: "CURRENCIES", items: ["Bitcoin", "Ethereum", "Litecoin"] },
    { name: "PORTFOLIO", items: ["Grid", "Masonry", "Details"] },
    { name: "BLOG", items: ["Standard", "List", "Single Post"] },
    { name: "SHOP", items: ["Products", "Cart", "Checkout"] },
    { name: "ELEMENTS", items: ["Buttons", "Cards", "Typography"] },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[999]">
        <div className="absolute inset-0 bg-[#070b1e]/85 backdrop-blur-2xl border-b border-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,93,159,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(124,92,255,0.12),transparent_30%)] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-white/10 border border-white/10 shadow-[0_12px_40px_rgba(255,93,159,0.08)]">
                <img src={mainContant.logo} alt={mainContant.appName} className="h-10 w-10" />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-lg font-black tracking-[0.3em] text-white uppercase">{mainContant.appName}</span>
                <span className="text-[11px] uppercase tracking-[0.35em] text-slate-400">Decentralized Edge</span>
              </div>
            </div>

            <ul className="hidden xl:flex items-center gap-6">
              {menu.map((menuItem) => (
                <li
                  key={menuItem.name}
                  className="relative"
                  onMouseEnter={() => setOpen(menuItem.name)}
                  onMouseLeave={() => setOpen(null)}
                >
                  <button
                    onClick={() => setActive(menuItem.name)}
                    className={`group flex items-center gap-2 text-[13px] font-semibold tracking-[0.2em] transition ${
                      active === menuItem.name ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {menuItem.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        open === menuItem.name ? "rotate-180 text-[#ff5d9f]" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`absolute left-1/2 top-[calc(100%+18px)] w-[320px] -translate-x-1/2 rounded-[32px] border border-white/10 bg-[#090b16]/95 backdrop-blur-3xl p-5 shadow-[0_35px_100px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                      open === menuItem.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-3"
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-[#7c5cff] mb-2">{menuItem.name}</p>
                        <h3 className="text-base font-black text-white">Explore the {menuItem.name.toLowerCase()} hub</h3>
                      </div>
                      <div className="h-12 w-12 rounded-2xl bg-[#ff5d9f]/10 border border-[#ff5d9f]/20 grid place-items-center text-[#ff5d9f]">
                        <ChevronDown size={18} />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {menuItem.items.map((sub, i) => (
                        <button
                          key={i}
                          className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-[#ff5d9f]/30 hover:bg-[#ff5d9f]/10"
                        >
                          <div>
                            <p className="text-sm font-semibold text-white">{sub}</p>
                            <p className="text-[11px] text-slate-400">Open the {sub.toLowerCase()} panel</p>
                          </div>
                          <ArrowUpRight size={16} className="text-[#ff5d9f]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/login")}
                className="hidden md:inline-flex h-[50px] items-center justify-center rounded-full bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] px-8 text-sm font-black uppercase tracking-[0.2em] text-[#070b1e] shadow-[0_12px_40px_rgba(124,92,255,0.2)] transition hover:-translate-y-0.5"
              >
                LOGIN
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white shadow-[0_10px_30px_rgba(255,93,159,0.12)]"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-[998] xl:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible bg-[#050816]/70 backdrop-blur-sm" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-[86%] max-w-[360px] z-[999] xl:hidden transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="relative h-full border-l border-white/10 bg-[#070b1e] p-6 pt-24 overflow-y-auto">
          <div className="mb-8 px-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid place-items-center h-12 w-12 rounded-2xl bg-white/10 border border-white/10">
                <img src={mainContant.logo} alt={mainContant.appName} className="h-8 w-8" />
              </div>
              <div>
                <p className="text-lg font-black uppercase tracking-[0.3em] text-white">EDGE</p>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Decentralized Edge</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Explore the new dashboard experience with clean navigation and premium motion.</p>
          </div>

          <ul className="space-y-4">
            {menu.map((menuItem) => (
              <li key={menuItem.name} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  onClick={() => setOpen(open === menuItem.name ? null : menuItem.name)}
                  className="w-full px-5 py-4 flex items-center justify-between text-white font-semibold text-[14px]"
                >
                  {menuItem.name}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      open === menuItem.name ? "rotate-180 text-[#ff5d9f]" : "text-slate-500"
                    }`}
                  />
                </button>
                <div className={`grid transition-all duration-300 ${open === menuItem.name ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <ul className="px-5 pb-4 space-y-2">
                      {menuItem.items.map((sub, i) => (
                        <li key={i} className="rounded-2xl px-4 py-3 text-slate-300 bg-[#0f1325] text-[13px] font-medium">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/login")}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#ff5d9f] to-[#7c5cff] px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-[#070b1e] shadow-[0_15px_40px_rgba(124,92,255,0.2)]"
          >
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
}