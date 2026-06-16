import React,{useEffect,useState} from "react";

import {

ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid

} from "recharts";

import {

getBreakdownByArea,
AreaBreakdown

} from "../services/googleSheetService";


function BreakdownChart(){

const [data,setData]=useState<AreaBreakdown[]>([]);


useEffect(()=>{

getBreakdownByArea().then(setData);

},[]);


return(

<div className="bg-[#1E293B] rounded-xl p-5 h-80">

<h3 className="text-white mb-4">

Breakdown by Area

</h3>

<ResponsiveContainer width="100%" height="90%">

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="area"/>

<YAxis/>

<Tooltip/>

<Bar

dataKey="count"

fill="#22D3EE"

/>

</BarChart>

</ResponsiveContainer>

</div>

)

}

export default BreakdownChart;
