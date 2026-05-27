import React, { useState, useEffect } from "react";
import { getTotalInvestedUsers } from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { Briefcase, Fingerprint, ReceiptIndianRupee, Database } from "lucide-react";

const InvestmentHistory = () => {
  const dispatch = useDispatch();
  const [investments, setInvestments] = useState([]);

  const fetchInvestments = async () => {
    try {
      dispatch(showLoader());
      const res = await getTotalInvestedUsers();
      setInvestments(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, []);

  /* 🔥 Optimized Obsidian Columns */
  const columns = [
    {
      header: "Investor_Node",
      accessor: "name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={row.userId?.profilePhoto || "https://i.pravatar.cc/40"}
              alt="user"
              className="w-8 h-8 rounded-full object-cover border border-white/10"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-[#ff5d9f] rounded-full border border-[#050816]" />
          </div>
          <div>
            <p className="text-[13px] font-black text-white uppercase tracking-tight">
              {row.userId?.name}
            </p>
            <p className="text-[10px] font-mono text-slate-500 italic">ID: {row.userId?.username}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Comm_Link",
      accessor: "email",
      render: (_, row) => (
        <div className="text-[10px] font-mono text-slate-400">
          <p>{row.userId?.email}</p>
          <p className="text-slate-600">{row.userId?.mobile}</p>
        </div>
      ),
    },
    {
      header: "Capital_In",
      accessor: "investmentAmount",
      render: (val) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white font-mono">
            ₹{val?.toLocaleString() || 0}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
        </div>
      ),
    },
    {
      header: "TX_Signature",
      accessor: "txResponse",
      render: (val) => (
        <div className="max-w-[150px] group relative">
          <p className="text-[9px] font-mono text-slate-500 truncate bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-[#ff5d9f]/30 transition-colors">
            {val || "INTERNAL_TRANSFER"}
          </p>
          <Fingerprint size={10} className="absolute right-2 top-1.5 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessor: "investmentDate",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-slate-400">
            {new Date(val).toLocaleDateString("en-IN")}
          </span>
          <span className="text-[9px] font-mono text-slate-600 uppercase">
            {new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Briefcase size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Capital <span className="text-slate-500">Deployment</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Master ledger of all incoming nodes and investment transactions
        </p>
      </div>

      {/* Vault Summary Placeholder / Visual Element */}
      <div className="flex items-center gap-4 bg-[#0a101f] border border-white/5 p-4 rounded-2xl w-fit">
        <div className="p-2 bg-emerald-500/10 rounded-lg">
          <Database size={18} className="text-emerald-500" />
        </div>
        <div>
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Vault_Status</p>
          <p className="text-xs font-mono text-emerald-500 font-bold uppercase">Encrypted & Synchronized</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-500 hover:border-white/10">
        <TableComponent
          title="Investment_Archive_Main"
          columns={columns}
          data={investments}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default InvestmentHistory;