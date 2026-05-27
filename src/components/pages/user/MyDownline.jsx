import React, { useEffect, useState } from "react";
import { getMyDownline } from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import {
  Users,
  Share2,
  Activity,
  UserRound,
  Mail,
  BadgeCheck,
  Zap,
  Layers,
  ArrowUpRight
} from "lucide-react";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";

const MyDownline = () => {
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState(null);
  const [downlines, setDownlines] = useState([]);

  useEffect(() => {
    const fetchDownlines = async () => {
      dispatch(showLoader());
      try {
        const response = await getMyDownline();
        const apiData = response?.data;
        setUserInfo(apiData || null);
        setDownlines(Array.isArray(apiData?.downline) ? apiData.downline : []);
      } catch (err) {
        console.error("Downline fetch error:", err);
        setUserInfo(null);
        setDownlines([]);
      } finally {
        dispatch(hideLoader());
      }
    };
    fetchDownlines();
  }, [dispatch]);

  // मॉडर्न ग्लॉसी टेबल कॉलम्स डिज़ाइन
  const columns = [
    {
      header: "User Identity",
      accessor: "name",
      render: (value) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#ff5d9f]/20 to-[#6a98e0]/10 border border-[#ff5d9f]/20 flex items-center justify-center text-[#ff5d9f] shadow-[0_0_15px_rgba(255,93,159,0.1)]">
            <UserRound size={16} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm tracking-wide">
              {value || "Anonymous Node"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Sub-Network Member</span>
          </div>
        </div>
      ),
    },
    {
      header: "Secure Email",
      accessor: "email",
      render: (value) => (
        <div className="flex items-center gap-2 text-slate-300 font-medium text-xs">
          <Mail size={13} className="text-slate-500" />
          <span className="hover:text-[#6a98e0] transition-colors cursor-pointer">{value || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Referral Code",
      accessor: "referralCode",
      render: (value) => (
        <span className="font-mono text-[#ff5d9f] bg-[#ff5d9f]/5 border border-[#ff5d9f]/15 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider shadow-inner">
          {value || "N/A"}
        </span>
      ),
    },
    {
      header: "Connections",
      accessor: "downline",
      render: (value) => {
        const count = Array.isArray(value) ? value.length : 0;
        return (
          <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
            count > 0 
              ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]" 
              : "text-slate-500 bg-slate-900/40 border-slate-800"
          }`}>
            {count} {count === 1 ? "Node" : "Nodes"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#030712] space-y-8 text-slate-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#ff5d9f]/10 rounded-xl border border-[#ff5d9f]/20">
                <Share2 size={18} className="text-[#ff5d9f]" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                Network <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">Hierarchy</span>
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500 tracking-wide">
              Manage and track all sub-level affiliates connected through your network hub.
            </p>
          </div>
          
          {/* Live Status Pill */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-850 px-4 py-2 rounded-2xl w-fit shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Gateway Active</span>
          </div>
        </div>

        {/* ── INFO CARD & STATS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main User Card (Premium Glossy Design) */}
          <div className="lg:col-span-2 bg-gradient-to-b from-slate-950/60 to-slate-950/20 border border-slate-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl backdrop-blur-md">
            {/* Ambient Backlight Accent */}
            <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#6a98e0]/10 blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
            
            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4.5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#6a98e0]/20 to-[#ff5d9f]/5 border border-[#6a98e0]/20 flex items-center justify-center text-[#6a98e0] shadow-xl">
                  <UserRound size={26} />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Primary Operator</span>
                  <h3 className="text-xl font-black text-white tracking-wide">
                    {userInfo?.name || "Loading Node..."}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {userInfo?.email || "fetching_identity..."}
                  </p>
                </div>
              </div>

              {/* Referral Code Box */}
              <div className="bg-slate-950/80 border border-slate-900/80 rounded-2xl p-3 px-4 flex flex-col sm:items-end gap-1 shadow-inner min-w-[150px]">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Your Signature Code</span>
                <span className="font-mono text-sm font-bold text-[#ff5d9f] tracking-wide">
                  {userInfo?.referralCode || "----"}
                </span>
              </div>
            </div>
          </div>

          {/* Active Downline Counter Card */}
          <div className="bg-gradient-to-b from-slate-950/60 to-slate-950/20 border border-slate-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div className="absolute -right-4 -bottom-4 text-slate-900/10 pointer-events-none select-none group-hover:scale-110 transition-transform duration-500">
              <Layers size={120} />
            </div>

            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Network Volume</span>
                <h4 className="text-xs font-bold text-slate-300 uppercase">Active Downlines</h4>
              </div>
              <div className="p-2.5 bg-[#ff5d9f]/10 rounded-xl border border-[#ff5d9f]/15 text-[#ff5d9f]">
                <Users size={18} />
              </div>
            </div>

            <div className="flex items-baseline gap-3 mt-4 relative z-10">
              <p className="text-4xl font-black text-white tracking-tight">
                {downlines.length.toString().padStart(2, "0")}
              </p>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-lg shadow-sm">
                <Activity size={12} className="animate-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIRECTORY DATA TABLE ── */}
        <div className="bg-gradient-to-b from-slate-950/40 to-slate-950/10 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md p-2">
          <div className="px-4 py-3 border-b border-slate-900/60 flex items-center gap-2">
            <Zap size={14} className="text-[#ff5d9f]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gateway Directory Logs</h3>
          </div>
          <TableComponent
            title=""
            columns={columns}
            data={downlines}
            showSearch={true}
          />
        </div>

        {/* ── EMPTY DATA STATE ── */}
        {downlines.length === 0 && (
          <div className="bg-slate-950/20 border border-slate-900 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-inner relative group hover:border-[#ff5d9f]/20 transition-colors">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500 group-hover:text-[#ff5d9f] transition-colors">
              <BadgeCheck size={24} />
            </div>
            <h3 className="text-base font-bold text-white">No Affiliates Discovered</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
              Abhi aapke referral network me koi user connected nahi hai। Grid expansion link share karein।
            </p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </div>
  );
};

export default MyDownline;