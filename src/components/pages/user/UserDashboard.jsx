import React, { useEffect, useState } from "react";
import { getUserDashboardStats } from "../../../api/user/user.api";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import {
  Users,
  DollarSign,
  Wallet,
  UserPlus,
  Shield,
  Cpu,
  RefreshCw,
  Layers,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  Gift,
} from "lucide-react";

const MainCard = ({ title, value, icon, color, sub }) => {
  return (
    <div className="relative rounded-2xl p-6 bg-slate-950/50 border border-slate-900 overflow-hidden">
      <div
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[70px] opacity-20"
        style={{ backgroundColor: color }}
      />

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black tracking-[0.2em] text-slate-500 uppercase font-mono">
            {title}
          </p>

          <h2 className="text-3xl font-black text-white mt-4 font-mono">
            {value}
          </h2>

          {sub && <p className="text-[11px] text-slate-500 mt-2">{sub}</p>}
        </div>

        <div
          className="p-3 rounded-xl border"
          style={{
            color,
            borderColor: `${color}33`,
            backgroundColor: `${color}12`,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

const SmallCard = ({ title, value, icon, color }) => {
  return (
    <div className="rounded-xl p-4 bg-slate-950/40 border border-slate-900">
      <div className="flex justify-between items-center">
        <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase font-mono">
          {title}
        </p>

        <div
          className="p-2 rounded-lg"
          style={{
            color,
            backgroundColor: `${color}12`,
          }}
        >
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-black text-white mt-4 font-mono">{value}</h3>
    </div>
  );
};

const UserDashboard = () => {
  const dispatch = useDispatch();
  const [dashboardStats, setDashboardStats] = useState(null);

  const fetchDashboardStats = async () => {
    dispatch(showLoader());

    try {
      const res = await getUserDashboardStats();
      console.log("USER DASHBOARD RESPONSE 👉", res);

      setDashboardStats(res?.data || null);
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setDashboardStats(null);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  if (!dashboardStats) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  const totalInvestment = dashboardStats?.totalInvestment || 0;
  const totalEarnings = dashboardStats?.totalEarnings || 0;
  const totalWithdrawals = dashboardStats?.totalWithdrawals || 0;
  const totalReferrals = dashboardStats?.totalReferrals || 0;
  const activeReferrals = dashboardStats?.activeReferrals || 0;
  const completedLevels = dashboardStats?.completedLevels || [];
  const receivedBonuses = dashboardStats?.receivedBonuses || [];
  const nextLevel = dashboardStats?.nextLevel || {};

  const requiredReferrals = nextLevel?.requiredReferrals || 1;
  const currentActiveReferrals = nextLevel?.currentActiveReferrals || 0;
  const remaining = nextLevel?.remaining || 0;
  const progressPercentage = Math.min(
    (currentActiveReferrals / requiredReferrals) * 100,
    100
  );

  return (
    <div className="bg-[#030712] p-4 md:p-8 space-y-8 text-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.25em] text-indigo-400 uppercase mb-2 font-mono">
              <Cpu className="w-3.5 h-3.5 animate-pulse" />
              USER_DASHBOARD_STATS
            </div>

            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase font-mono">
              ASSET_VAULT_
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                OVERVIEW
              </span>
            </h1>

            <p className="text-slate-500 text-xs font-mono mt-1">
              Investment, earnings, referrals and level progress summary.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-900 p-3 rounded-xl">
            <div className="flex flex-col items-end">
              <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold">
                SYSTEM_STATUS
              </span>

              <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ONLINE
              </span>
            </div>

            <button
              type="button"
              onClick={fetchDashboardStats}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
              title="Refresh Dashboard"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MAIN CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MainCard
            title="Total Investment"
            value={`$${totalInvestment}`}
            sub="Total amount invested"
            color="#6366f1"
            icon={<Wallet className="w-5 h-5" />}
          />

          <MainCard
            title="Total Earnings"
            value={`$${totalEarnings}`}
            sub="Total income earned"
            color="#10b981"
            icon={<DollarSign className="w-5 h-5" />}
          />

          <MainCard
            title="Total Withdrawals"
            value={`$${totalWithdrawals}`}
            sub="Total withdrawn amount"
            color="#ef4444"
            icon={<ArrowUpRight className="w-5 h-5" />}
          />
        </div>

        {/* SMALL CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          <SmallCard
            title="Total Referrals"
            value={totalReferrals}
            color="#38bdf8"
            icon={<UserPlus className="w-4 h-4" />}
          />

          <SmallCard
            title="Active Referrals"
            value={activeReferrals}
            color="#34d399"
            icon={<Users className="w-4 h-4" />}
          />

          <SmallCard
            title="Completed Levels"
            value={completedLevels.length}
            color="#c084fc"
            icon={<Layers className="w-4 h-4" />}
          />

          <SmallCard
            title="Received Bonuses"
            value={receivedBonuses.length}
            color="#fbbf24"
            icon={<Gift className="w-4 h-4" />}
          />

          <SmallCard
            title="Next Level"
            value={`LVL ${nextLevel?.level || 1}`}
            color="#818cf8"
            icon={<Award className="w-4 h-4" />}
          />
        </div>

        {/* LEVEL PROGRESS */}
        <div className="relative rounded-2xl p-6 md:p-8 bg-slate-950/30 border border-slate-900 overflow-hidden">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-slate-900 pb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
              LEVEL_PROGRESS
            </h2>

            <span className="text-[10px] font-mono bg-slate-950 px-3 py-1 rounded-md border border-slate-900 text-indigo-400 font-bold">
              STATUS: ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Completed Levels */}
            <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900">
              <p className="text-slate-500 text-[10px] font-bold font-mono uppercase tracking-wider mb-2">
                Completed Levels
              </p>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-indigo-400" />

                <h3 className="text-xl font-bold text-slate-100 font-mono">
                  {completedLevels.length} Level(s)
                </h3>
              </div>

              <div className="mt-4 space-y-2">
                {completedLevels.length > 0 ? (
                  completedLevels.map((item) => (
                    <div
                      key={item?._id}
                      className="text-[11px] text-emerald-400 font-mono"
                    >
                      ✓ Level {item?.level} completed on{" "}
                      {new Date(item?.completedAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-slate-500 font-mono">
                    No completed level yet.
                  </p>
                )}
              </div>
            </div>

            {/* Next Level */}
            <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900">
              <p className="text-slate-500 text-[10px] font-bold font-mono uppercase tracking-wider mb-2">
                Level {nextLevel?.level || 1} Progress
              </p>

              <h3 className="text-2xl font-bold text-emerald-400 font-mono">
                {currentActiveReferrals} / {requiredReferrals}
                <span className="text-xs text-slate-500 font-normal ml-1">
                  Active Referrals
                </span>
              </h3>

              <div className="mt-4 w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full shadow-[0_0_8px_#34d399]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-500 font-mono mt-2">
                Progress: {progressPercentage.toFixed(0)}%
              </p>
            </div>

            {/* Remaining */}
            <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-900">
              <p className="text-slate-500 text-[10px] font-bold font-mono uppercase tracking-wider mb-2">
                Unlock Requirement
              </p>

              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" />

                <h3 className="text-xl font-bold text-purple-400 font-mono">
                  {remaining} More Needed
                </h3>
              </div>

              <p className="text-[10px] text-slate-500 font-mono leading-tight mt-4">
                Add {remaining} more active referrals to unlock Level{" "}
                {nextLevel?.level || 1}.
              </p>
            </div>
          </div>
        </div>

        {/* BONUS SECTION */}
        <div className="rounded-2xl p-6 bg-slate-950/30 border border-slate-900">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-yellow-400" />

            <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 font-mono">
              RECEIVED_BONUSES
            </h2>
          </div>

          {receivedBonuses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {receivedBonuses.map((bonus, index) => (
                <div
                  key={bonus?._id || index}
                  className="p-4 rounded-xl bg-slate-950/50 border border-slate-900"
                >
                  <p className="text-sm font-bold text-white">
                    Bonus #{index + 1}
                  </p>
                  <pre className="text-xs text-slate-500 mt-2 whitespace-pre-wrap">
                    {JSON.stringify(bonus, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 font-mono">
              No received bonuses yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;