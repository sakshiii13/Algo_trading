import React, { useEffect, useState } from "react";
import TableComponent from "../../UI/TableComponent";
import { getLevelIncomeHistoryApi } from "../../../api/user/user.api";

const columns = [
  { header: "Sno.", accessor: "id" },
  { header: "From User", accessor: "fromUser" },
  { header: "Level", accessor: "level" },
  { header: "Percentage", accessor: "percentage" },
  { header: "Reward Amount", accessor: "rewardAmount" },
  { header: "Bonus Amount", accessor: "bonusAmount" },
  { header: "Total Amount", accessor: "totalAmount" },
  { header: "Description", accessor: "description" },
  { header: "Date", accessor: "date" },
];

const IncomeHistory = () => {
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const fetchIncomeHistory = async () => {
    try {
      setLoading(true);

      const res = await getLevelIncomeHistoryApi();

      console.log("LEVEL INCOME HISTORY RESPONSE:", res);

      const apiData = Array.isArray(res?.data) ? res.data : [];

      const formattedData = apiData.map((item, index) => ({
        id: index + 1,

        fromUser:
          item?.fromUserId?.name ||
          item?.fromUserId?.email ||
          item?.fromUserId?.mobile ||
          "N/A",

        level: item?.level ? `Level ${item.level}` : "N/A",

        percentage:
          item?.percentage !== undefined && item?.percentage !== null
            ? `${item.percentage}%`
            : "0%",

        rewardAmount: `₹${item?.rewardAmount || 0}`,

        bonusAmount: `₹${item?.bonusAmount || 0}`,

        totalAmount: `₹${item?.totalAmount || 0}`,

        description: item?.description || "N/A",

        date: formatDate(item?.createdAt),
      }));

      setIncomeHistory(formattedData);
    } catch (error) {
      console.log("Income History Error:", error);
      setIncomeHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <TableComponent
        title={loading ? "Loading Income History..." : "Income History"}
        columns={columns}
        data={incomeHistory}
      />
    </div>
  );
};

export default IncomeHistory;