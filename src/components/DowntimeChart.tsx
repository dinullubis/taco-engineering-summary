import React,{useEffect,useState} from "react";

import {

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip

} from "recharts";


import {

getDowntimeTrend,
DowntimeTrend

} from "../services/googleSheetService";


function DowntimeChart(){

const [data,setData]=useState<DowntimeTrend[]>([]);


useEffect(()=>{

getDowntimeTrend().then(setData);

},[]);


return(

<div className="bg-[#1E293B] rounded-xl p-5 h-80">

<h3 className="text-white mb-4">

Downtime Trend

</h3>

<ResponsiveContainer width="100%" height="90%">

<LineChart data={data}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>

<Line

dataKey="downtime"

stroke="#EF4444"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>

)

}


export default DowntimeChart;
