import React, { useEffect, useState } from "react";
import { setPercentageApi, getPercentageApi } from "../../../api/admin/admin.api";
import Swal from "sweetalert2";

const SetPercentage = () => {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        referralPercentage: "",
        roiPercentage: "",
        roiOnRoi: {
            level1: "",
            level2: "",
            level3: "",
            level4: "",
            level5: "",
        },
    });


    // 🔥 GET EXISTING DATA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPercentageApi();
                if (res?.data) {
                    setForm(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    // 🔥 HANDLE CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("level")) {
            setForm((prev) => ({
                ...prev,
                roiOnRoi: {
                    ...prev.roiOnRoi,
                    [name]: value,
                },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // 🔥 SUBMIT
    const handleSubmit = async () => {
        setLoading(true);
        try {
            await setPercentageApi(form);
            Swal.fire("Success", "Percentages updated successfully", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err?.message || "Failed to update percentages", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#050816] text-white p-6 md:p-10">

            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold">Set Percentages</h1>
                    <p className="text-slate-400 text-sm">
                        Configure referral, ROI and level-based ROI percentages
                    </p>
                </div>

                {/* 🔥 MAIN CARD */}
                <div className="bg-[#0b1220]/80 border border-[#1e293b] rounded-2xl p-6 space-y-6">

                    {/* REFERRAL */}
                    <div>
                        <label className="text-sm text-slate-400">Referral %</label>
                        <input
                            type="number"
                            name="referralPercentage"
                            value={form.referralPercentage}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 rounded-lg bg-[#050816] border border-[#1e293b] focus:outline-none"
                        />
                    </div>

                    {/* ROI */}
                    <div>
                        <label className="text-sm text-slate-400">ROI %</label>
                        <input
                            type="number"
                            name="roiPercentage"
                            value={form.roiPercentage}
                            onChange={handleChange}
                            className="w-full mt-2 p-3 rounded-lg bg-[#050816] border border-[#1e293b] focus:outline-none"
                        />
                    </div>

                    {/* ROI ON ROI LEVELS */}
                    <div>
                        <h2 className="text-lg font-semibold mb-3">ROI on ROI Levels</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {["level1", "level2", "level3", "level4", "level5"].map((lvl) => (
                                <div key={lvl}>
                                    <label className="text-xs text-slate-500 uppercase">
                                        {lvl}
                                    </label>
                                    <input
                                        type="number"
                                        name={lvl}
                                        value={form.roiOnRoi[lvl]}
                                        onChange={handleChange}
                                        className="w-full mt-1 p-2 rounded-lg bg-[#050816] border border-[#1e293b]"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BUTTON */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetPercentage;