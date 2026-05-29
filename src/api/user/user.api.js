import { Axios } from "../../constant/MainContant";

// ==============================
// AUTH APIs
// ==============================

export const userLogin = async (data) => {
  try {
    const response = await Axios.post("/user/login", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ================= USER REGISTER =================

export const userRegister = async (data) => {
  try {
    console.log("REGISTER API PAYLOAD 👉", data);

    const response = await Axios.post("/user/register", data);

    console.log("REGISTER API RESPONSE 👉", response.data);

    return response.data;
  } catch (error) {
    console.log(
      "REGISTER API ERROR 👉",
      error?.response?.data || error.message
    );

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed",
    };
  }
};

export const forgetPassword = async (data) => {
  try {
    const response = await Axios.post("/user/forgot-password", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// PROFILE APIs
// ==============================

// USER PROFILE
export const getUserProfile = async () => {
  try {
    const res = await Axios.get("/user/profile");
    return res.data;
  } catch (error) {
    console.log("Get Profile Error:", error);
    throw error?.response?.data || error;
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (formData) => {
  try {
    const res = await Axios.put("/user/update-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.log("Update Profile Error:", error);
    throw error?.response?.data || error;
  }
};

// ADD / UPDATE WALLET ADDRESS
export const addWalletAddress = async (data) => {
  try {
    const res = await Axios.post("/user/add-walletAddress", data);
    return res.data;
  } catch (error) {
    console.log("Add Wallet Error:", error);
    throw error?.response?.data || error;
  }
};

// GET WALLET ADDRESS
export const getWalletAddress = async () => {
  try {
    const res = await Axios.get("/user/get-walletAddress");
    return res.data;
  } catch (error) {
    console.log("Get Wallet Error:", error);
    throw error?.response?.data || error;
  }
};

// CHANGE PASSWORD
export const changePassword = async (data) => {
  try {
    const res = await Axios.post("/user/change-password", data);
    return res.data;
  } catch (error) {
    console.log("Change Password Error:", error);
    throw error?.response?.data || error;
  }
};

// ==============================
// DASHBOARD API
// ==============================

export const getUserDashboardStats = async () => {
  try {
    const response = await Axios.get("/user/dashboard");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// WALLET APIs
// ==============================

// export const addWalletAddress = async (data) => {
//   try {
//     const response = await Axios.post("/user/add-walletAddress", data);
//     return response.data;
//   } catch (error) {
//     return error.response?.data || { success: false, message: error.message };
//   }
// };

// export const getWalletAddress = async () => {
//   try {
//     const response = await Axios.get("/user/get-walletAddress");
//     return response.data;
//   } catch (error) {
//     return error.response?.data || { success: false, message: error.message };
//   }
// };

export const adminWalletAddress = async () => {
  try {
    const response = await Axios.get(
      "/user/get-admin-wallet-address"
    );

    return response.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: error.message,
      }
    );
  }
};

// ==============================
// REFERRAL APIs
// ==============================

export const getMyReferrals = async () => {
  try {
    const response = await Axios.get("/user/my-referrals");

    return response.data;
  } catch (error) {
    console.log("GET MY REFERRALS API ERROR 👉", error);

    return {
      success: false,
      message:
        error?.response?.data?.message || "Failed to fetch referrals",
    };
  }
};

export const getMyDownline = async () => {
  try {
    const response = await Axios.get("/user/my-downline");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const getUserReferralHistory = async () => {
  try {
    const response = await Axios.get("/user/get-referral-history");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// INVESTMENT APIs
// ==============================

export const userInvestment = async (data) => {
  try {
    const response = await Axios.post("/user/investment", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const makeInvestment = userInvestment;

export const getMyInvestment = async () => {
  try {
    const response = await Axios.get("/user/my-investment");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// WITHDRAWAL APIs
// ==============================

export const sendOtpForWithdrwal = async () => {
  try {
    const response = await Axios.get("/user/send-otp");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const processWithdrawal = async (data) => {
  try {
    const response = await Axios.post("/user/payout-request", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const withdrawalHistory = async () => {
  try {
    const response = await Axios.get("/user/withdrawals-history");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// SUPPORT APIs
// ==============================

export const helpAndSupport = async (data) => {
  try {
    const response = await Axios.post("/user/support/create", data);
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const getAllHelpAndSupportHistory = async () => {
  try {
    const response = await Axios.get("/user/support/messages");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ==============================
// ROI APIs
// ==============================

export const getUserROIHistory = async () => {
  try {
    const response = await Axios.get("/user/get-roi-history");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const getRoiOnRoiHistory = async () => {
  try {
    const response = await Axios.get("/user/get-roi-on-roi-history");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

// ===============================
// GET LEVEL INCOME HISTORY API
// ===============================

export const getLevelIncomeHistoryApi = async () => {
  try {
    const response = await Axios.get("/user/level-income-history");

    return response.data;
  } catch (error) {
    console.log("GET LEVEL INCOME HISTORY API ERROR 👉", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to fetch level income history",
      data: [],
    };
  }
};

// ==============================
// TOKEN / RATE APIs
// ==============================

export const getAdminPercentage = async () => {
  try {
    const response = await Axios.get("/user/get-token-percentage");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};

export const getUsdtRate = async () => {
  try {
    const response = await Axios.get("/user/get-rate");
    return response.data;
  } catch (error) {
    return error.response?.data || { success: false, message: error.message };
  }
};