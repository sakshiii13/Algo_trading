import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./auth/Home/Home";
import { AdminRouters, Routers, UserRouters } from "../constant/router";
import MainLayout from "./Layout/MainLayout";
import Login from "./auth/Login";
import PageNotFound from "./UI/PageNotFound";
import DashboardLayout from "./Layout/DashboardLayout";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import IncomeHistory from "./pages/user/IncomeHistory";
import Register from "./auth/Register";
import AdminLogin from "./auth/AdminLogin";
import UserProfile from "./pages/user/UserProfile";
import MyReffrals from "./pages/user/MyReffrals";
import MyDownline from "./pages/user/MyDownline";
import MakeInvestment from "./pages/user/MakeInvestment";
import Withdrawal from "./pages/user/Withdrawal";
import HelpAndSupport from "./pages/user/HelpAndSupport";
import AllUsers from "./pages/admin/AllUsers";
import QueryList from "./pages/admin/QueryList";
import InvestmentHistory from "./pages/admin/InvestmentHistory";
import WithdrawalHistory from "./pages/admin/WithdrawalHistory";
import ReferralIncom from "./pages/user/ReferralIncom";
import RoiIncome from "./pages/user/RoiIncome";
import UserReferralHistory from "./pages/admin/UserReferralHistory";
import UserRoiHistory from "./pages/admin/UserRoiHistory";
import LevelRoiIncome from "./pages/user/LevelRoiIncome";
import SetPercentage from "./pages/admin/SetPercentage";
import UploadPercentage from "./pages/admin/UploadPercentage";
import SetTokenPercentage from "./pages/admin/SetTokenPercentage";
import ForgatePassword from "./auth/ForgatePassword";
import AddWalletAddress from "./pages/admin/AddWalletAddress";

const RouterPage = () => {
  return (
    <div>
      <Routes>
        <Route path={Routers.LOGIN} element={<Login />} />
        <Route path={Routers.FORGATE_PASSWORD} element={<ForgatePassword />} />
        <Route path={Routers.REGISTER} element={<Register />} />
        <Route path={Routers.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route element={<MainLayout />}>
          <Route path={Routers.HOME} element={<Home />} />
          {/* <Route path={Routers.ABOUT} element={<About />} /> */}
        </Route>
        <Route path="*" element={<PageNotFound />} />

        <Route element={<DashboardLayout />}>
          {/* User Routes  */}
          <Route path={UserRouters.DASHBOARD} element={<UserDashboard />} />
          <Route
            path={UserRouters.INCOME_HISTORY}
            element={<IncomeHistory />}
          />
          <Route path={UserRouters.PROFILE} element={<UserProfile />} />
          <Route path={UserRouters.MY_REFERRALS} element={<MyReffrals />} />
          <Route path={UserRouters.MY_DOWNLINE} element={<MyDownline />} />
          <Route path={UserRouters.INVESTMENT} element={<MakeInvestment />} />
          <Route path={UserRouters.WITHDRAWAL} element={<Withdrawal />} />
          <Route
            path={UserRouters.HELP_AND_SUPPORT}
            element={<HelpAndSupport />}
          />
          <Route path={UserRouters.REFERRAL_INCOME} element={<ReferralIncom />} />
          <Route path={UserRouters.ROI_HISTORY} element={<RoiIncome />} />
          <Route path={UserRouters.ROI_ON_ROI_HISTORY} element={<LevelRoiIncome />} />


          {/* Admin Routes */}
          <Route path={AdminRouters.DASHBOARD} element={<AdminDashboard />} />
          <Route path={AdminRouters.USERS} element={<AllUsers />} />
          <Route path={AdminRouters.SUPPORT_TICKETS} element={<QueryList />} />
          <Route path={AdminRouters.INVESTMENT_HISTORY} element={<InvestmentHistory />} />
          <Route path={AdminRouters.WITHDRAWAL_REQUESTS} element={<WithdrawalHistory />} />
          <Route path={AdminRouters.REFERRAL_HISTORY} element={<UserReferralHistory />} />
          <Route path={AdminRouters.ROI_HISTORY} element={<UserRoiHistory />} />
          <Route path={AdminRouters.SET_PERCENTAGE} element={<SetPercentage />} />
          <Route path={AdminRouters.WITHDRAWAL_PERCENTAGE} element={<UploadPercentage />} />
          <Route path={AdminRouters.TOKEN_PERCENTAGE} element={<SetTokenPercentage />} />
          <Route path={AdminRouters.ADD_WALLET_ADDRESS} element={<AddWalletAddress />} />
          {/* <Route path={UserRouters.GET_PERCENTAGE} element={<GetPercentage />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default RouterPage;
