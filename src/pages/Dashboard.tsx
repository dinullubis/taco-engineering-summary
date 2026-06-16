import KPIcard from "../components/KPIcard";
import BreakdownChart from "../components/BreakdownChart";

function Dashboard(){

return(

<div className="min-h-screen bg-[#0F172A] p-6">

<h1 className="text-white text-4xl font-bold">

TACO Engineering Summary

</h1>


<p className="text-slate-400 mt-2">

Engineering KPI & Maintenance Monitoring

</p>



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

<KPIcard
title="Attendance Rate"
value="96.5"
unit="%"
/>

<KPIcard
title="OT Hours"
value="145"
unit="hrs"
color="text-orange-400"
/>

<KPIcard
title="WO Close"
value="87"
/>

<KPIcard
title="WO Open"
value="12"
color="text-red-400"
/>

<KPIcard
title="Breakdown"
value="5"
unit="cases"
color="text-orange-500"
/>

<KPIcard
title="Downtime"
value="320"
unit="min"
color="text-red-500"
/>

<KPIcard
title="MTTR"
value="1.5"
unit="hrs"
/>

<KPIcard
title="MTBF"
value="140"
unit="hrs"
color="text-green-400"
/>

</div>
<div className="mt-8">

  <BreakdownChart/>

</div>
</div>

)

}


export default Dashboard;
