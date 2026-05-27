import React, { useState, useEffect } from "react";
import {
  getAllUsers,
  toggleUserBlockStatus,
  activateUserByAdmin,
} from "../../../api/admin/admin.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Users, ShieldAlert, UserCheck, ShieldOff } from "lucide-react";

const AllUsers = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      dispatch(showLoader());
      const res = await getAllUsers();
      setUsers(res?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBlock = async (userId, block) => {
    const confirm = await Swal.fire({
      title: block ? "BLOCK_SEQUENCE?" : "RESTORE_ACCESS?",
      text: block ? "This user will be restricted from the terminal." : "Restoring system access for this node.",
      icon: "warning",
      background: "#050816",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonColor: block ? "#ef4444" : "#10b981",
      confirmButtonText: block ? "CONFIRM_BLOCK" : "CONFIRM_RESTORE",
    });

    if (!confirm.isConfirmed) return;

    try {
      dispatch(showLoader());
      const res = await toggleUserBlockStatus(userId, block);

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "PROTOCOL_UPDATED",
          background: "#050816",
          color: "#ffffff",
        });

        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, loginBlocked: block } : user,
          ),
        );
      } else {
        Swal.fire("Error", res?.message || "Failed", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleActivateUser = async (row) => {
    if (row.status) {
      Swal.fire({
        icon: "info",
        title: "ALREADY_ACTIVE",
        background: "#050816",
        color: "#ffffff",
      });
      return;
    }

    const { value: amount } = await Swal.fire({
      title: "NODE_ACTIVATION",
      input: "number",
      inputLabel: "Activation Capital (INR)",
      inputPlaceholder: "Enter amount",
      background: "#050816",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: "INITIALIZE",
      confirmButtonColor: "#ff5d9f",
      inputAttributes: { min: 1, step: 1 },
      inputValidator: (value) => {
        if (!value || value <= 0) return "Valid capital amount required!";
      },
    });

    if (!amount) return;

    try {
      dispatch(showLoader());
      const res = await activateUserByAdmin(row._id, Number(amount));

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "NODE_ONLINE",
          background: "#050816",
          color: "#ffffff",
        });

        setUsers((prev) =>
          prev.map((u) => (u._id === row._id ? { ...u, status: true } : u)),
        );
        fetchUsers();
      } else {
        Swal.fire("Error", res?.message || "Failed", "error");
      }
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      dispatch(hideLoader());
    }
  };

  const columns = [
    {
      header: "Node_Identity",
      accessor: "name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.profilePhoto ? (
            <img
              src={row.profilePhoto}
              alt="user"
              className="w-9 h-9 rounded-full object-cover border border-white/10"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#ff5d9f] flex items-center justify-center text-xs font-black">
              {row.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-[13px] font-black text-white uppercase tracking-tight">{row.name}</p>
            <p className="text-[10px] font-mono text-slate-500 italic">@{row.username}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Comm_Link",
      accessor: "email",
      render: (_, row) => (
        <div className="space-y-0.5">
          <p className="text-[11px] font-mono text-slate-400">{row.email}</p>
          <p className="text-[10px] font-mono text-slate-600">{row.mobile}</p>
        </div>
      ),
    },
    {
      header: "Protocol_Status",
      accessor: "status",
      render: (_, row) => (
        <button
          onClick={() => handleActivateUser(row)}
          className={`flex items-center gap-2 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest transition-all ${
            row.status
              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse"
          }`}
        >
          <div className={`w-1 h-1 rounded-full ${row.status ? "bg-emerald-500 shadow-[0_0_5px_#10b981]" : "bg-rose-500 shadow-[0_0_5px_#f43f5e]"}`} />
          {row.status ? "Online" : "Offline"}
        </button>
      ),
    },
    {
      header: "Capital_Yield",
      accessor: "myInvestment",
      render: (_, row) => (
        <div className="space-y-0.5">
          <p className="text-xs font-mono text-white">₹{row.myInvestment || 0}</p>
          <p className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Earnings: ₹{row.totalEarnings || 0}</p>
        </div>
      ),
    },
    {
      header: "Access_Control",
      accessor: "_id",
      render: (_, row) => (
        <button
          onClick={() => handleToggleBlock(row._id, !row.loginBlocked)}
          className={`group flex items-center gap-2 px-4 py-1.5 text-[10px] rounded-lg font-black uppercase tracking-widest transition-all border ${
            row.loginBlocked
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-black"
              : "bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-black"
          }`}
        >
          {row.loginBlocked ? <UserCheck size={12} /> : <ShieldOff size={12} />}
          {row.loginBlocked ? "Restore" : "Restrict"}
        </button>
      ),
    },
    {
      header: "Onboard_Date",
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
          <Users size={20} className="text-[#ff5d9f]" />
          <h2 className="text-2xl font-black uppercase tracking-tighter italic">
            Network <span className="text-slate-500">Nodes</span>
          </h2>
        </div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
          Total User Oversight & Access Synchronization
        </p>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
        <TableComponent
          title="Central_User_Database"
          columns={columns}
          data={users}
          showSearch={true}
        />
      </div>

      <DashboardFooter />
    </div>
  );
};

export default AllUsers;