import React, { useEffect, useState, useMemo } from "react";
// ... अन्य इम्पॉर्ट्स वही रहेंगे

const ReferralIncome = () => {
  const dispatch = useDispatch();
  const [referralHistory, setReferralHistory] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("all"); // 'all' या स्पेसिफिक लेवल

  // डेटा को लेवल के अनुसार ग्रुप करना
  const groupedData = useMemo(() => {
    const groups = referralHistory.reduce((acc, curr) => {
      const level = curr.level || 0;
      if (!acc[level]) acc[level] = [];
      acc[level].push(curr);
      return acc;
    }, {});
    return groups;
  }, [referralHistory]);

  const availableLevels = Object.keys(groupedData).sort((a, b) => a - b);

  // सिलेक्टेड लेवल के हिसाब से डेटा दिखाना
  const filteredData = useMemo(() => {
    if (selectedLevel === "all") return referralHistory;
    return groupedData[selectedLevel] || [];
  }, [selectedLevel, referralHistory, groupedData]);

  // ... (formatAmount, formatDate, getSafeArray वही रहेंगे)

  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#02040a] text-slate-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Dropdown */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5 border-b border-white/[0.06] pb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-wider text-white uppercase font-mono">
              LEVEL <span className="text-[#ff5d9f]">INCOME</span>
            </h1>
            <p className="text-xs text-slate-400 mt-2">Filter your network earnings by level.</p>
          </div>

          {/* Level Filter Dropdown */}
          <select 
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-[#0b1021] border border-white/10 text-white text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl focus:outline-none focus:border-[#ff5d9f]"
          >
            <option value="all">ALL LEVELS</option>
            {availableLevels.map(lvl => (
              <option key={lvl} value={lvl}>LEVEL {lvl}</option>
            ))}
          </select>
        </div>

        {/* ... StatCards वही रहेंगे ... */}

        {/* Ledger */}
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-[24px] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              {selectedLevel === "all" ? "TOTAL LEDGER" : `LEVEL ${selectedLevel} LEDGER`}
            </h3>
            <div className="text-[10px] font-bold text-slate-500 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
              Records: {filteredData.length}
            </div>
          </div>

          <div className="p-4 space-y-5">
            {filteredData.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">No data found for this level.</div>
            ) : (
              filteredData.map((item) => (
             
                <div key={item?._id} className="rounded-[22px] border border-white/[0.07] bg-white/[0.03] p-5">
                   {/* Card content code... */}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};