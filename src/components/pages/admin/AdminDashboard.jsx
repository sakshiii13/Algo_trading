import React, { useEffect, useState } from "react";
import { getAdminDashboardStats } from "../../../api/admin/admin.api";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { Users, DollarSign, TrendingUp, Wallet, Shield, Activity, BarChart3 } from "lucide-react";
import TableComponent from "../../UI/TableComponent";

const Card = ({ title, value, sub, accentColor = "#ff5d9f" }) => {
  const getIcon = () => {
    if (title.toLowerCase().includes("investment")) return <Wallet size={24} />;
    if (title.toLowerCase().includes("earning")) return <DollarSign size={24} />;
    if (title.toLowerCase().includes("roi")) return <TrendingUp size={24} />;
    if (title.toLowerCase().includes("user")) return <Users size={24} />;
    return <Activity size={24} />;
  };

  return (
    <div className="relative group overflow-hidden bg-[#0a101f] border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-white/20 shadow-2xl">
      {/* Decorative Ghost Icon */}
      <div className="absolute -right-6 -bottom-6 text-white/[0.03] rotate-12 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0">
        <div className="text-[120px]">{getIcon()}</div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/[0.03] text-slate-400 group-hover:text-white transition-colors">
            {getIcon()}
          </div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">
            {title.replace(" ", "_")}
          </p>
        </div>

        <h2 className="text-3xl font-black text-white tracking-tighter">
          {value}
        </h2>

        {sub && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
              {sub}
            </p>
          </div>
        )}
      </div>
      
      {/* Accent Line */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" 
        style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
      />
    </div>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStats = async () => {
      dispatch(showLoader());
      try {
        const res = await getAdminDashboardStats();
        setStats(res?.data);
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchStats();
  }, [dispatch]);

  if (!stats) return null;

  const columns = [
    {
      header: "System_User",
      accessor: "name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={row.profilePhoto || "https://i.pravatar.cc/150?img=3"}
              alt="user"
              className="w-8 h-8 rounded-full object-cover border border-white/10"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#050816] rounded-full" />
          </div>
          <div>
            <p className="text-xs font-black text-white uppercase tracking-tight">{row.name}</p>
            <p className="text-[9px] font-mono text-slate-500 lowercase">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Capital_In",
      accessor: "myInvestment",
      render: (val) => <span className="font-mono text-[#ff5d9f] font-bold text-xs">₹{val.toLocaleString()}</span>,
    },
    {
      header: "Onboarding_Date",
      accessor: "createdAt",
      render: (val) => (
        <span className="text-[10px] font-mono text-slate-500">
          {new Date(val).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#ff5d9f]" />
            <h1 className="text-2xl font-black uppercase tracking-tighter italic">
              Admin <span className="text-slate-500">Dashboard</span>
            </h1>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            Real-time node cluster performance and user analytics
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-xl">
           <BarChart3 size={14} className="text-[#ff5d9f]" />
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">Status: Secure_Link_Active</span>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card
          title="Total Users"
          value={stats.totalUsers}
          sub={`${stats.activeUsers} active_nodes`}
          accentColor="#ff5d9f"
        />
        <Card
          title="Total Investment"
          value={`₹${stats.totalInvestment.toLocaleString()}`}
          accentColor="#10b981"
        />
        <Card
          title="Total ROI"
          value={`₹${stats.totalROI.toLocaleString()}`}
          accentColor="#f59e0b"
        />
        <Card
          title="Total Earnings"
          value={`₹${stats.totalEarnings.toLocaleString()}`}
          accentColor="#ef4444"
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card
          title="Total Referral"
          value={stats.totalReferral}
          accentColor="#6366f1"
        />
        <Card
          title="Today ROI"
          value={`₹${stats.todayROI.toLocaleString()}`}
          accentColor="#10b981"
        />
        <Card
          title="Today Referral"
          value={stats.todayReferral}
          accentColor="#94a3b8"
        />
        <Card
          title="Team Business"
          value={`₹${stats.totalTeamBusiness.toLocaleString()}`}
          accentColor="#f97316"
        />
      </div>

      {/* Table Section */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <TableComponent
          title="Node_Deployment_Archive"
          columns={columns}
          data={stats.recentUsers || []}
          showSearch={true}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;