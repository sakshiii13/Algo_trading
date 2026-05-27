import React, { useEffect, useState } from "react";
import { getAdminReferralHistory } from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { Users, IndianRupee, TrendingUp, Network, Layers } from "lucide-react";

const UserReferralHistory = () => {
  const [referralHistory, setReferralHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReferralHistory = async () => {
      dispatch(showLoader());
      try {
        const res = await getAdminReferralHistory();
        setReferralHistory(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchReferralHistory();
  }, [dispatch]);

  const totalIncome = referralHistory.reduce((acc, curr) => acc + curr.amount, 0);

  const totalUsers = new Set(
    referralHistory.map((item) => item.userId?._id || item.userId),
  ).size;

  const columns = [
    {
      header: "Beneficiary_Node",
      accessor: "userId",
      render: (user) => (
        <div className="flex flex-col">
          <p className="text-[13px] font-black text-white uppercase tracking-tight">
            {user?.name || "UNKNOWN_NODE"}
          </p>
          <p className="text-[10px] font-mono text-slate-500">{user?.email}</p>
        </div>
      ),
    },
    {
      header: "Origin_Source",
      accessor: "fromUserId",
      render: (user) => (
        <div className="flex flex-col opacity-80">
          <p className="text-[12px] font-bold text-slate-300 uppercase">
            {user?.name || "-"}
          </p>
          <p className="text-[10px] font-mono text-slate-600">{user?.email}</p>
        </div>
      ),
    },
    {
      header: "Network_Depth",
      accessor: "level",
      render: (val) => (
        <div className="flex items-center gap-2">
          <Layers size={12} className="text-[#ff5d9f]" />
          <span className="font-mono text-xs text-[#ff5d9f] font-black">LVL_0{val}</span>
        </div>
      ),
    },
    {
      header: "Capital_Flow",
      accessor: "investment",
      render: (val) => (
        <span className="text-xs font-mono text-slate-400">₹{val.toLocaleString()}</span>
      ),
    },
    {
      header: "Commission_Yield",
      accessor: "amount",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-emerald-500 font-black text-xs">+₹{val.toLocaleString()}</span>
          <div className="h-[1px] w-full bg-emerald-500/20 mt-0.5" />
        </div>
      ),
    },
    {
      header: "Share_Ratio",
      accessor: "percentage",
      render: (val) => (
        <span className="text-[10px] font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
          {val}%
        </span>
      ),
    },
    {
      header: "Protocol_Type",
      accessor: "type",
      render: (val) => (
        <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">
          {val.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Sync_Date",
      accessor: "date",
      render: (val) => (
        <span className="text-[10px] font-mono text-slate-600">
          {new Date(val).toLocaleDateString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white font-sans">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Network size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Referral <span className="text-slate-500">Intelligence</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Multi-level commission tracking and network hierarchy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Total Income Card */}
        <div className="relative group overflow-hidden bg-[#0a101f] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/30">
          <div className="absolute -right-4 -bottom-4 text-emerald-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
             <IndianRupee size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aggregate_Commission</p>
              <p className="text-4xl font-black text-white tracking-tighter mt-1">
                ₹{totalIncome.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="relative group overflow-hidden bg-[#0a101f] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-[#ff5d9f]/30">
          <div className="absolute -right-4 -bottom-4 text-[#ff5d9f]/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
             <Users size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-[#ff5d9f]/10 rounded-2xl border border-[#ff5d9f]/20 text-[#ff5d9f] shadow-[0_0_15px_rgba(31,199,212,0.1)]">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active_Affiliates</p>
              <p className="text-4xl font-black text-white tracking-tighter mt-1">
                {totalUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <TableComponent
          title="Affiliate_Transaction_Log"
          columns={columns}
          data={referralHistory}
          showSearch={true}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default UserReferralHistory;