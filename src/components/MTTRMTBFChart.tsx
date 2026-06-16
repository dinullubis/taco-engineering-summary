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

getMTTRMTBF,
MTTRMTBFTrend

} from "../services/googleSheetService";


function MTTRMTBFChart(){

const [data,setData]=useState<MTTRMTBFTrend[]>([]);


useEffect(()=>{

getMTTRMTBF().then(setData);

},[]);


return(

<div className="bg-[#1E293B] rounded-xl p-5 h-80">

<h3 className="text-white mb-4">

MTTR vs MTBF

</h3>

<ResponsiveContainer width="100%" height="90%">

<LineChart data={data}>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>


<Line

dataKey="mttr"

stroke="#22D3EE"

strokeWidth={3}

/>


<Line

dataKey="mtbf"

stroke="#10B981"

strokeWidth={3}

/>


</LineChart>

</ResponsiveContainer>

</div>

)

}


export default MTTRMTBFChart;
