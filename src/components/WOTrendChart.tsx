import React,{useEffect,useState} from "react";

import {

ResponsiveContainer,
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid

} from "recharts";

import {

getWOTrend,
WOTrend

} from "../services/googleSheetService";


function WOTrendChart(){

const [data,setData]=useState<WOTrend[]>([]);


useEffect(()=>{

getWOTrend().then(setData);

},[]);


return(

<div className="bg-[#1E293B] rounded-xl p-5 h-80">

<h3 className="text-white mb-4">

WO Trend

</h3>

<ResponsiveContainer width="100%" height="90%">

<LineChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="date"/>

<YAxis/>

<Tooltip/>


<Line

dataKey="close"

stroke="#22D3EE"

strokeWidth={3}

/>


<Line

dataKey="open"

stroke="#F97316"

strokeWidth={3}

/>


</LineChart>

</ResponsiveContainer>

</div>

)

}

export default WOTrendChart;
