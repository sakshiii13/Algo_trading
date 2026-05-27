import React, { useEffect, useState } from "react";
import {
  getAllSupportTickets,
  approveSupportTicket,
  rejectSupportTicket,
} from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { MessageSquare, CheckCircle2, XCircle, Clock, ShieldQuestion } from "lucide-react";

const QueryList = () => {
  const [tickets, setTickets] = useState([]);
  const dispatch = useDispatch();

  const fetchTickets = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllSupportTickets();
      setTickets(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleApprove = async (id) => {
    const { value: message } = await Swal.fire({
      title: "APPROVE_SEQUENCE",
      input: "textarea",
      inputLabel: "Response Message",
      inputPlaceholder: "Enter resolution data...",
      background: "#050816",
      color: "#ffffff",
      confirmButtonColor: "#10b981",
      showCancelButton: true,
    });

    if (!message) return;

    try {
      dispatch(showLoader());
      const res = await approveSupportTicket(id, message);
      if (res?.success) {
        Swal.fire({ title: "RESOLVED", icon: "success", background: "#050816", color: "#ffffff" });
        fetchTickets();
      } else {
        Swal.fire("Error", res?.message, "error");
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleReject = async (id) => {
    const { value: message } = await Swal.fire({
      title: "REJECT_SEQUENCE",
      input: "textarea",
      inputLabel: "Reason for Rejection",
      inputPlaceholder: "Enter decline rationale...",
      background: "#050816",
      color: "#ffffff",
      confirmButtonColor: "#ef4444",
      showCancelButton: true,
    });

    if (!message) return;

    try {
      dispatch(showLoader());
      const res = await rejectSupportTicket(id, message);
      if (res?.success) {
        Swal.fire({ title: "REJECTED", icon: "error", background: "#050816", color: "#ffffff" });
        fetchTickets();
      } else {
        Swal.fire("Error", res?.message, "error");
      }
    } finally {
      dispatch(hideLoader());
    }
  };

  const columns = [
    {
      header: "Origin_Node",
      accessor: "userId",
      render: (_, row) => (
        <div className="flex flex-col">
          <p className="text-[13px] font-black text-white uppercase tracking-tight">
            {row.userId?.name}
          </p>
          <p className="text-[10px] font-mono text-slate-500 italic">
            ID: {row.userId?.username}
          </p>
        </div>
      ),
    },
    {
      header: "Contact_Path",
      accessor: "email",
      render: (_, row) => (
        <div className="text-slate-400 font-mono text-[10px]">
          <p>{row.userId?.email}</p>
          <p className="text-slate-600">{row.userId?.mobile}</p>
        </div>
      ),
    },
    {
      header: "Ticket_Core",
      accessor: "subject",
      render: (_, row) => (
        <div className="max-w-[200px]">
          <p className="font-bold text-white text-[12px] uppercase mb-1">{row.subject}</p>
          <p className="text-[11px] text-slate-500 line-clamp-1 italic italic">"{row.message}"</p>
        </div>
      ),
    },
    {
      header: "Live_Status",
      accessor: "status",
      render: (val) => {
        let styles = "bg-slate-500/10 text-slate-500 border-slate-500/20";
        let Icon = Clock;

        if (val === "Approved") { styles = "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"; Icon = CheckCircle2; }
        if (val === "Rejected") { styles = "bg-rose-500/10 text-rose-500 border-rose-500/20"; Icon = XCircle; }
        if (val === "Pending") { styles = "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse"; Icon = Clock; }

        return (
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${styles}`}>
            <Icon size={12} />
            {val}
          </div>
        );
      },
    },
    {
      header: "System_Action",
      accessor: "_id",
      render: (_, row) =>
        row.status === "Pending" ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(row._id)}
              className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
            >
              Resolve
            </button>
            <button
              onClick={() => handleReject(row._id)}
              className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500 hover:text-black transition-all"
            >
              Decline
            </button>
          </div>
        ) : (
          <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest">Archive_Only</span>
        ),
    },
    {
      header: "Log_Date",
      accessor: "createdAt",
      render: (val) => (
        <span className="text-[10px] font-mono text-slate-500">
          {new Date(val).toLocaleDateString("en-IN")}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-8 text-white">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <ShieldQuestion size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Inquiry <span className="text-slate-500">Resolution</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Process incoming support transmissions and system queries
        </p>
      </div>

      {/* Main Table */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <TableComponent
          title="Incident_Protocol_Log"
          columns={columns}
          data={tickets}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default QueryList;