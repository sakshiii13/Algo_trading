import React, { useEffect, useState } from "react";
import { getLevelIncomeHistoryApi } from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import {
  TrendingUp,
  DollarSign,
  Wallet,
  Zap,
  User,
  ArrowUpRight,
  Calendar,
  Layers,
  ShieldCheck,
  Percent,
} from "lucide-react";

const ReferralIncome = () => {
  const dispatch = useDispatch();
  const [referralHistory, setReferralHistory] = useState([]);

  const num = (value) => Number(value || 0);

  const formatAmount = (value) =>
    num(value).toLocaleString(undefined, {
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
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.history)) return res.data.history;
    if (Array.isArray(res?.data?.levelIncomeHistory))
      return res.data.levelIncomeHistory;
    if (Array.isArray(res?.levelIncomeHistory)) return res.levelIncomeHistory;
    if (Array.isArray(res?.history)) return res.history;
    return [];
  };

  const fetchIncomeHistory = async () => {
    dispatch(showLoader());

    try {
      const res = await getLevelIncomeHistoryApi();

      console.log("LEVEL INCOME HISTORY RESPONSE 👉", res);

      const finalData = getSafeArray(res);

      console.log("FINAL LEVEL INCOME DATA 👉", finalData);

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

  const avgPercentage =
    referralHistory.length > 0
      ? referralHistory.reduce((acc, curr) => acc + num(curr?.percentage), 0) /
        referralHistory.length
      : 0;

  const columns = [
    {
      header: "SOURCE NODE / USER",
      accessor: "fromUserId",
      render: (fromUserId) => (
        <div className="flex items-center gap-3 py-1">
          <div className="h-10 w-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
            <User size={15} />
          </div>

          <div>
            <p className="font-bold text-white text-[13px]">
              {fromUserId?.name || "N/A"}
            </p>
            <p className="text-[10px] text-slate-500 font-mono">
              {fromUserId?.email || "N/A"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "NETWORK DEPTH",
      accessor: "level",
      render: (value) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] text-slate-300 text-[11px] font-bold font-mono">
          <Layers size={11} className="text-[#6a98e0]" />
          LVL {value || 1}
        </span>
      ),
    },
    {
      header: "MULTIPLIER",
      accessor: "percentage",
      render: (val) => (
        <span className="text-[11px] font-bold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/10">
          {num(val)}%
        </span>
      ),
    },
    {
      header: "REWARD AMOUNT",
      accessor: "rewardAmount",
      render: (val) => (
        <span className="font-mono text-[#ff5d9f] font-bold">
          ${formatAmount(val)}
        </span>
      ),
    },
    {
      header: "BONUS AMOUNT",
      accessor: "bonusAmount",
      render: (val) => (
        <span className="font-mono text-[#6a98e0] font-bold">
          ${formatAmount(val)}
        </span>
      ),
    },
    {
      header: "TOTAL AMOUNT",
      accessor: "totalAmount",
      render: (val) => (
        <div className="flex items-center gap-1">
          <span className="text-emerald-400 font-extrabold text-[13px] font-mono">
            +${formatAmount(val)}
          </span>
          <ArrowUpRight size={10} className="text-emerald-400" />
        </div>
      ),
    },
    {
      header: "DESCRIPTION",
      accessor: "description",
      render: (val) => (
        <span className="text-xs text-slate-400">{val || "N/A"}</span>
      ),
    },
    {
      header: "DATE",
      accessor: "createdAt",
      render: (val) => (
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
          <Calendar size={12} />
          {formatDate(val)}
        </div>
      ),
    },
  ];

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
                LEVEL //{" "}
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
              LEDGER_SYNCED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-[24px] p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  TOTAL_LEVEL_INCOME
                </p>
                <h4 className="text-sm font-bold text-slate-200">
                  Cumulative Yield
                </h4>
              </div>
              <DollarSign size={18} className="text-emerald-400" />
            </div>

            <p className="text-4xl font-black text-white mt-5 font-mono">
              <span className="text-emerald-400 text-xl">$</span>{" "}
              {formatAmount(totalYield)}
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-[24px] p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  REWARD_AMOUNT
                </p>
                <h4 className="text-sm font-bold text-slate-200">
                  Direct Reward
                </h4>
              </div>
              <Zap size={18} className="text-[#ff5d9f]" />
            </div>

            <p className="text-4xl font-black text-white mt-5 font-mono">
              <span className="text-[#ff5d9f] text-xl">$</span>{" "}
              {formatAmount(totalReward)}
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-[24px] p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                  AVG_PERCENTAGE
                </p>
                <h4 className="text-sm font-bold text-slate-200">
                  Average Commission
                </h4>
              </div>
              <Percent size={18} className="text-[#6a98e0]" />
            </div>

            <p className="text-4xl font-black text-white mt-5 font-mono">
              {avgPercentage.toFixed(1)}
              <span className="text-slate-500 text-sm"> % Avg</span>
            </p>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] overflow-hidden p-2">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-[#ff5d9f]" />
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                LEVEL_INCOME_LEDGER
              </h3>
            </div>

            <div className="text-[10px] font-bold text-slate-500 font-mono uppercase bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
              RECORDS_COUNT:{" "}
              {referralHistory.length.toString().padStart(2, "0")}
            </div>
          </div>

          <TableComponent
            title=""
            columns={columns}
            data={referralHistory}
            showSearch={true}
          />
        </div>
      </div>

      <div className="pt-16">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default ReferralIncome;