import React, { useEffect, useState } from 'react';
import { addWalletAddress, myWalletAddress } from '../../../api/admin/admin.api';
import Swal from 'sweetalert2';
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { Wallet, Settings2, Edit2, Check, X } from "lucide-react";

const AddWalletAddress = () => {
    const [loading, setLoading] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");
    const [currentWallet, setCurrentWallet] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchWallet = async () => {
            dispatch(showLoader());
            try {
                const res = await myWalletAddress();
                // Depending on the API response structure, we check multiple fields
                if (res?.data?.walletAddress || res?.walletAddress || res?.data?.address || res?.address) {
                    const address = res?.data?.walletAddress || res?.walletAddress || res?.data?.address || res?.address;
                    setCurrentWallet(address);
                } else if (typeof res?.data === "string") {
                    setCurrentWallet(res.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                dispatch(hideLoader());
            }
        };
        fetchWallet();
    }, [dispatch]);

    const handleEditClick = () => {
        setWalletAddress(currentWallet);
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setWalletAddress("");
        setIsEditing(false);
    };

    const handleSubmit = async () => {
        if (!walletAddress.trim()) {
            Swal.fire("Error", "Please enter a valid wallet address", "error");
            return;
        }

        setLoading(true);
        dispatch(showLoader());
        try {
            const res = await addWalletAddress(walletAddress.trim());
            if (res?.success !== false) {
                 Swal.fire("Success", "Wallet address updated successfully", "success");
                 setCurrentWallet(walletAddress.trim());
                 setIsEditing(false);
                 setWalletAddress("");
            } else {
                 Swal.fire("Error", res?.message || "Failed to update wallet address", "error");
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err?.message || "Failed to update wallet address", "error");
        } finally {
            setLoading(false);
            dispatch(hideLoader());
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-10 bg-[#050816] space-y-10 text-white flex flex-col">
            <div className="flex-1 space-y-10 max-w-4xl mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Wallet size={20} className="text-[#ff5d9f]" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                            Wallet <span className="text-slate-500">Configuration</span>
                        </h2>
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
                        Manage Official System Receiving Address
                    </p>
                </div>

                {/* MAIN WALLET CARD */}
                <div className="bg-[#0b1220]/80 border border-white/5 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#ff5d9f]/30">
                    <div className="absolute -right-4 -top-4 text-[#ff5d9f]/5 rotate-12">
                        <Settings2 size={120} />
                    </div>
                    
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-white uppercase tracking-wider text-[12px] flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#ff5d9f]" />
                                Admin Receiving Wallet
                            </h2>
                            {!isEditing && (
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#ff5d9f]/10 hover:bg-[#ff5d9f]/20 text-[#ff5d9f] rounded-lg transition-colors border border-[#ff5d9f]/20 text-[10px] font-black uppercase tracking-widest"
                                >
                                    <Edit2 size={12} />
                                    Edit
                                </button>
                            )}
                        </div>

                        {!isEditing ? (
                            <div className="p-6 bg-[#050816] border border-[#1e293b] rounded-xl break-all">
                                {currentWallet ? (
                                    <span className="text-[#ff5d9f] font-mono tracking-wide text-lg">
                                        {currentWallet}
                                    </span>
                                ) : (
                                    <span className="text-slate-500 italic flex items-center gap-2">
                                        No wallet address configured yet.
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 bg-[#050816] p-6 rounded-xl border border-[#ff5d9f]/30">
                                <div>
                                    <label className="text-[10px] font-black text-[#ff5d9f] uppercase tracking-widest block mb-2">Edit Wallet Address</label>
                                    <input
                                        type="text"
                                        placeholder="Enter new 0x... address"
                                        value={walletAddress}
                                        onChange={(e) => setWalletAddress(e.target.value)}
                                        className="w-full p-4 rounded-xl bg-[#0b1220] border border-[#1e293b] focus:outline-none focus:border-[#ff5d9f] transition font-mono text-sm placeholder:text-slate-700"
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black uppercase tracking-widest text-[12px] transition ${
                                            loading
                                                ? "bg-[#ff5d9f]/50 cursor-not-allowed text-slate-900"
                                                : "bg-[#ff5d9f] hover:bg-cyan-400 text-slate-900 shadow-[0_0_20px_rgba(255,93,159,0.3)] hover:shadow-[0_0_30px_rgba(31,199,212,0.5)]"
                                        }`}
                                    >
                                        <Check size={16} />
                                        {loading ? "Saving..." : "Save Configuration"}
                                    </button>
                                    
                                    <button
                                        onClick={handleCancelEdit}
                                        disabled={loading}
                                        className="px-6 py-4 rounded-xl font-black uppercase tracking-widest text-[12px] border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white transition flex items-center gap-2"
                                    >
                                        <X size={16} />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-10">
                <DashboardFooter />
            </div>
        </div>
    );
};

export default AddWalletAddress;