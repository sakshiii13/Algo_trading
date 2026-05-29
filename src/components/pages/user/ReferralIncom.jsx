import React, { useEffect, useState } from "react";
import { getLevelIncomeHistoryApi } from "../../../api/user/user.api";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  Zap,
  User,
  Calendar,
  Layers,
  ShieldCheck,
  Percent,
  Users,
} from "lucide-react";

const ReferralIncome = () => {
  const dispatch = useDispatch();
  const [referralHistory, setReferralHistory] = useState([]);

  const num = (value) => Number(value || 0);

  const formatAmount = (value) =>
    num(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (value) => {
    if (!value) return "---";
    return new Date(value).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getSafeArray = (res) => {
    if (Array.isArray(res?.data?.data)) return res.data.data;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.history)) return res.data.history;
    if (Array.isArray(res?.history)) return res.history;
    return [];
  };

  const fetchIncomeHistory = async () => {
    dispatch(showLoader());

    try {
      const res = await getLevelIncomeHistoryApi();
      console.log("LEVEL INCOME RESPONSE 👉", res);

      const finalData = getSafeArray(res);
      setReferralHistory(finalData);
    } catch (err) {
      console.error("Level Income Error:", err);
      setReferralHistory([]);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchIncomeHistory();
  }, []);

  const totalYield = referralHistory.reduce(
    (acc, curr) => acc + num(curr?.totalAmount),
    0
  );

  const totalReward = referralHistory.reduce(
    (acc, curr) => acc + num(curr?.rewardAmount),
    0
  );

  const totalContributors = referralHistory.reduce(
    (acc, curr) => acc + (curr?.contributingUsers?.length || 0),
    0
  );

  const avgPercentage =
    referralHistory.length > 0
      ? referralHistory.reduce((acc, curr) => acc + num(curr?.percentage), 0) /
        referralHistory.length
      : 0;

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#02040a] text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 border-b border-white/[0.06] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#ff5d9f]/10 rounded-xl border border-white/10 flex items-center justify-center">
                <Wallet size={18} className="text-[#ff5d9f]" />
              </div>

              <h1 className="text-xl md:text-2xl font-black tracking-wider text-white uppercase font-mono">
                LEVEL{" "}
                <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">
                  INCOME
                </span>
              </h1>
            </div>

            <p className="text-xs text-slate-400 mt-2">
              Level income history generated from your downline network.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-white/[0.02] border border-white/5 px-4 py-2 rounded-xl">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-300 font-mono tracking-widest uppercase flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-emerald-400" />
              LEDGER SYNCED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Level Income"
            subtitle="Cumulative Yield"
            value={`$ ${formatAmount(totalYield)}`}
            icon={<DollarSign size={18} className="text-emerald-400" />}
          />

          <StatCard
            title="Reward Amount"
            subtitle="Direct Reward"
            value={`$ ${formatAmount(totalReward)}`}
            icon={<Zap size={18} className="text-[#ff5d9f]" />}
          />

          <StatCard
            title="Avg Percentage"
            subtitle="Average Commission"
            value={`${avgPercentage.toFixed(1)} %`}
            icon={<Percent size={18} className="text-[#6a98e0]" />}
          />

          <StatCard
            title="Contributors"
            subtitle="Total Users"
            value={totalContributors}
            icon={<Users size={18} className="text-yellow-400" />}
          />
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-[#ff5d9f]" />
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                LEVEL INCOME LEDGER
              </h3>
            </div>

            <div className="text-[10px] font-bold text-slate-500 font-mono uppercase bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
              Records: {referralHistory.length}
            </div>
          </div>

          <div className="p-4 space-y-5">
            {referralHistory.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No level income history found.
              </div>
            ) : (
              referralHistory.map((item) => (
                <div
                  key={item?._id}
                  className="rounded-[22px] border border-white/[0.07] bg-white/[0.03] overflow-hidden"
                >
                  <div className="p-5 grid grid-cols-1 lg:grid-cols-5 gap-4 items-center">
                    <UserBox
                      label="From User"
                      name={item?.fromUserId?.name}
                      email={item?.fromUserId?.email}
                    />

                    <InfoBox
                      label="Level"
                      value={`Level ${item?.level || 0}`}
                      icon={<Layers size={14} />}
                    />

                    <InfoBox
                      label="Percentage"
                      value={`${num(item?.percentage)}%`}
                    />

                    <InfoBox
                      label="Reward"
                      value={`$ ${formatAmount(item?.rewardAmount)}`}
                    />

                    <InfoBox
                      label="Total"
                      value={`$ ${formatAmount(item?.totalAmount)}`}
                      highlight
                    />
                  </div>

                  <div className="px-5 pb-4 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>Description: {item?.description || "N/A"}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item?.createdAt)}
                    </span>
                    <span>Bonus: $ {formatAmount(item?.bonusAmount)}</span>
                  </div>

                  <div className="border-t border-white/[0.06] p-5">
                    <h4 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">
                      Contributing Users
                    </h4>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[780px] text-left">
                        <thead>
                          <tr className="text-[10px] uppercase tracking-widest text-slate-500 border-b border-white/[0.06]">
                            <th className="py-3 px-3">User</th>
                            <th className="py-3 px-3">Email</th>
                            <th className="py-3 px-3">Investment</th>
                            <th className="py-3 px-3">Percentage</th>
                            <th className="py-3 px-3">Earned Amount</th>
                          </tr>
                        </thead>

                        <tbody>
                          {item?.contributingUsers?.length > 0 ? (
                            item.contributingUsers.map((contributor) => (
                              <tr
                                key={contributor?._id}
                                className="border-b border-white/[0.04] hover:bg-white/[0.03] transition"
                              >
                                <td className="py-4 px-3">
                                  <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center">
                                      <User size={14} />
                                    </div>
                                    <span className="font-bold text-white text-sm">
                                      {contributor?.userId?.name || "N/A"}
                                    </span>
                                  </div>
                                </td>

                                <td className="py-4 px-3 text-slate-400 text-sm">
                                  {contributor?.userId?.email || "N/A"}
                                </td>

                                <td className="py-4 px-3 font-mono text-[#6a98e0] font-bold">
                                  $ {formatAmount(contributor?.investment)}
                                </td>

                                <td className="py-4 px-3">
                                  <span className="text-[11px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/10">
                                    {num(contributor?.percentage)}%
                                  </span>
                                </td>

                                <td className="py-4 px-3 font-mono text-[#ff5d9f] font-bold">
                                  +$ {formatAmount(contributor?.earnedAmount)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan="5"
                                className="py-8 text-center text-slate-500 text-sm"
                              >
                                No contributing users found.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="pt-16">
        <DashboardFooter />
      </div>
    </div>
  );
};

const StatCard = ({ title, subtitle, value, icon }) => {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-[24px] p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
            {title}
          </p>
          <h4 className="text-sm font-bold text-slate-200">{subtitle}</h4>
        </div>
        {icon}
      </div>

      <p className="text-3xl font-black text-white mt-5 font-mono">{value}</p>
    </div>
  );
};

const UserBox = ({ label, name, email }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
        <User size={16} />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
          {label}
        </p>
        <p className="font-bold text-white text-sm">{name || "N/A"}</p>
        <p className="text-[11px] text-slate-500">{email || "N/A"}</p>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value, icon, highlight }) => {
  return (
    <div className="bg-black/30 border border-white/[0.05] rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p
        className={`mt-2 font-mono font-black ${
          highlight ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default ReferralIncome;