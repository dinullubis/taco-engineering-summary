import React,{useEffect,useState} from "react";

import KPIcard from "../components/KPIcard";
import BreakdownChart from "../components/BreakdownChart";
import WOTrendChart from "../components/WOTrendChart";
import DowntimeChart from "../components/DowntimeChart";
import MTTRMTBFChart from "../components/MTTRMTBFChart";
import TopBreakdownTable from "../components/TopBreakdownTable";
import OpenWOTable from "../components/OpenWOTable";

import {
  getLatestDailyKPI,
  getWOSummary
} from "../services/googleSheetService";

import {DailyKPI} from "../types/kpi";


function Dashboard(){

const [kpi,setKpi]=useState<DailyKPI|null>(null);
const [summary,setSummary]=useState<any>(null);
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
useEffect(() => {

  getLatestDailyKPI().then(setKpi);

  getWOSummary().then(setSummary);

}, []);
console.log("KPI STATE :", kpi);
return(

<div className="min-h-screen bg-[#0F172A] p-6">

<div className="mb-8">

<h1 className="text-white text-4xl font-bold">

TACO Engineering Summary

</h1>

<p className="text-slate-400 mt-2">

Engineering KPI & Maintenance Monitoring

</p>

<p className="text-cyan-400 mt-3">

Latest :

{kpi?.tanggal}

</p>
<div className="flex gap-4 mt-5 flex-wrap">

  <div>

    <label className="text-slate-400 text-sm block mb-1">
      Start Date
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e)=>setStartDate(e.target.value)}
      className="bg-[#1E293B] text-white rounded-lg px-3 py-2"
    />

  </div>

  <div>

    <label className="text-slate-400 text-sm block mb-1">
      End Date
    </label>

    <input
      type="date"
      value={endDate}
      onChange={(e)=>setEndDate(e.target.value)}
      className="bg-[#1E293B] text-white rounded-lg px-3 py-2"
    />

  </div>

</div>
</div>


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


<div className="mt-8">

<BreakdownChart/>

</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

<WOTrendChart/>

<DowntimeChart/>

</div>


<div className="mt-8">

<MTTRMTBFChart/>

</div>


<div className="mt-8">

<TopBreakdownTable/>

</div>


<div className="mt-8">

<OpenWOTable/>

</div>


</div>

)

}


export default Dashboard;
