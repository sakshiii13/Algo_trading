import React, { useEffect, useState } from "react";
import { getAdminROIHistory } from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { IndianRupee, TrendingUp, Users, Activity, BarChart3 } from "lucide-react";

const UserRoiHistory = () => {
  const [roiHistory, setRoiHistory] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchROIHistory = async () => {
      dispatch(showLoader());
      try {
        const res = await getAdminROIHistory();
        setRoiHistory(res?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchROIHistory();
  }, [dispatch]);

  const totalROI = roiHistory.reduce((acc, curr) => acc + curr.amount, 0);

  const totalUsers = new Set(
    roiHistory.map((item) => item.userId?._id || item.userId)
  ).size;

  const columns = [
    {
      header: "Node_Identity",
      accessor: "userId",
      render: (user) => (
        <div className="flex flex-col">
          <p className="text-[13px] font-black text-white uppercase tracking-tight">
            {user?.name || "ANONYMOUS_NODE"}
          </p>
          <p className="text-[10px] font-mono text-slate-500 italic">{user?.email}</p>
        </div>
      ),
    },
    {
      header: "Active_Capital",
      accessor: "investment",
      render: (val) => (
        <span className="text-xs font-mono text-slate-400">₹{val.toLocaleString()}</span>
      ),
    },
    {
      header: "Yield_Generated",
      accessor: "amount",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-emerald-500 font-black text-xs">
            +₹{val.toLocaleString()}
          </span>
          <div className="h-[1px] w-8 bg-emerald-500/30 mt-0.5" />
        </div>
      ),
    },
    {
      header: "Protocol_Type",
      accessor: "type",
      render: (val) => (
        <span className="text-[9px] font-black tracking-widest text-[#ff5d9f] uppercase bg-[#ff5d9f]/5 px-2 py-0.5 rounded border border-[#ff5d9f]/20">
          {val.replace("_", " ")}
        </span>
      ),
    },
    {
      header: "Timestamp",
      accessor: "date",
      render: (val) => (
        <span className="text-[10px] font-mono text-slate-600">
          {new Date(val).toLocaleDateString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            ROI <span className="text-slate-500">Analytics</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Historical Yield Distribution and Capital Performance
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Total ROI Card */}
        <div className="relative group overflow-hidden bg-[#0a101f] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-emerald-500/30 shadow-2xl">
          <div className="absolute -right-4 -bottom-4 text-emerald-500/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
             <TrendingUp size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500">
              <IndianRupee size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aggregate_ROI_Yield</p>
              <p className="text-4xl font-black text-white tracking-tighter mt-1">
                ₹{totalROI.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="relative group overflow-hidden bg-[#0a101f] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-[#ff5d9f]/30 shadow-2xl">
          <div className="absolute -right-4 -bottom-4 text-[#ff5d9f]/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
             <Users size={120} />
          </div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-[#ff5d9f]/10 rounded-2xl border border-[#ff5d9f]/20 text-[#ff5d9f]">
              <BarChart3 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active_Yield_Nodes</p>
              <p className="text-4xl font-black text-white tracking-tighter mt-1">
                {totalUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <TableComponent
          title="ROI_Distribution_Log"
          columns={columns}
          data={roiHistory}
          showSearch={true}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default UserRoiHistory;