import React, { useEffect, useState } from "react";
import { getUserROIHistory } from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { TrendingUp, IndianRupee, Zap, Calendar } from "lucide-react";

const RoiIncome = () => {
  const [roiHistory, setRoiHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchROIHistory = async () => {
      dispatch(showLoader());
      try {
        const res = await getUserROIHistory();
        setRoiHistory(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchROIHistory();
  }, [dispatch]);

  // 🔥 Precision Columns
  const columns = [
    {
      header: "Payout_Type",
      accessor: "type",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ff5d9f] shadow-[0_0_8px_#ff5d9f]" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-300">
            {val.replace("_", " ")}
          </span>
        </div>
      ),
    },
    {
      header: "Principal_Basis",
      accessor: "investment",
      render: (val) => (
        <span className="font-mono text-slate-400">₹{val.toLocaleString()}</span>
      ),
    },
    {
      header: "Yield_Earned",
      accessor: "amount",
      render: (val) => (
        <div className="flex items-center gap-1">
          <span className="text-emerald-400 font-black text-sm">+₹{val.toLocaleString()}</span>
          <TrendingUp size={12} className="text-emerald-500/40" />
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessor: "date",
      render: (val) => (
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
          <Calendar size={12} />
          {new Date(val).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      ),
    },
  ];

  const totalROI = roiHistory.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-8 text-white">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-emerald-400 fill-emerald-400/20" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Yield <span className="text-slate-500">Engine</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Algorithmic returns on active capital deployments
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/[0.05] transition-all duration-300">
          {/* Performance Glow */}
          <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500 shadow-[0_0_15px_#10b981]" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-500">
                <IndianRupee size={24} />
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                  Cumulative Yield
                </p>
                <p className="text-3xl font-black text-white leading-none mt-1">
                  ₹{totalROI.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity">
                <TrendingUp className="text-emerald-500" size={28} />
                <span className="text-[8px] font-bold text-emerald-500 uppercase mt-1">Increasing</span>
            </div>
          </div>
          
          {/* Subtle Cyber Grid Background Element */}
          <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-white">
            <Zap size={120} />
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        <TableComponent
          title="Distribution_Log"
          columns={columns}
          data={roiHistory}
          showSearch={true}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default RoiIncome;