import React, { useState, useEffect } from "react";
import {
  makeInvestment,
  getMyInvestment,
  adminWalletAddress,
} from "../../../api/user/user.api";
import Swal from "sweetalert2";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import {
  Rocket,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Wallet,
  X,
  Loader,
  History,
  Coins,
  TrendingUp,
  Activity,
  Globe
} from "lucide-react";
import { ethers } from "ethers";

const USDT_CONTRACT = "0x55d398326f99059fF775485246999027B3197955";
const FALLBACK_ADMIN_WALLET = "0x189116cfCD00C80607D0F9fE8DCf050dE752461D";

const USDT_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
];

const getWalletProvider = (walletId) => {
  if (!window.ethereum) return null;
  const providers = window.ethereum.providers || [window.ethereum];

  if (walletId === "metamask") return providers.find((p) => p.isMetaMask) || window.ethereum;
  if (walletId === "safepal") return providers.find((p) => p.isSafePal) || null;
  if (walletId === "trustwallet") return providers.find((p) => p.isTrust || p.isTrustWallet) || null;
  if (walletId === "coinbase") return providers.find((p) => p.isCoinbaseWallet) || null;
  return null;
};

const WALLETS = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
  },
  {
    id: "safepal",
    name: "SafePal",
    icon: "https://cryptologos.cc/logos/safepal-sfp-logo.svg",
  },
  {
    id: "trustwallet",
    name: "Trust Wallet",
    icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "https://avatars.githubusercontent.com/u/1885080",
  },
];

const getValidWalletAddress = (res) => {
  const address =
    res?.data?.walletAddress ||
    res?.data?.adminWalletAddress ||
    res?.data?.address ||
    res?.walletAddress ||
    res?.adminWalletAddress ||
    res?.address ||
    "";

  return ethers.isAddress(address) ? address : FALLBACK_ADMIN_WALLET;
};

