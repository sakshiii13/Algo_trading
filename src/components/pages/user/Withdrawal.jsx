import React, { useEffect, useState } from "react";
import {
  getWalletAddress,
  sendOtpForWithdrwal,
  processWithdrawal,
  withdrawalHistory,
  getAdminPercentage,
  getUsdtRate,
} from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import Swal from "sweetalert2";
import { 
  CreditCard, 
  ShieldCheck, 
  Key, 
  ArrowRightCircle, 
  History, 
  Wallet, 
  Activity, 
  Coins, 
  ArrowUpRight,
  TrendingUp,
  Globe
} from "lucide-react";

const Withdrawal = () => {
  const dispatch = useDispatch();

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [history, setHistory] = useState([]);

  const [adminPercentage, setAdminPercentage] = useState({
    tokenPercentage: 0,
    usdtPercentage: 0,
  });

  const [usdtRate, setUsdtRate] = useState(0);

  const fetchData = async () => {
    try {
      dispatch(showLoader());
      const walletRes = await getWalletAddress();
      const historyRes = await withdrawalHistory();
      setWalletAddress(walletRes?.data || "");
      setHistory(historyRes?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  const fetchAdminPercentage = async () => {
    try {
      dispatch(showLoader());
      const res = await getAdminPercentage();
      if (res?.data) {
        setAdminPercentage({
          tokenPercentage: res.data.tokenPercentage,
          usdtPercentage: res.data.usdtPercentage,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  const fetchUsdtRate = async () => {
    try {
      dispatch(showLoader());
      const res = await getUsdtRate();
      setUsdtRate(res?.rate || 0);
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    fetchAdminPercentage();
    fetchUsdtRate();
    fetchData();
  }, []);

  // 🔥 CALCULATIONS
  const tokenAmountValue =
    amount && adminPercentage.tokenPercentage
      ? (amount * adminPercentage.tokenPercentage) / 100
      : 0;

  const usdtAmountValue =
    amount && adminPercentage.usdtPercentage
      ? (amount * adminPercentage.usdtPercentage) / 100
      : 0;

  const TOKEN_PRICE = 0.25;

  // 👉 FINAL TOKEN COUNT
  const tokenFinal = TOKEN_PRICE ? tokenAmountValue / TOKEN_PRICE : 0;

  const handleSendOtp = async () => {
    try {
      dispatch(showLoader());
      const res = await sendOtpForWithdrwal();
      if (res?.success) {
        setOtpSent(true);
        Swal.fire({
          icon: "success",
          title: "OTP_DISPATCHED",
          text: "Verification code sent to registered email",
          background: "#040712",
          color: "#ffffff",
          confirmButtonColor: "#ff5d9f"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: res?.message || "Error sending OTP",
          background: "#040712",
          color: "#ffffff",
          confirmButtonColor: "#ff5d9f"
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send OTP",
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f"
      });
    } finally {
      dispatch(hideLoader());
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) return Swal.fire({ icon: "error", title: "Invalid Amount", text: "Enter valid amount", background: "#040712", color: "#ffffff" });
    if (!otp) return Swal.fire({ icon: "error", title: "Security Missing", text: "Enter OTP code", background: "#040712", color: "#ffffff" });

    try {
      dispatch(showLoader());

      const res = await processWithdrawal({
        usdtAmount: usdtAmountValue,     // % wala USDT
        tokenAmount: tokenFinal,         // FINAL TOKEN
        totalUsdtAmount: amount,         // user input
        otp,
      });

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "REQUEST_AUTHORIZED",
          text: "Withdrawal sequence initiated successfully",
          background: "#040712",
          color: "#ffffff",
          confirmButtonColor: "#ff5d9f"
        });

        setAmount("");
        setOtp("");
        setOtpSent(false);
        fetchData();
      } else {
        Swal.fire({ icon: "error", title: "Authorization Denied", text: res?.message || "Failed", background: "#040712", color: "#ffffff" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "System Error", text: "Something went wrong", background: "#040712", color: "#ffffff" });
    } finally {
      dispatch(hideLoader());
    }
  };

  const columns = [
    {
      header: "PAYOUT AMOUNT",
      accessor: "amount",
      render: (val) => (
        <span className="font-mono text-[#6a98e0] font-extrabold text-xs bg-[#6a98e0]/10 px-2.5 py-1 rounded-lg border border-[#6a98e0]/20">
          $ {Number(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      header: "VERIFICATION STATUS",
      accessor: "status",
      render: (val) => (
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${val === "Completed" ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]"}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${val === "Completed" ? "text-emerald-400" : "text-amber-400"}`}>
            {val || "Pending"}
          </span>
        </div>
      ),
    },
    {
      header: "TIMESTAMP LOG",
      accessor: "createdAt",
      render: (val) => (
        <span className="text-[11px] font-medium text-slate-400 font-mono">
          {new Date(val).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen p-4 md:p-8 bg-[#030712] text-slate-200 overflow-hidden">
      
      {/* Dynamic Background Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#ff5d9f]/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-12 left-1/4 w-[500px] h-[500px] bg-[#6a98e0]/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">

        {/* ── HEADER ARCHITECTURE ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#ff5d9f]/20 to-[#6a98e0]/20 rounded-xl border border-white/10 shadow-inner">
                <CreditCard size={20} className="text-[#ff5d9f]" />
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-wider text-white uppercase font-mono">
                ASSET // <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">WITHDRAWAL</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              De-allocate your liquidity and securely transfer settlement vaults directly back to your authenticated wallet node.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ff5d9f]/10 border border-[#ff5d9f]/20 rounded-xl text-[#ff5d9f] text-[10px] font-bold tracking-widest uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d9f] animate-ping" />
            Secure Tunnel Stable
          </div>
        </div>

        {/* ── LIVE TELEMETRY CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-[#ff5d9f]/30 transition-all duration-300">
            <div className="space-y-1 flex-1 min-w-0 mr-2">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">TARGET_RECIPIENT_NODE</p>
              <h3 className="text-sm font-semibold text-slate-300 font-mono truncate">
                {walletAddress || "No Address Synced"}
              </h3>
            </div>
            <div className="p-2.5 bg-[#ff5d9f]/5 border border-[#ff5d9f]/10 rounded-xl text-[#ff5d9f] shrink-0">
              <Wallet size={16} />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-[#6a98e0]/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">INDEXED_ORACLE_RATE</p>
              <h3 className="text-xl font-black font-mono text-white">
                1 USDT = ${Number(usdtRate).toFixed(2)}
              </h3>
            </div>
            <div className="p-2.5 bg-[#6a98e0]/5 border border-[#6a98e0]/10 rounded-xl text-[#6a98e0]">
              <TrendingUp size={16} />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">SECURITY_PROTOCOL</p>
              <h3 className="text-sm font-bold text-slate-300 font-mono tracking-wide uppercase">2FA Encrypted OTP</h3>
            </div>
            <div className="p-2.5 bg-purple-500/5 border border-purple-500/10 rounded-xl text-purple-400">
              <Activity size={16} />
            </div>
          </div>
        </div>

        {/* ── MAIN GRID INTERFACE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: FORM PANEL */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-[24px] p-6 relative overflow-hidden backdrop-blur-2xl shadow-xl">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0]" />
            
            <div className="space-y-5">
              
              {/* Amount Entry Box */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    DISBURSEMENT_VALUATION
                  </label>
                  <span className="text-[9px] text-[#6a98e0] font-mono font-bold uppercase tracking-wider">USDT ASSET</span>
                </div>

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono font-black text-slate-500 group-focus-within:text-[#ff5d9f] transition-colors">
                    $
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-9 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl text-xl font-mono text-white outline-none focus:border-[#ff5d9f]/40 focus:ring-1 focus:ring-[#ff5d9f]/10 transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              </div>

              {/* Dynamic Logic Splitting Preview */}
              {amount > 0 && (
                <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl space-y-2.5 font-mono text-[11px] shadow-inner">
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1.5">Withdrawal Breakdown</p>
                  
                  <div className="flex justify-between text-slate-400">
                    <span>Token Split ({adminPercentage.tokenPercentage}%)</span>
                    <span className="text-white font-semibold">${Number(tokenAmountValue).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-slate-400">
                    <span>USDT Split ({adminPercentage.usdtPercentage}%)</span>
                    <span className="text-white font-semibold">${Number(usdtAmountValue).toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-1.5 border-t border-white/5 text-slate-300 font-bold">
                    <span className="flex items-center gap-1"><Coins size={12} className="text-[#ff5d9f]" /> Final Token Allocation</span>
                    <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">{Number(tokenFinal).toFixed(4)} Tokens</span>
                  </div>
                </div>
              )}

              {/* Secure OTP Input */}
              {otpSent && (
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#ff5d9f] uppercase tracking-widest font-mono flex items-center gap-1">
                    <Key size={10} /> ENTER_PASSCODE_TOKEN
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="• • • • • •"
                    className="w-full p-3.5 bg-black/40 border border-[#ff5d9f]/30 focus:border-[#ff5d9f] rounded-xl text-center text-md tracking-widest font-mono text-white outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              )}

              {/* Execution Trigger */}
              <button
                onClick={!otpSent ? handleSendOtp : handleWithdraw}
                className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] hover:opacity-95 text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(255,93,159,0.15)]"
              >
                {!otpSent ? "GENERATE_AUTH_KEY" : "AUTHORIZE_SECURE_PAYOUT"}
                <ArrowRightCircle size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>
          </div>

          {/* RIGHT COLUMN: HISTORY LOG */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Automated Settlement Rules Bar */}
            {/* <div className="bg-white/[0.01] border border-white/5 rounded-[18px] p-4 flex items-start gap-4 backdrop-blur-md">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#6a98e0] mt-0.5">
                <ShieldCheck size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold uppercase text-slate-300 tracking-wider">
                  Automated Security Settlement Logs
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All processed withdrawal requests are logged into immutable records. Status switches from pending to completed depend directly on network sync loops.
                </p>
              </div>
            </div> */}

            {/* Structured Table Canvas */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-xl p-1">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <History size={12} className="text-[#6a98e0]" />
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">WITHDRAWAL_LEDGER_ARCHIVE</h3>
              </div>
              <TableComponent columns={columns} data={history} />
            </div>

          </div>

        </div>
      </div>

      {/* Footer Container */}
      <div className="pt-16">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default Withdrawal;