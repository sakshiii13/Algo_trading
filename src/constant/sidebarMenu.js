import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdSupportAgent,
  MdHistory,
  MdTrendingUp,
  MdAccountBalanceWallet,
} from "react-icons/md";
import { RiExchangeDollarLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { BsGraphUpArrow } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

import { FaUsers } from "react-icons/fa";

import { AdminRouters, UserRouters } from "./router";
import { Children } from "react";

export const sidebarMenu = {
  user: [
    {
      title: "Dashboard",
      path: UserRouters.DASHBOARD,
      icon: MdDashboard,
    },
    {
      title: "Profile",
      path: UserRouters.PROFILE,
      icon: MdPerson,
    },
    {
      title: "My Network",
      icon: FaUsers,
      children: [
        {
          title: "Referrals",
          path: UserRouters.MY_REFERRALS,
        },
        {
          title: "My Downlines",
          path: UserRouters.MY_DOWNLINE,
        },
      ],
    },
    {
      title: "Income History",
      icon: MdHistory,
      children: [
        {
          title: "Level Income",
          path: UserRouters. LEVEL_INCOME,
        },
        
      ],
    },
    {
      title: "Investment",
      path: UserRouters.INVESTMENT,
      icon: MdTrendingUp,
    },
    {
      title: "Withdrawal",
      path: UserRouters.WITHDRAWAL,
      icon: MdAccountBalanceWallet,
    },

    {
      title: "Help and Support",
      path: UserRouters.HELP_AND_SUPPORT,
      icon: MdSettings,
    },
  ],

  admin: [
    {
      title: "Dashboard",
      path: AdminRouters.DASHBOARD,
      icon: MdDashboard,
    },
    {
      title: "Users",
      path: AdminRouters.USERS,
      icon: FaUsers,
    },
    {
      title: "Set Percentages",
      path: AdminRouters.SET_PERCENTAGE,
      icon: MdSettings,
    },
    {
      title: "Add Wallet Address",
      path: AdminRouters.ADD_WALLET_ADDRESS,
      icon: MdAccountBalanceWallet,
    },
    {
      title: "Support Tickets",
      path: AdminRouters.SUPPORT_TICKETS,
      icon: MdSupportAgent,
    },
    {
      title: "Referral Income",
      path: AdminRouters.REFERRAL_HISTORY,
      icon: GiReceiveMoney,
    },
    {
      title: "ROI Income",
      path: AdminRouters.ROI_HISTORY,
      icon: BsGraphUpArrow,
    },
    {
      title: "Investment History",
      path: AdminRouters.INVESTMENT_HISTORY,
      icon: RiExchangeDollarLine,
    },
    {
      title: "Set Token Percentage",
      path: AdminRouters.TOKEN_PERCENTAGE,
      icon: MdSettings,
    },
    {
      title: "Withdrawal Percentage",
      path: AdminRouters.WITHDRAWAL_PERCENTAGE,
      icon: MdAccountBalanceWallet,
    },
    {
      title: "Withdrawal Requests",
      path: AdminRouters.WITHDRAWAL_REQUESTS,
      icon: HiOutlineCurrencyDollar,
    },
  ],
};
