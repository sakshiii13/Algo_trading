import React, { useEffect, useState } from "react";
import { getRoiOnRoiHistory } from "../../../api/user/user.api";
import TableComponent from "../../UI/TableComponent";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import { TrendingUp, IndianRupee, Layers, Calendar } from "lucide-react";

const LevelRoiIncome = () => {
    const [roiHistory, setRoiHistory] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchROIHistory = async () => {
            dispatch(showLoader());
            try {
                const res = await getRoiOnRoiHistory();
                const levelData = res?.data || [];

                setRoiHistory(levelData);
            } catch (err) {
                console.error(err);
            } finally {
                dispatch(hideLoader());
            }
        };

        fetchROIHistory();
    }, [dispatch]);

    // 🔥 Columns
    const columns = [
        {
            header: "From User",
            accessor: "fromUser",
            render: (val) => (
                <div>
                    <p className="text-sm font-semibold text-white">{val?.name}</p>
                    <p className="text-xs text-slate-500">{val?.email}</p>
                </div>
            ),
        },
        {
            header: "Level",
            accessor: "level",
            render: (val) => (
                <span className="px-2 py-1 text-xs rounded-full bg-cyan-400/10 text-[#ff5d9f] border border-cyan-400/20">
                    L{val}
                </span>
            ),
        },
        {
            header: "Amount",
            accessor: "amount",
            render: (val) => (
                <span className="text-emerald-400 font-bold">
                    +₹{val}
                </span>
            ),
        },
        {
            header: "Type",
            accessor: "type",
            render: (val) => (
                <span className="text-xs uppercase text-slate-400">
                    {val.replaceAll("_", " ")}
                </span>
            ),
        },
        {
            header: "Date",
            accessor: "date",
            render: (val) => (
                <span className="text-xs text-slate-500">
                    {new Date(val).toLocaleString("en-IN")}
                </span>
            ),
        },
    ];
    const totalLevelIncome = roiHistory.reduce(
        (acc, curr) => acc + curr.amount,
        0
    );

    return (
        <div className="min-h-screen bg-[#050816] text-white px-6 md:px-10 py-10 space-y-10 relative overflow-hidden">

            {/* 🔥 Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#050816] to-[#071226]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#ff5d9f20_1px,transparent_1px),linear-gradient(90deg,#ff5d9f20_1px,transparent_1px)] [background-size:40px_40px]" />

            <div className="relative z-10 space-y-10">

                {/* HEADER */}
                <div>
                    <div className="flex items-center gap-2">
                        <Layers size={18} className="text-[#ff5d9f]" />
                        <h2 className="text-3xl font-black tracking-tight">
                            Level <span className="text-slate-500">Income</span>
                        </h2>
                    </div>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">
                        Earnings from network levels
                    </p>
                </div>

                {/* 🔥 STATS */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative rounded-2xl border border-[#1e293b] bg-[#0b1220]/80 backdrop-blur-xl p-6">

                        <div className="absolute left-0 top-0 h-full w-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />

                        <div className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <div className="p-3 bg-cyan-400/10 border border-cyan-400/20 rounded-xl text-[#ff5d9f]">
                                    <IndianRupee size={22} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 uppercase">
                                        Total Level Income
                                    </p>
                                    <h3 className="text-2xl font-bold text-white">
                                        ₹{totalLevelIncome.toLocaleString()}
                                    </h3>
                                </div>
                            </div>

                            <TrendingUp className="text-[#ff5d9f] opacity-50" size={28} />
                        </div>
                    </div>
                </div>

                {/* 🔥 TABLE */}
                <div className="rounded-2xl border border-[#1e293b] bg-[#0b1220]/70 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <TableComponent
                        title="Level ROI History"
                        columns={columns}
                        data={roiHistory}
                        showSearch={true}
                    />
                </div>

                <DashboardFooter />
            </div>
        </div>
    );
};

export default LevelRoiIncome;