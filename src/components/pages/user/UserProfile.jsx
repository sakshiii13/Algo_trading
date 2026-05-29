import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
  addWalletAddress,
  getWalletAddress,
  changePassword,
} from "../../../api/user/user.api";
import Swal from "sweetalert2";
import {
  Camera,
  X,
  Copy,
  Wallet,
  Eye,
  EyeOff,
  CheckCircle,
  ChevronRight,
  User,
  Shield,
  Fingerprint,
} from "lucide-react";
import DashboardFooter from "../../UI/dashboard/DashboardFooter";

const TABS = [
  { label: "Profile", icon: User },
  { label: "Wallet", icon: Wallet },
  { label: "Security", icon: Shield },
];

// Global Dashboard Input styling
const inputCls =
  "w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-900 text-sm text-slate-100 placeholder-slate-700 outline-none focus:border-[#ff5d9f]/60 focus:ring-1 focus:ring-[#ff5d9f]/20 transition-all font-mono shadow-inner";

// ✅ 1. PasswordInput को UserProfile के बाहर शिफ्ट किया ताकि Focus न हटे
const PasswordInput = ({ label, field, stateKey, showPass, passwordData, setPasswordData, togglePass }) => (
  <div className="mb-5">
    <label className="block text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 mb-2">
      {label}
    </label>

    <div className="relative group">
      <input
        type={showPass[stateKey] ? "text" : "password"}
        value={passwordData[field]}
        onChange={(e) =>
          setPasswordData((prev) => ({
            ...prev,
            [field]: e.target.value,
          }))
        }
        placeholder="••••••••"
        className={inputCls}
      />

      <button
        type="button"
        onClick={() => togglePass(stateKey)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-[#ff5d9f] transition-colors cursor-pointer"
      >
        {showPass[stateKey] ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

// ✅ 2. ReadField को भी बाहर शिफ्ट करना बेहतर प्रैक्टिस है
const ReadField = ({ label, value }) => (
  <div>
    <label className="block text-[11px] font-bold font-mono uppercase tracking-wider text-slate-500 mb-2">
      {label}
    </label>
    <div className="px-4 py-3 bg-slate-950/40 rounded-xl text-sm text-slate-300 border border-slate-900/60 font-mono shadow-inner truncate">
      {value || <span className="text-slate-800">NOT_SET</span>}
    </div>
  </div>
);

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("Profile");
  const [profileData, setProfileData] = useState({ name: "", mobile: "", refferalCode: "" });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [walletAddress, setWalletAddress] = useState("");
  const [walletInput, setWalletInput] = useState("");
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletEditing, setWalletEditing] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passLoading, setPassLoading] = useState(false);

  const baseUrl = window.location.origin;
  
  const handleUserProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfileData({
        name: res?.data?.name || "",
        mobile: res?.data?.mobile || "",
        refferalCode: res?.data?.referralCode || "",
      });
      setPreview(res?.data?.profilePhoto || null);
    } catch (err) {
      console.error(err);
    }
  };
  const referralLink = `${baseUrl}/register?ref=${profileData.refferalCode}`;

  const handleGetWallet = async () => {
    try {
      const res = await getWalletAddress();
      const addr = res?.data || res?.data?.address || "";
      setWalletAddress(addr);
      setWalletInput(addr);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleUserProfile();
    handleGetWallet();
  }, []);

  const handleChange = (e) =>
    setProfileData({ ...profileData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("mobile", profileData.mobile);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      const res = await updateUserProfile(formData);
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          background: "#030712",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
        });
        setIsEditing(false);
        handleUserProfile();
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        background: "#030712",
        color: "#fff",
        customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWallet = async () => {
    if (!walletInput.trim()) {
      Swal.fire({
        icon: "error",
        title: "Enter valid wallet",
        background: "#030712",
        color: "#fff",
        customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
      });
      return;
    }
    setWalletLoading(true);
    try {
      const res = await addWalletAddress({ walletAddress: walletInput.trim() });
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Wallet Linked!",
          background: "#030712",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
        });
        setWalletAddress(walletInput.trim());
        setWalletEditing(false);
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to save wallet",
        background: "#030712",
        color: "#fff",
        customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
      });
    } finally {
      setWalletLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords don't match",
        background: "#030712",
        color: "#fff",
        customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
      });
      return;
    }

    setPassLoading(true);
    try {
      const res = await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res?.success) {
        Swal.fire({
          icon: "success",
          title: "Password Changed!",
          background: "#030712",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
          customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
        });
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err?.response?.data?.message || "Failed to change password",
        background: "#030712",
        color: "#fff",
        customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
      });
    } finally {
      setPassLoading(false);
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    Swal.fire({
      icon: "success",
      title: "Copied Link!",
      background: "#030712",
      color: "#fff",
      timer: 1200,
      showConfirmButton: false,
      customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
    });
  };

  const initials = profileData.name
    ? profileData.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const togglePass = (field) =>
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="bg-[#030712] p-4 md:p-8 space-y-8 text-slate-200 min-h-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] font-mono">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ── CORE HEADER INTERFACE ── */}
        <div className="bg-slate-950/40 rounded-2xl border border-slate-900/80 shadow-2xl p-6 md:p-8 overflow-hidden relative group backdrop-blur-xl">
          <div className="absolute -right-12 -top-12 text-slate-800/[0.04] rotate-12 group-hover:rotate-6 transition-transform duration-700 pointer-events-none">
            <Fingerprint size={260} />
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <div className="relative shrink-0">
                {preview ? (
                  <img
                    src={preview}
                    alt="avatar"
                    className="w-24 h-24 rounded-2xl object-cover ring-1 ring-slate-800 shadow-2xl"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#6a98e0]/20 to-[#ff5d9f]/20 border border-[#ff5d9f]/30 flex items-center justify-center text-[#ff5d9f] font-black text-3xl shadow-2xl">
                    {initials}
                  </div>
                )}
                {isEditing && (
                  <label className="absolute -bottom-2 -right-2 bg-[#ff5d9f] hover:bg-[#ff5d9f]/80 rounded-xl w-8 h-8 flex items-center justify-center cursor-pointer shadow-lg transition-all active:scale-90">
                    <Camera size={14} className="text-slate-950" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  {profileData.name || "UNIDENTIFIED_USER"}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {user?.email}
                </p>
                <div className="flex gap-2 flex-wrap justify-center sm:justify-start pt-1">
                  <span className="text-[10px] font-bold bg-slate-950 text-[#ff5d9f] border border-[#ff5d9f]/20 px-3 py-1 rounded-lg uppercase tracking-wider">
                    {user?.role || "USER_NODE"}
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 px-3 py-1 rounded-lg uppercase tracking-wider">
                    SECURE_LINK_ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Referral Matrix Section */}
            <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 max-w-md w-full shadow-inner backdrop-blur-md">
              <p className="text-[11px] font-bold text-[#6a98e0] uppercase tracking-wider mb-1">
                NETWORK_EXPANSION_LINK
              </p>
              <p className="text-[11px] text-slate-500 mb-3.5 leading-relaxed">
                Invite nodes to the architecture and generate ecosystem yields.
              </p>
              <div className="bg-slate-950 border border-slate-900 rounded-xl flex items-center gap-3 p-2">
                <span className="flex-1 text-[11px] text-slate-400 truncate px-2">
                  {referralLink}
                </span>
                <button
                  onClick={copyReferral}
                  className="bg-[#ff5d9f] cursor-pointer hover:bg-[#ff5d9f]/90 text-slate-950 rounded-lg px-4 py-1.5 text-[11px] font-bold uppercase flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-md shadow-[#ff5d9f]/10"
                >
                  <Copy size={13} /> COPY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── NAVIGATION SWITCHER ── */}
        <div className="flex gap-1.5 bg-slate-950/60 border border-slate-900/60 rounded-2xl p-1.5 w-fit shadow-inner">
          {TABS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeTab === label
                  ? "bg-[#6a98e0] text-slate-950 shadow-md shadow-[#6a98e0]/10"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/40"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* ── PROFILE ROUTE INTERFACE ── */}
        {activeTab === "Profile" && (
          <div className="bg-slate-950/20 rounded-2xl border border-slate-900/80 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-900">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <User size={16} className="text-[#ff5d9f]" />{" "}
                PERSONAL_CORE_INFORMATION
              </h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-900 hover:bg-slate-900 text-[11px] font-bold uppercase tracking-wider text-slate-300 transition-all cursor-pointer"
                >
                  EDIT_CORE
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-[#ff5d9f] hover:bg-[#ff5d9f]/90 disabled:opacity-50 text-[11px] font-bold uppercase tracking-wider text-slate-950 transition-all cursor-pointer"
                  >
                    {loading ? "SAVING..." : "COMMIT_CHANGES"}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      handleUserProfile();
                    }}
                    className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-950/30 text-rose-500 border border-slate-800 transition-all cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  label: "Full_Identity_Name",
                  name: "name",
                  placeholder: "Enter full system identity name",
                },
                {
                  label: "Mobile_Comm_Channel",
                  name: "mobile",
                  placeholder: "Enter dynamic comm line",
                },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    {label}
                  </label>
                  {isEditing ? (
                    <input
                      name={name}
                      value={profileData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className={inputCls}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-slate-950/40 rounded-xl text-sm text-slate-300 border border-slate-900/60 font-mono shadow-inner">
                      {profileData[name] || (
                        <span className="text-slate-800">UNDEFINED</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <ReadField label="Authenticated_Email" value={user?.email} />
              <ReadField label="System_Privileges" value={user?.role} />
              <ReadField label="Deployment_Tag" value={user?.referralCode} />
              <ReadField label="Node_Connectivity" value="STABLE_ACTIVE" />
            </div>
          </div>
        )}

        {/* ── WALLET TARGET LINK INTERFACE ── */}
        {activeTab === "Wallet" && (
          <div className="bg-slate-950/20 rounded-2xl border border-slate-900/80 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-xl">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              TARGET_DISBURSEMENT_VAULT
            </h3>
            <p className="text-[11px] text-slate-500 mb-6 uppercase tracking-wider">
              Linked cryptographic ledger destination for terminal volume distribution.
            </p>

            {walletAddress && !walletEditing && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-emerald-500/[0.01] border border-emerald-500/10 rounded-2xl p-5 mb-6 shadow-inner">
                <div className="p-2.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 shrink-0">
                  <CheckCircle size={18} className="text-emerald-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-emerald-500/40 uppercase tracking-wider mb-1">
                    ACTIVE_VAULT_SIGNATURE
                  </p>
                  <p className="text-sm md:text-base font-mono text-emerald-400 break-all leading-relaxed">
                    {walletAddress}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddress);
                    Swal.fire({
                      icon: "success",
                      title: "Copied Vault!",
                      background: "#030712",
                      color: "#fff",
                      timer: 1000,
                      showConfirmButton: false,
                      customClass: { popup: "border border-slate-850 rounded-2xl font-mono text-sm" }
                    });
                  }}
                  className="bg-slate-950 hover:bg-emerald-500 hover:text-slate-950 rounded-xl p-3 text-emerald-400 transition-all border border-slate-900 cursor-pointer self-end sm:self-auto shadow-sm"
                >
                  <Copy size={15} />
                </button>
              </div>
            )}

            {(walletEditing || !walletAddress) && (
              <div className="mb-6 max-w-2xl">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  {walletAddress ? "UPDATE_VAULT_ADDRESS" : "INITIALIZE_VAULT_ADDRESS"}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    value={walletInput}
                    onChange={(e) => setWalletInput(e.target.value)}
                    placeholder="Enter 0x or network destination contract"
                    className={`${inputCls} flex-1`}
                  />
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={handleSaveWallet}
                      disabled={walletLoading}
                      className="px-6 py-3 rounded-xl bg-[#ff5d9f] hover:bg-[#ff5d9f]/90 disabled:opacity-50 text-slate-950 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer w-full sm:w-auto"
                    >
                      {walletLoading ? "SYNCING..." : "SAVE_VAULT"}
                    </button>
                    {walletAddress && (
                      <button
                        onClick={() => {
                          setWalletEditing(false);
                          setWalletInput(walletAddress);
                        }}
                        className="px-3 py-3 rounded-xl bg-slate-900 hover:bg-rose-950/30 text-rose-500 border border-slate-800 transition-all cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {walletAddress && !walletEditing && (
              <button
                onClick={() => setWalletEditing(true)}
                className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-950/80 border border-slate-900 hover:bg-slate-900 text-[11px] font-bold uppercase tracking-wider text-slate-300 transition-all cursor-pointer"
              >
                MODIFY_VAULT_LINK{" "}
                <ChevronRight size={14} className="text-[#ff5d9f]" />
              </button>
            )}
          </div>
        )}

        {/* ── SECURITY SYSTEM KEY MODULE ── */}
        {activeTab === "Security" && (
          <div className="bg-slate-950/20 rounded-2xl border border-slate-900/80 shadow-2xl p-6 md:p-8 max-w-xl animate-in fade-in slide-in-from-bottom-2 duration-300 backdrop-blur-xl">
            <div className="mb-6 border-b border-slate-900 pb-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Shield size={16} className="text-amber-500" />{" "}
                SECURITY_OVERRIDE_PROTOCOL
              </h3>
              <p className="text-[11px] text-slate-500 mt-1.5 uppercase tracking-wider">
                Cyclic authority encryption key update channel.
              </p>
            </div>

            <form onSubmit={handleChangePassword}>
              <PasswordInput
                label="Current_Auth_Key"
                field="currentPassword"
                stateKey="current"
                showPass={showPass}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                togglePass={togglePass}
              />
              <PasswordInput
                label="New_Override_Key"
                field="newPassword"
                stateKey="new"
                showPass={showPass}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                togglePass={togglePass}
              />
              <PasswordInput
                label="Confirm_New_Key"
                field="confirmPassword"
                stateKey="confirm"
                showPass={showPass}
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                togglePass={togglePass}
              />

              {passwordData.newPassword && passwordData.confirmPassword && (
                <div
                  className={`mb-5 px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-wider border flex items-center gap-2 transition-all ${
                    passwordData.newPassword === passwordData.confirmPassword
                      ? "bg-emerald-500/[0.01] text-emerald-400 border-emerald-500/10"
                      : "bg-rose-500/[0.01] text-rose-500 border-rose-500/10"
                  }`}
                >
                  {passwordData.newPassword === passwordData.confirmPassword ? (
                    <>
                      <CheckCircle size={14} /> KEYS_MATCH_VERIFIED
                    </>
                  ) : (
                    <>
                      <X size={14} /> SECURITY_MISMATCH_DETECTED
                    </>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={passLoading}
                className="w-full py-3.5 rounded-xl bg-[#6a98e0] hover:bg-[#6a98e0]/90 disabled:opacity-50 text-slate-950 text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-[#6a98e0]/5 active:scale-[0.99]"
              >
                {passLoading ? "ENCRYPTING_KEYS..." : "COMMIT_NEW_KEY"}
              </button>
            </form>
          </div>
        )}
      </div>

      <DashboardFooter />
    </div>
  );
};

export default UserProfile;