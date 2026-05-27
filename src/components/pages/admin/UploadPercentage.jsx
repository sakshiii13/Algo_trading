import React, { useEffect, useState } from "react";
import {
  createOrUpdateAdminPercentage,
  getAdminPercentage,
} from "../../../api/admin/admin.api";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";
import { showLoader, hideLoader } from "../../../redux/slice/loaderSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

const UploadPercentage = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    tokenPercentage: "",
    usdtPercentage: "",
  });

  // 🔥 GET DATA
  useEffect(() => {
    const fetchData = async () => {
      dispatch(showLoader());
      try {
        const res = await getAdminPercentage();

        if (res?.data) {
          setForm({
            tokenPercentage: res.data.tokenPercentage || "",
            usdtPercentage: res.data.usdtPercentage || "",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(hideLoader());
      }
    };

    fetchData();
  }, [dispatch]);

  // 🔥 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    dispatch(showLoader());
    try {
      await createOrUpdateAdminPercentage(form);

      Swal.fire("Success", "Percentage updated successfully", "success");
      setIsEditing(false); // 🔥 save ke baad disable again
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err?.message || "Failed to update percentage",
        "error"
      );
    } finally {
      dispatch(hideLoader());
    }
  };

  return (
    <div className="bg-[#050816] text-white p-6 md:p-10 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Upload Withdrawal Percentage</h1>
            <p className="text-slate-400 text-sm">
              Set the percentage for withdrawals.
            </p>
          </div>

          {/* EDIT BUTTON */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 cursor-pointer rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
            >
              Edit
            </button>
          )}
        </div>

        {/* CARD */}
        <div className="bg-[#0b1220]/80 border border-[#1e293b] rounded-2xl p-6 space-y-6">

          {/* TOKEN */}
          <div>
            <label className="text-sm text-slate-400">Token %</label>
            <input
              type="number"
              name="tokenPercentage"
              value={form.tokenPercentage}
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
            <label className="text-sm text-slate-400">USDT %</label>
            <input
              type="number"
              name="usdtPercentage"
              value={form.usdtPercentage}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full mt-2 p-3 rounded-lg border ${
                isEditing
                  ? "bg-[#050816] border-[#1e293b]"
                  : "bg-gray-800 border-gray-700 cursor-not-allowed"
              }`}
            />
          </div>

          {/* BUTTONS */}
          {isEditing && (
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="w-full py-3 cursor-pointer rounded-xl bg-cyan-500 hover:bg-cyan-400 transition font-semibold"
              >
                Save Changes
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="w-full py-3 cursor-pointer rounded-xl bg-gray-600 hover:bg-gray-500 transition font-semibold"
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

export default UploadPercentage;