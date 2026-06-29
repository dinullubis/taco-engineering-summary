import React, { useEffect, useState } from "react";

import KPIcard from "../components/KPIcard";
import BreakdownChart from "../components/BreakdownChart";
import WOTrendChart from "../components/WOTrendChart";
import DowntimeChart from "../components/DowntimeChart";
import MTTRMTBFChart from "../components/MTTRMTBFChart";
import TopBreakdownTable from "../components/TopBreakdownTable";
import OpenWOTable from "../components/OpenWOTable";
import {
  getLatestDailyKPI,
  getWOSummary,
  getAllDailyKPI,
  getAllWO,
  WORow
} from "../services/googleSheetService";

import { DailyKPI } from "../types/kpi";

function Dashboard() {

  const [kpi, setKpi] = useState<DailyKPI | null>(null);
  const [summary, setSummary] = useState<any>(null);
  const [dailyData, setDailyData] = useState<DailyKPI[]>([]);
const [woData, setWOData] = useState<WORow[]>([]);
const [filteredDaily, setFilteredDaily] = useState<DailyKPI[]>([]);
const [filteredWO, setFilteredWO] = useState<WORow[]>([]);
  
  // Filter Date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

  const [latest, woSummary, daily, wo] = await Promise.all([
  getLatestDailyKPI(),
  getWOSummary(),
  getAllDailyKPI(),
  getAllWO()
]);

setKpi(latest);
setSummary(woSummary);

setDailyData(daily);
setWOData(wo);  
setFilteredDaily(daily);
setFilteredWO(wo);
    
  };

  return (

    <div className="min-h-screen bg-[#0F172A] p-6">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-white text-4xl font-bold">
          TACO Engineering Summary
        </h1>

        <p className="text-slate-400 mt-2">
          Engineering KPI & Maintenance Monitoring
        </p>

        <p className="text-cyan-400 mt-3">
          Latest : {kpi?.tanggal}
        </p>

        {/* FILTER */}

        <div className="flex flex-wrap gap-5 mt-6">

          <div>

            <label className="block text-slate-400 text-sm mb-2">
              Start Date
            </label>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-[#1E293B] text-white px-4 py-2 rounded-lg border border-slate-600"
            />

          </div>

          <div>

            <label className="block text-slate-400 text-sm mb-2">
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-[#1E293B] text-white px-4 py-2 rounded-lg border border-slate-600"
            />

          </div>

          <div className="flex items-end">

            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-lg"
            >
              Apply Filter
            </button>

          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <KPIcard
          title="Attendance Rate"
          value={kpi?.attendanceRate || 0}
          unit="%"
        />

        <KPIcard
          title="OT Hours"
          value={kpi?.otJam || 0}
          unit="hrs"
          color="text-orange-400"
        />

        <KPIcard
          title="WO Close"
          value={summary?.woClose || 0}
        />

        <KPIcard
          title="WO Open"
          value={summary?.woOpen || 0}
          color="text-red-400"
        />

        <KPIcard
          title="Breakdown"
          value={summary?.breakdown || 0}
          unit="cases"
          color="text-orange-500"
        />

        <KPIcard
          title="Downtime"
          value={summary?.downtime || 0}
          unit="min"
          color="text-red-500"
        />

        <KPIcard
          title="MTTR"
          value={summary?.mttr || 0}
          unit="hrs"
        />

        <KPIcard
          title="MTBF"
          value={summary?.mtbf || 0}
          unit="hrs"
          color="text-green-400"
        />

      </div>

      {/* CHART */}

      <div className="mt-8">
        <BreakdownChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <WOTrendChart />
        <DowntimeChart />
      </div>

      <div className="mt-8">
        <MTTRMTBFChart />
      </div>

      {/* TABLE */}

      <div className="mt-8">
        <TopBreakdownTable />
      </div>

      <div className="mt-8">
        <OpenWOTable />
      </div>

    </div>

  );

}

export default Dashboard;
