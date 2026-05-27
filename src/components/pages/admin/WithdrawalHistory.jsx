import React, { useState, useEffect } from "react";
import {
  getAllWithdrawal,
  approveWithdrawal,
  rejectWithdrawal,
} from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { CreditCard, Wallet, Clock, CheckCircle, AlertOctagon, History } from "lucide-react";

const WithdrawalHistory = () => {
  const dispatch = useDispatch();
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllWithdrawal();
      setWithdrawals(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleApprove = async (id) => {
    const { value: message } = await Swal.fire({
      title: "AUTHORIZE_PAYOUT",
      input: "textarea",
      inputLabel: "Approval Note",
      inputPlaceholder: "Enter transaction details or confirmation...",
      background: "#050816",
      color: "#ffffff",
      confirmButtonText: "CONFIRM_DISBURSEMENT",
      confirmButtonColor: "#10b981",
      showCancelButton: true,
    });

    if (!message) return;

    try {
      dispatch(showLoader());
      const res = await approveWithdrawal(id, message);
      if (res?.success) {
        Swal.fire({ title: "DISBURSED", icon: "success", background: "#050816", color: "#ffffff" });
        fetchWithdrawals();
      } else {
        Swal.fire("Error", res?.message, "error");
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleReject = async (id) => {
    const { value: message } = await Swal.fire({
      title: "VOID_WITHDRAWAL",
      input: "textarea",
      inputLabel: "Rejection Rationale",
      inputPlaceholder: "State the reason for decline...",
      background: "#050816",
      color: "#ffffff",
      confirmButtonText: "VOID_REQUEST",
      confirmButtonColor: "#ef4444",
      showCancelButton: true,
    });

    if (!message) return;

    try {
      dispatch(showLoader());
      const res = await rejectWithdrawal(id, message);
      if (res?.success) {
        Swal.fire({ title: "VOIDED", icon: "error", background: "#050816", color: "#ffffff" });
        fetchWithdrawals();
      } else {
        Swal.fire("Error", res?.message, "error");
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  const columns = [
    {
      header: "Beneficiary",
      accessor: "userId",
      render: (_, row) => (
        <div className="flex flex-col">
          <p className="text-[13px] font-black text-white uppercase tracking-tight">
            {row.userId?.name}
          </p>
          <p className="text-[10px] font-mono text-slate-500 italic">
            @{row.userId?.username}
          </p>
        </div>
      ),
    },
    {
      header: "Capital_Out",
      accessor: "amount",
      render: (val) => (
        <div className="flex flex-col">
          <span className="text-sm font-black text-rose-500 font-mono">
            ₹{val?.toLocaleString() || 0}
          </span>
          <div className="h-[1px] w-full bg-rose-500/10 mt-0.5" />
        </div>
      ),
    },
    {
      header: "Destination_Wallet",
      accessor: "userWalletAddress",
      render: (val) => (
        <div className="flex items-center gap-2 group">
          <Wallet size={12} className="text-slate-600 group-hover:text-[#ff5d9f] transition-colors" />
          <span className="text-[10px] font-mono text-slate-500 break-all max-w-[120px] truncate">
            {val || "NO_ADDRESS_FOUND"}
          </span>
        </div>
      ),
    },
    {
      header: "Current_Status",
      accessor: "status",
      render: (val) => {
        let styles = "bg-slate-500/10 text-slate-500 border-slate-500/20";
        if (val === "Approved") styles = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (val === "Rejected") styles = "bg-rose-500/10 text-rose-500 border-rose-500/20";
        if (val === "Pending") styles = "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse";

        return (
          <span className={`text-[10px] px-3 py-1 rounded-full border font-black uppercase tracking-widest ${styles}`}>
            {val}
          </span>
        );
      },
    },
    {
      header: "Authority_Action",
      accessor: "_id",
      render: (_, row) =>
        row.status === "Pending" ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(row._id)}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(row._id)}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-black transition-all"
            >
              Reject
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 opacity-30">
             <History size={12} className="text-slate-500" />
             <span className="text-[10px] font-mono uppercase tracking-tighter">Archived</span>
          </div>
        ),
    },
    {
      header: "Request_Time",
      accessor: "createdAt",
      render: (val) => (
        <div className="text-[10px] font-mono text-slate-600">
          <p>{new Date(val).toLocaleDateString("en-IN")}</p>
          <p>{new Date(val).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <CreditCard size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Withdrawal <span className="text-slate-500">Queue</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Treasury management and capital outflow authorization
        </p>
      </div>

      {/* Warning/Alert Bar */}
      <div className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl">
        <AlertOctagon size={18} className="text-amber-500" />
        <p className="text-[11px] font-bold text-amber-500/80 uppercase tracking-wider">
          Security Protocol: Ensure wallet signatures match beneficiary records before authorization.
        </p>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <TableComponent
          title="Withdrawal_Disbursement_Log"
          columns={columns}
          data={withdrawals}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default WithdrawalHistory;