const switchToBscNetwork = async (provider) => {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x38" }],
    });
  } catch (switchError) {
    if (switchError?.code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x38",
            name: "BNB Smart Chain",
            nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"],
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
};

const sendUsdtTransaction = async (provider, amountUSD, receiverAddress) => {
  if (!provider) throw new Error("Wallet provider not found");
  const finalReceiver = ethers.isAddress(receiverAddress) ? receiverAddress : FALLBACK_ADMIN_WALLET;

  const accounts = await provider.request({ method: "eth_requestAccounts" });
  if (!accounts || accounts.length === 0) throw new Error("No accounts found");
  const userAddress = accounts[0];

  await switchToBscNetwork(provider);

  const ethersProvider = new ethers.BrowserProvider(provider);
  const signer = await ethersProvider.getSigner();
  const usdtContract = new ethers.Contract(USDT_CONTRACT, USDT_ABI, signer);

  const decimals = await usdtContract.decimals();
  const parsedAmount = ethers.parseUnits(String(amountUSD), decimals);

  const userBalance = await usdtContract.balanceOf(userAddress);

  if (userBalance < parsedAmount) {
    const formattedBalance = ethers.formatUnits(userBalance, decimals);
    throw new Error(`Insufficient USDT Balance. You are trying to stake $${amountUSD}, but your wallet only has $${Number(formattedBalance).toFixed(2)} USDT.`);
  }

  const tx = await usdtContract.transfer(finalReceiver, parsedAmount);
  await tx.wait();
  return tx.hash;
};

// ── MATCHING ULTRA GLASS MODAL ──
const WalletModal = ({ onClose, onSelect, amount, adminWallet }) => {
  const [connecting, setConnecting] = useState(null);

  const handleWalletSelect = async (wallet) => {
    const provider = getWalletProvider(wallet.id);

    if (!provider) {
      Swal.fire({
        icon: "warning",
        title: "Extension Not Found",
        text: `Please install or enable the ${wallet.name} extension, then refresh the page.`,
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f",
      });
      return;
    }

    setConnecting(wallet.id);

    try {
      const txHash = await sendUsdtTransaction(provider, Number(amount), adminWallet);
      setConnecting(null);
      onClose();
      onSelect(txHash);
    } catch (err) {
      console.log("Wallet transaction error:", err);
      setConnecting(null);

      let errorMessage = err?.message || "Blockchain execution failure.";
      if (err?.code === 4001) {
        errorMessage = "The transaction was rejected inside your wallet.";
      }

      Swal.fire({
        icon: "error",
        title: err?.code === 4001 ? "Request Cancelled" : "Transaction Aborted",
        text: errorMessage,
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-md bg-slate-950/90 border border-white/10 rounded-[28px] shadow-[0_0_50px_rgba(255,93,159,0.15)] p-6 z-10 overflow-hidden backdrop-blur-2xl">
        <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#ff5d9f]/10 blur-2xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 h-32 w-32 rounded-full bg-[#6a98e0]/10 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-6">
          <div className="space-y-0.5">
            <h3 className="text-md font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Coins size={16} className="text-[#ff5d9f]" />
              Secure <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">Gateway</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase">
              Authorize node deployment vault
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
          >
            <X size={14} className="text-slate-400" />
          </button>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#ff5d9f]/10 via-[#6a98e0]/5 to-transparent border border-white/5 flex items-center justify-between shadow-inner">
          <span className="text-[10px] font-bold text-slate-400 tracking-widest font-mono">PAY_SETTLEMENT</span>
          <span className="font-mono bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent font-black text-xl">
            ${Number(amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="space-y-2">
          {WALLETS.map((wallet) => {
            const isLoading = connecting === wallet.id;

            return (
              <button
                key={wallet.id}
                type="button"
                onClick={() => handleWalletSelect(wallet)}
                disabled={!!connecting}
                className={`group w-full flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 border-white/5 bg-white/[0.02] hover:border-[#ff5d9f]/40 hover:bg-white/[0.05] ${
                  isLoading ? "border-[#ff5d9f]/40 bg-[#ff5d9f]/5" : ""
                } disabled:opacity-50`}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 p-1 flex items-center justify-center border border-white/10">
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>

                <div className="flex-1 text-left">
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {wallet.name}
                  </span>
                  <p className="text-[9px] text-slate-500 tracking-wider">BEP-20 Token</p>
                </div>

                {isLoading ? (
                  <Loader size={14} className="text-[#ff5d9f] animate-spin" />
                ) : (
                  <ArrowUpRight size={14} className="text-slate-500 group-hover:text-[#ff5d9f] transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest font-mono">
            Encrypted End-To-End • Mainnet Sync
          </p>
        </div>
      </div>
    </div>
  );
};

// ── CYBER-GLOW MAIN SYSTEM ──
const MakeInvestment = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState([]);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [adminWallet, setAdminWallet] = useState(FALLBACK_ADMIN_WALLET);

  const totalInvested = investments.reduce((acc, curr) => acc + Number(curr.investmentAmount || 0), 0);

  const fetchInvestments = async () => {
    try {
      const res = await getMyInvestment();
      const investmentList = res?.data || res?.investments || [];
      setInvestments(Array.isArray(investmentList) ? investmentList : []);
    } catch (err) {
      console.log("Investment fetch error:", err);
      setInvestments([]);
    }
  };

  const fetchWallet = async () => {
    try {
      const res = await adminWalletAddress();
      setAdminWallet(getValidWalletAddress(res));
    } catch (err) {
      console.log("Admin wallet error:", err);
      setAdminWallet(FALLBACK_ADMIN_WALLET);
    }
  };

  useEffect(() => {
    fetchInvestments();
    fetchWallet();
  }, []);

  const handleWalletPayment = async (txHash) => {
    setLoading(true);
    try {
      const payload = {
        investmentAmount: Number(amount),
        txResponse: txHash,
      };

      const res = await makeInvestment(payload);

      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Protocol Initialized",
          html: `
            <p style="color:#94a3b8; font-size:13px">${res?.message || "Capital successfully deployed to the matrix vault."}</p>
            <div style="background:#02040a; border:1px solid #1e293b; padding:10px; border-radius:12px; margin-top:12px">
              <p style="color:#ff5d9f; font-family:monospace; font-size:10px; word-break:break-all; margin:0">
                HASH: ${res?.investment?.txResponse || txHash}
              </p>
            </div>
          `,
          background: "#040712",
          color: "#ffffff",
          iconColor: "#ff5d9f",
          confirmButtonColor: "#6a98e0",
        });

        setAmount("");
        fetchInvestments();
      } else {
        Swal.fire({
          icon: "error",
          title: "Deployment Failed",
          text: res?.message || "Smart contract submission rejected.",
          background: "#040712",
          color: "#ffffff",
          confirmButtonColor: "#ff5d9f",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Callback Error",
        text: err?.message || "System error during confirmation.",
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      Swal.fire({
        icon: "error",
        title: "Invalid Principal",
        text: "Please enter a valid amount greater than zero.",
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f",
      });
      return;
    }

    if (!window.ethereum) {
      Swal.fire({
        icon: "warning",
        title: "Provider Missing",
        text: "Web3 wallet injector not detected. Please use MetaMask or a compatible browser.",
        background: "#040712",
        color: "#ffffff",
        confirmButtonColor: "#ff5d9f",
      });
      return;
    }

    setShowWalletModal(true);
  };

  const columns = [
    {
      header: "PRINCIPAL DEPLOYED",
      accessor: "investmentAmount",
      render: (val) => (
        <span className="font-mono text-[#6a98e0] font-extrabold text-xs bg-[#6a98e0]/10 px-2.5 py-1 rounded-lg border border-[#6a98e0]/20">
          $ {Number(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      header: "TRANSACTION BLOCK HASH",
      accessor: "txResponse",
      render: (val) => (
        <span className="font-mono text-[10px] text-slate-400 truncate max-w-[180px] block bg-white/[0.02] px-2 py-0.5 rounded border border-white/5">
          {val || "—"}
        </span>
      ),
    },
    {
      header: "EXECUTION DATE",
      accessor: "investmentDate",
      render: (val, row) => (
        <span className="text-[11px] font-medium text-slate-400 font-mono">
          {new Date(val || row?.createdAt).toLocaleDateString("en-IN", {
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
      
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff5d9f]/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#6a98e0]/5 rounded-full blur-3xl pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {showWalletModal && (
          <WalletModal
            amount={amount}
            adminWallet={adminWallet}
            onClose={() => setShowWalletModal(false)}
            onSelect={handleWalletPayment}
          />
        )}

        {/* ── HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#ff5d9f]/20 to-[#6a98e0]/20 rounded-xl border border-white/10 shadow-inner">
                <Rocket size={20} className="text-[#ff5d9f]" />
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-wider text-white uppercase font-mono">
                VAULT // <span className="bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] bg-clip-text text-transparent">DEPLOYMENT</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 max-w-xl">
              Initialize strategic liquidity nodes. All allocations are instantly verified through immutable smart contract protocols.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-[10px] font-bold tracking-widest uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Core Node Online
          </div>
        </div>

        {/* ── LIVE ANALYTICS CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-[#ff5d9f]/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">TOTAL_STAKED_ASSETS</p>
              <h3 className="text-xl font-black font-mono text-white">
                ${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="p-2.5 bg-[#ff5d9f]/5 border border-[#ff5d9f]/10 rounded-xl text-[#ff5d9f]">
              <TrendingUp size={16} />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-[#6a98e0]/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">ACTIVE_GATEWAY</p>
              <h3 className="text-sm font-semibold text-slate-300 truncate max-w-[160px] font-mono">
                {adminWallet.slice(0, 6)}...{adminWallet.slice(-4)}
              </h3>
            </div>
            <div className="p-2.5 bg-[#6a98e0]/5 border border-[#6a98e0]/10 rounded-xl text-[#6a98e0]">
              <Activity size={16} />
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 backdrop-blur-md flex items-center justify-between group hover:border-purple-500/30 transition-all duration-300">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 font-bold tracking-widest font-mono uppercase">NETWORK_PROTOCOL</p>
              <h3 className="text-sm font-bold text-slate-300 font-mono tracking-wide uppercase">BSC MAINNET (BEP20)</h3>
            </div>
            <div className="p-2.5 bg-purple-500/5 border border-purple-500/10 rounded-xl text-purple-400">
              <Globe size={16} />
            </div>
          </div>
        </div>

        {/* ── TWO COLUMN INTERFACE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* STAKE INPUT BOX */}
          <div className="lg:col-span-4 bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/5 rounded-[24px] p-6 relative overflow-hidden backdrop-blur-2xl shadow-xl">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0]" />
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                    ALLOCATION_AMOUNT
                  </label>
                  <span className="text-[9px] text-[#ff5d9f] font-mono font-bold uppercase tracking-wider">USDT TOKEN</span>
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
                    min="1"
                    className="w-full pl-9 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl text-xl font-mono text-white outline-none focus:border-[#ff5d9f]/40 focus:ring-1 focus:ring-[#ff5d9f]/10 transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5d9f] to-[#6a98e0] hover:opacity-95 text-white font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(255,93,159,0.15)] disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <Loader size={12} className="animate-spin" />
                    Processing Node deployment...
                  </>
                ) : (
                  <>
                    <Wallet size={12} className="text-white" />
                    Commit Capital
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* LEDGER GRID & TELEMETRY */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* INFORMATION LOG BANNER */}
            {/* <div className="bg-white/[0.01] border border-white/5 rounded-[18px] p-4 flex items-start gap-4 backdrop-blur-md">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#6a98e0] mt-0.5">
                <Cpu size={16} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[11px] font-bold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-emerald-400" />
                  Cryptographic Verification Active
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Every pipeline deployment is registered dynamically on-chain. Please ensure your external injector contains sufficient gas tokens (BNB) before routing capital.
                </p>
              </div>
            </div> */}

            {/* LEDGER ARCHIVE TABLE */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-[24px] overflow-hidden backdrop-blur-xl p-1">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <History size={12} className="text-[#6a98e0]" />
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">STAKING_HISTORY_LOG</h3>
              </div>
              <TableComponent
                title=""
                columns={columns}
                data={investments}
                showSearch={false}
              />
            </div>

          </div>

        </div>
      </div>

      <div className="pt-16">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default MakeInvestment;