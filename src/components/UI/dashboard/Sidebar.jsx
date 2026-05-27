import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { sidebarMenu } from "../../../constant/sidebarMenu";
import { FaBars } from "react-icons/fa";
import { ChevronLeft, ChevronRight, LayoutGrid, Terminal } from "lucide-react";
import { useSelector } from "react-redux";
import { mainContant } from "../../../constant/MainContant";

const Sidebar = () => {
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openMenu, setOpenMenu] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const storedRole = sessionStorage.getItem("role") || "user";
  const role = storedRole.toLowerCase();
  const menuList = sidebarMenu[role] || [];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile Menu Trigger */}
      {isMobile && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-6 z-[999] bg-slate-950/80 text-slate-100 p-2.5 rounded-xl border border-slate-800 backdrop-blur-md shadow-xl transition-all active:scale-95"
        >
          <FaBars size={16} />
        </button>
      )}

      {/* Mobile Overlay Background */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          bg-slate-950/60 backdrop-blur-2xl text-slate-300
          border-r border-slate-900 shadow-2xl
          transition-all duration-300 ease-in-out
          ${isMobile ? "fixed z-[999] h-screen top-0 left-0" : "h-full"}
          ${isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"}
        `}
        style={{ width: !isMobile && collapse ? "80px" : "260px" }}
      >
        {/* ── LOGO/BRAND ZONE ── */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-slate-900">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={mainContant.logo}
              alt={mainContant.appName}
              className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-slate-800 p-1"
            />
            {!collapse && (
              <div className="animate-in fade-in duration-300">
                <h1 className="text-sm font-bold font-mono text-white tracking-tight">
                  {mainContant.appName}
                </h1>
                <p className="text-[9px] font-bold font-mono uppercase tracking-[0.2em] text-indigo-400">
                  SYSTEM_CORE
                </p>
              </div>
            )}
          </div>

          {!isMobile && (
            <button
              onClick={() => setCollapse(!collapse)}
              className="text-slate-500 hover:text-indigo-400 p-1.5 rounded-lg hover:bg-slate-900/50 transition-colors"
            >
              {collapse ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          )}
        </div>

        {/* ── INTERACTIVE OPERATOR PROFILE CARD ── */}
        {!collapse && (
          <div 
            onClick={() => {
              navigate("/profile");
              if (isMobile) setMobileOpen(false);
            }}
            className="group mx-3 my-4 p-3 bg-slate-900/20 hover:bg-slate-900/50 border border-slate-900/60 hover:border-indigo-500/20 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-300 shadow-inner"
          >
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                className="w-9 h-9 rounded-lg object-cover border border-slate-800 group-hover:border-indigo-500/40 transition-colors"
                alt="profile"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold font-mono text-sm group-hover:bg-indigo-500/20 transition-colors">
                {user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
            )}

            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-slate-200 font-mono truncate group-hover:text-indigo-300 transition-colors">
                {user?.name || "Anonymous"}
              </p>
              <p className="text-[10px] font-mono text-slate-500 capitalize flex items-center gap-1 mt-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                {role}
              </p>
            </div>
          </div>
        )}

        {collapse && (
          <div className="flex justify-center my-4">
            <button 
              onClick={() => navigate("/profile")}
              className="p-2 bg-slate-900/30 border border-slate-900 rounded-xl text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Terminal size={16} />
            </button>
          </div>
        )}

        {/* ── NAVIGATION INTERFACES ── */}
        <nav className="px-3 py-2 space-y-1">
          {menuList.map((item, index) => {
            const Icon = item.icon || LayoutGrid;
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.title} className="space-y-0.5">
                {/* Parent Menu Node */}
                {hasChildren ? (
                  <div
                    onClick={() =>
                      setOpenMenu(openMenu === index ? null : index)
                    }
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer font-mono text-xs font-medium
                      transition-all duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent hover:border-slate-900
                      ${collapse ? "justify-center" : ""}
                      ${openMenu === index && !collapse ? "bg-slate-900/20 text-slate-200" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={openMenu === index && !collapse ? "text-indigo-400" : "text-slate-400"} />
                      {!collapse && <span>{item.title}</span>}
                    </div>

                    {!collapse && (
                      <span className={`text-[10px] transition-transform duration-200 text-slate-500 ${openMenu === index ? "rotate-90 text-indigo-400" : ""}`}>
                        ▶
                      </span>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => isMobile && setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 border
                      ${collapse ? "justify-center" : ""}
                      ${
                        isActive
                          ? "bg-indigo-500/10 text-indigo-400 font-bold border-indigo-500/20 shadow-[inset_0_1px_12px_rgba(99,102,241,0.05)]"
                          : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-900/40 hover:border-slate-900/50"
                      }`
                    }
                  >
                    <Icon size={16} />
                    {!collapse && <span>{item.title}</span>}
                  </NavLink>
                )}

                {/* Submenu Dropdown List */}
                {hasChildren && openMenu === index && !collapse && (
                  <div className="ml-4 pl-3 border-l border-slate-900/80 mt-1 space-y-0.5 animate-in slide-in-from-top-1 duration-200">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.title}
                        to={child.path}
                        onClick={() => isMobile && setMobileOpen(false)}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-lg text-[11px] font-mono transition-all duration-200 border
                          ${
                            isActive
                              ? "bg-slate-900 text-indigo-400 font-bold border-slate-800"
                              : "text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-900/20"
                          }`
                        }
                      >
                        {child.title}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;