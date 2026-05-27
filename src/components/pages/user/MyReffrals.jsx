import React, { useEffect, useState } from "react";
import { getMyReferrals } from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import {
  Users,
  Copy,
  Radio,
  UserRound,
  Mail,
  Phone,
  BadgeCheck,
  Zap,
  Activity,
  Layers
} from "lucide-react";
import Swal from "sweetalert2";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";

const MyReffrals = () => {
  const dispatch = useDispatch();
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    const fetchReferrals = async () => {
      dispatch(showLoader());

      try {
        const response = await getMyReferrals();
        console.log("MY REFERRALS RESPONSE 👉", response);

        setReferrals(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error("Referral fetch error:", err);
        setReferrals([]);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchReferrals();
  }, [dispatch]);

  const copyCode = async (code) => {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);

      Swal.fire({
        icon: "success",
        title: "Copied Successfully",
        text: "Signature code stored in clipboard.",
        background: "rgba(15, 23, 42, 0.95)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "border border-slate-800 rounded-3xl backdrop-blur-xl shadow-2xl text-sm",
          title: "text-white font-bold tracking-wide",
          htmlContainer: "text-slate-400 text-xs"
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Copy Failed",
        background: "rgba(15, 23, 42, 0.95)",
        color: "#ffffff",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "border border-slate-800 rounded-3xl backdrop-blur-xl text-sm",
        },
      });
    }
  };

  // प्रीमियम और क्लीन टेबल आर्किटेक्चर
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
            <span className="font-bold text-white text-sm tracking-wide uppercase">
              {value || "Anonymous Asset"}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Direct Referral Node</span>
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
          <span className="hover:text-[#6a98e0] transition-colors duration-300">{value || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Comm Channel",
      accessor: "mobile",
      render: (value) => (
        <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
          <Phone size={13} className="text-slate-500" />
          <span>{value || "N/A"}</span>
        </div>
      ),
    },
    {
      header: "Signature Code",
      accessor: "referralCode",
      render: (value) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-[#ff5d9f] bg-[#ff5d9f]/5 border border-[#ff5d9f]/15 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider shadow-inner">
            {value || "NOT_SET"}
          </span>

          {value && (
            <button
              type="button"
              onClick={() => copyCode(value)}
              className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-[#ff5d9f] hover:border-[#ff5d9f]/30 hover:bg-slate-900 transition-all duration-300 cursor-pointer"
              title="Copy Signature Code"
            >
              <Copy size={12} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#030712] space-y-8 text-slate-200 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#ff5d9f]/10 rounded-xl border border-[#ff5d9f]/20">
                <Radio size={18} className="text-[#ff5d9f] animate-pulse" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white uppercase">
                Network <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">Architecture</span>
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500 tracking-wide">
              Live configuration logs of all terminal nodes active via your invitation gateway.
            </p>
          </div>

          {/* Live System Pill */}
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-850 px-4 py-2 rounded-2xl w-fit shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">System Sync Status</span>
          </div>
        </div>

        {/* ── STATS GRID MODULE (PREMIUM DESIGN) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-b from-slate-950/60 to-slate-950/20 border border-slate-900 rounded-3xl p-6 relative overflow-hidden group shadow-xl backdrop-blur-md flex flex-col justify-between min-h-[140px]">
            {/* Ambient Background Glow Effect */}
            <div className="absolute -right-4 -bottom-4 text-slate-900/10 pointer-events-none select-none group-hover:scale-110 transition-transform duration-500">
              <Layers size={120} />
            </div>

            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Affiliate Metrics</span>
                <h4 className="text-xs font-bold text-slate-300 uppercase">Connected Nodes</h4>
              </div>
              <div className="p-2.5 bg-[#ff5d9f]/10 rounded-xl border border-[#ff5d9f]/15 text-[#ff5d9f]">
                <Users size={18} />
              </div>
            </div>

            <div className="flex items-baseline gap-3 mt-4 relative z-10">
              <p className="text-4xl font-black text-white tracking-tight">
                {referrals.length.toString().padStart(2, "0")}
              </p>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-lg shadow-sm">
                <Activity size={12} className="animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIRECTORY DATA TABLE ── */}
        <div className="bg-gradient-to-b from-slate-950/40 to-slate-950/10 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md p-2">
          <div className="px-4 py-3 border-b border-slate-900/60 flex items-center gap-2">
            <Zap size={14} className="text-[#ff5d9f]" />
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Gateway Directory</h3>
          </div>
          <TableComponent
            title=""
            columns={columns}
            data={referrals}
            showSearch={true}
          />
        </div>

        {/* ── NULL STATUS DISCONNECT LOG ── */}
        {referrals.length === 0 && (
          <div className="bg-slate-950/20 border border-slate-900 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-inner relative group hover:border-[#ff5d9f]/20 transition-colors duration-300">
            <div className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500 group-hover:text-[#ff5d9f] transition-colors duration-300">
              <BadgeCheck size={24} />
            </div>
            <h3 className="text-base font-bold text-white">No Network Assets Logged</h3>
            <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto leading-relaxed">
              Abhi aapke referral code se koi user registered nahi hua hai. Share your gateway link to expand the network grid.
            </p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </div>
  );
};

export default MyReffrals;