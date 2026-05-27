import React, { useEffect, useState } from "react";
import { upsertUsdtRate, getUsdtRate } from "../../../api/admin/admin.api";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const SetTokenPercentage = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    rate: "",
    usdt: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsdtRate = async () => {
      dispatch(showLoader());
      try {
        const res = await getUsdtRate();

        // expected: { rate: number, usdt: number }
        if (res) {
          setForm({
            rate: res.rate || "",
            usdt: res.usdt || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchUsdtRate();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateRate = async () => {
    dispatch(showLoader());
    try {
      await upsertUsdtRate({
        rate: Number(form.rate),
        usdt: Number(form.usdt),
      });

      Swal.fire("Success", "USDT Data updated successfully", "success");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.message || "Failed to update", "error");
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="bg-[#050816] text-white p-6 md:p-10 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Set USDT Config</h1>
            <p className="text-slate-400 text-sm">
              Configure rate and USDT value
            </p>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg cursor-pointer   bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              Edit
            </button>
          )}
        </div>

        {/* CARD */}
        <div className="bg-[#0b1220]/80 border border-[#1e293b] rounded-2xl p-6 space-y-6">
          {/* RATE */}
          <div>
            <label className="text-sm text-slate-400">Rate</label>
            <input
              type="number"
              name="rate"
              value={form.rate}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-2 p-3 rounded-lg border ${
                isEditing
                  ? "bg-[#050816] border-[#1e293b]"
                  : "bg-gray-800 border-gray-700 cursor-not-allowed"
              }`}
            />
          </div>

          {/* USDT */}
          <div>
            <label className="text-sm text-slate-400">USDT</label>
            <input
              type="number"
              name="usdt"
              value={form.usdt}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-2 p-3 rounded-lg border ${
                isEditing
                  ? "bg-[#050816] border-[#1e293b]"
                  : "bg-gray-800 border-gray-700 cursor-not-allowed"
              }`}
            />
          </div>

          {isEditing && (
            <div className="flex gap-3">
              <button
                onClick={handleUpdateRate}
                className="w-full py-3 cursor-pointer rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="w-full cursor-pointer py-3 rounded-xl bg-gray-600 hover:bg-gray-500 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <DashboardFooter />
      </div>
    </div>
  );
};

export default SetTokenPercentage;
