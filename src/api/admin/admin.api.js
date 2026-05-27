import { Axios } from "../../constant/MainContant";

// router.post("/login", adminLogin);
export const adminLogin = async (data) => {
  try {
    const res = await Axios.post("/admin/login", data);
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.get("/all-users" , isAdminAuthenticated , allUsers)
export const getAllUsers = async () => {
  try {
    const res = await Axios.get("/admin/all-users");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.post("/active-user" , isAdminAuthenticated ,activateUserByAdmin)
// const { userId, amount } = req.body;
export const activateUserByAdmin = async (userId, amount) => {
  try {
    const res = await Axios.post("/admin/active-user", { userId, amount });
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const toggleUserBlockStatus = async (userId, block) => {
  try {
    const res = await Axios.post("/admin/toggle-user-block", {
      userId,
      block,
    });

    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.get("/all-investment" , isAdminAuthenticated , getTotalInvestedUsers)
export const getTotalInvestedUsers = async () => {
  try {
    const res = await Axios.get("/admin/all-investment");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const getAllSupportTickets = async () => {
  try {
    const res = await Axios.get("/admin/all-query");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const approveSupportTicket = async (ticketId, message) => {
  try {
    const res = await Axios.post(`/admin/support/status/approve/${ticketId}`, {
      message,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { success: false };
  }
};

export const rejectSupportTicket = async (ticketId, message) => {
  try {
    const res = await Axios.post(`/admin/support/status/reject/${ticketId}`, {
      message,
    });
    return res.data;
  } catch (error) {
    return error.response?.data || { success: false };
  }
};

// router.get("/all-withdrawal" , isAdminAuthenticated , getAllWithdrawal)
export const getAllWithdrawal = async () => {
  try {
    const res = await Axios.get("/admin/all-withdrawal");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.post("/withdrawal-approve", isAdminAuthenticated, approveWithdrawal);
export const approveWithdrawal = async (withdrawalId) => {
  try {
    const res = await Axios.post("/admin/withdrawal-approve", { withdrawalId });
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.post("/withdrawal-reject", isAdminAuthenticated, rejectWithdrawal);
export const rejectWithdrawal = async (withdrawalId) => {
  try {
    const res = await Axios.post("/admin/withdrawal-reject", { withdrawalId });
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.get("/get-roi-history" , isAdminAuthenticated , getAdminROIHistory)
export const getAdminROIHistory = async () => {
  try {
    const res = await Axios.get("/admin/get-roi-history");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.get("/get-referral-history" , isAdminAuthenticated , getAdminReferralHistory)
export const getAdminReferralHistory = async () => {
  try {
    const res = await Axios.get("/admin/get-referral-history");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

// router.get("/dashboard" , isAdminAuthenticated , getAdminDashboardStats)
export const getAdminDashboardStats = async () => {
  try {
    const res = await Axios.get("/admin/dashboard");
    return res.data;
  } catch (error) {
    return (
      error.response?.data || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
};

export const setPercentageApi = async (payload) => {
  try {
    const res = await Axios.post("/admin/set-percentage", payload);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPercentageApi = async () => {
  try {
    const res = await Axios.get("/admin/get-percentage");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// router.post("/add-token-percentage" , isAdminAuthenticated , createOrUpdateAdminPercentage)
export const createOrUpdateAdminPercentage = async (payload) => {
  try {
    const res = await Axios.post("/admin/add-token-percentage", payload);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// router.get("/get-token-percentage" , isAdminAuthenticated , getAdminPercentage)
export const getAdminPercentage = async () => {
  try {
    const res = await Axios.get("/admin/get-token-percentage");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// router.post("/set-rate",isAdminAuthenticated, upsertUsdtRate); // create/update
export const upsertUsdtRate = async (rate) => {
  try {
    const res = await Axios.post("/admin/set-rate",  rate );
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// router.get("/get-rate",isAdminAuthenticated, getUsdtRate);
export const getUsdtRate = async () => {
  try {
    const res = await Axios.get("/admin/get-rate");
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};


// router.post("/add-wallet-address" , isAdminAuthenticated , addWalletAddress)
export const addWalletAddress = async (walletAddress) => {
  try {
    const res = await Axios.post("/admin/add-wallet-address", { walletAddress });
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};  

// router.get("/get-wallet-address" , isAdminAuthenticated , myWalletAddress)
export const myWalletAddress = async () => {
  try {
    const res = await Axios.get("/admin/get-wallet-address");
    return res.data;
  }
  catch (error) {
    return error.response.data;
  }
};
