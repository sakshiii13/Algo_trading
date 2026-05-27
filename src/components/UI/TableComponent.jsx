import React, { useState } from "react";
import { Search, Database, AlertCircle } from "lucide-react";

const TableComponent = ({
  title = "Data_Log",
  columns = [],
  data = [],
  showSearch = true,
}) => {
  const [search, setSearch] = useState("");

  const filteredData = showSearch
    ? data.filter((row) =>
        columns.some((col) =>
          String(row[col.accessor] || "")
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )
    : data;

  return (
    <div className="relative bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-2xl rounded-[24px] border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300">
      
      {/* ── TOP DECORATIVE NEON LINE ── */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff5d9f]/40 to-transparent" />

      {/* ── HEADER & FILTERS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 md:p-6 border-b border-white/5 bg-white/[0.01]">
        
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-[#ff5d9f]/5 border border-[#ff5d9f]/10 rounded-xl">
            <Database size={16} className="text-[#ff5d9f]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-white font-mono">
              {title}
            </h2>
            <p className="text-[10px] text-slate-500 font-mono tracking-wide">SYSTEM_ARCHIVE_NODE</p>
          </div>
        </div>

        {showSearch && (
          <div className="relative w-full sm:w-72 group">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#ff5d9f] transition-colors duration-300"
              size={14}
            />
            <input
              type="text"
              placeholder="FILTER_RECORDS..."
              className="w-full pl-10 pr-4 py-2.5 text-[11px] font-mono bg-black/40 border border-white/5 focus:border-[#ff5d9f]/30 rounded-xl text-white placeholder:text-slate-600 outline-none focus:ring-1 focus:ring-[#ff5d9f]/10 transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* ── SCROLLABLE CANVAS ── */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-white/5">
        <table className="w-full text-left border-collapse">
          
          {/* THEAD PANEL */}
          <thead className="bg-white/[0.01] text-slate-400 font-mono">
            <tr>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 text-[10px] font-bold tracking-[0.15em] uppercase border-b border-white/5 text-slate-500 select-none"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* TBODY CONTENT */}
          <tbody className="divide-y divide-white/[0.01] text-[13px]">
            {filteredData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="relative border-b border-white/[0.02] hover:bg-gradient-to-r hover:from-white/[0.02] hover:to-transparent transition-all duration-200 group"
              >
                {columns.map((col, colIndex) => {
                  const value = row[col.accessor];

                  return (
                    <td 
                      key={colIndex} 
                      className="px-6 py-4 text-slate-300 group-hover:text-white transition-colors duration-150 relative"
                    >
                      {/* Left border highlight logic on row hover */}
                      {colIndex === 0 && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-2/3 bg-[#ff5d9f] rounded-r-full transition-all duration-300" />
                      )}

                      {/* Content Pipeline Render */}
                      {col.render ? (
                        col.render(value, row, rowIndex)
                      ) : col.type === "badge" ? (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[11px] font-bold tracking-wide ${
                            value > 0
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                              : "bg-red-500/10 text-red-400 border border-red-500/10"
                          }`}
                        >
                          {value > 0 ? "+" : ""}{value}%
                        </span>
                      ) : (
                        <span className="font-medium tracking-wide">
                          {value !== undefined && value !== null ? String(value) : "---"}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* EMPTY / NULL SCREEN LOGIC */}
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-14 px-6 select-none"
                >
                  <div className="flex flex-col items-center justify-center gap-3 max-w-sm mx-auto">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-slate-600 animate-pulse">
                      <AlertCircle size={20} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold font-mono text-slate-400 uppercase tracking-[0.15em]">
                        Null_Results_Returned
                      </p>
                      <p className="text-[11px] text-slate-600 font-mono">
                        No matching terminal signatures found matching current buffer query.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;