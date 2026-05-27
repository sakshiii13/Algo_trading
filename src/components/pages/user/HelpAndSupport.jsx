import React, { useEffect, useState } from "react";
import {
  helpAndSupport,
  getAllHelpAndSupportHistory,
} from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import Swal from "sweetalert2";
import { 
  MessageSquare, 
  Send, 
  LifeBuoy, 
  Layers, 
  CheckCircle, 
  Clock, 
  FileText 
} from "lucide-react";

const HelpAndSupport = () => {
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  /* 🔥 Fetch History */
  const fetchHistory = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllHelpAndSupportHistory();
      setHistory(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* 🔥 Submit Ticket */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      return Swal.fire({
        icon: "warning",
        title: "REQUIRED_FIELDS",
        text: "Please complete all terminal fields before dispatching.",
        background: "#0a0b10",
        color: "#ffffff",
        confirmButtonColor: "#6366f1"
      });
    }

    try {
      dispatch(showLoader());
      const res = await helpAndSupport({ subject, message });

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "TRANSMISSION_SUCCESS",
          text: "Your support payload has been routed to admin logs.",
          background: "#0a0b10",
          color: "#ffffff",
          confirmButtonColor: "#6366f1"
        });
        setSubject("");
        setMessage("");
        fetchHistory();
      } else {
        Swal.fire({
          icon: "error",
          title: "FAILED",
          text: res?.message || "Communication pipeline block.",
          background: "#0a0b10",
          color: "#ffffff"
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "SYSTEM_ERROR",
        text: "Critical handshake failure with server node.",
        background: "#0a0b10",
        color: "#ffffff"
      });
    } finally {
      dispatch(hideLoader());
    }
  };

  /* 🔥 Columns Setup */
  const columns = [
    {
      header: "Ticket ID / Subject",
      accessor: "subject",
      render: (val, row, idx) => (
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-mono text-indigo-400 tracking-wider font-bold">
            #TKT-{1000 + idx}
          </span>
          <span className="font-semibold text-white text-[13px] tracking-wide">
            {val}
          </span>
        </div>
      ),
    },
    {
      header: "Log Payload",
      accessor: "message",
      render: (val) => (
        <p className="text-slate-400 text-xs line-clamp-1 max-w-xs md:max-w-sm font-medium">
          {val}
        </p>
      ),
    },
    {
      header: "Timestamp",
      accessor: "createdAt",
      render: (val) => (
        <div className="text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/5 px-2 py-1 rounded-md inline-block">
          {new Date(val).toLocaleDateString("en-IN", { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#07080e] p-4 md:p-8 text-slate-300 antialiased selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── TOP NAV BAR / HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gradient-to-r from-white/[0.03] to-transparent border border-white/[0.06] rounded-2xl gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/5">
              <LifeBuoy size={22} className="animate-spin-[15s]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                Support Operations Center
              </h1>
              <p className="text-xs text-slate-400">
                Direct infrastructure logs and user variance reporting interface.
              </p>
            </div>
          </div>
          
          <div className="px-3.5 py-1.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl text-indigo-300 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            Node: Active_Grid
          </div>
        </div>

        {/* ── METRIC CARDS / QUICK STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"><Layers size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-mono text-slate-500">Total Logs</p>
              <p className="text-base font-bold text-white font-mono">{history.length}</p>
            </div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg"><Clock size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-mono text-slate-500">Processing</p>
              <p className="text-base font-bold text-white font-mono">{history.length > 0 ? 1 : 0}</p>
            </div>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.05] rounded-xl flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg"><CheckCircle size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-mono text-slate-500">Resolved</p>
              <p className="text-base font-bold text-white font-mono">{history.length > 1 ? history.length - 1 : 0}</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-xl flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg"><MessageSquare size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-mono text-indigo-300">Channel SLA</p>
              <p className="text-base font-bold text-indigo-200 font-mono">100% Secure</p>
            </div>
          </div>
        </div>

        {/* ── CORE WORKSPACE GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT INTERFACE Panel: DISPATCH FORM */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06] rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06] mb-5 text-slate-200">
              <FileText size={16} className="text-indigo-400" />
              <h3 className="text-sm font-bold tracking-wide">Initialize Support Ticket</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">
                  Core Subject / Route
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter a descriptive ticket header..."
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/[0.08] focus:border-indigo-500/60 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/5 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 tracking-wide">
                  Detailed Diagnostic Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide precise details or step-by-step logs of your query..."
                  rows={6}
                  className="w-full px-4 py-3.5 bg-black/50 border border-white/[0.08] focus:border-indigo-500/60 rounded-xl text-sm text-white placeholder:text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/5 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 transition-all duration-200 active:scale-[0.98]"
              >
                Dispatch Pipeline Payload 
                <Send size={13} className="text-indigo-200" />
              </button>
            </form>
          </div>

          {/* RIGHT INTERFACE Panel: ARCHIVE TERMINAL */}
          <div className="lg:col-span-7 bg-white/[0.01] border border-white/[0.05] rounded-2xl overflow-hidden shadow-xl">
            <div className="px-5 py-4 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Historical Archive Logs
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500">
                Showing {history.length} Entries
              </span>
            </div>
            
            {/* Table Canvas injection */}
            <div className="p-1">
              <TableComponent
                title="System_Inbound"
                columns={columns}
                data={history}
                showSearch={true}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer Wrapper Section */}
      <div className="pt-16">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default HelpAndSupport;