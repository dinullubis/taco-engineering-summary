import React from 'react';

interface KPIcardProps {

title:string;

value:number|string;

unit?:string;

color?:string;

}

const KPIcard:React.FC<KPIcardProps>=({

title,

value,

unit,

color='text-cyan-400'

})=>{

return(

<div className="bg-[#1E293B] rounded-xl p-5 border border-slate-700">

<p className="text-slate-400 text-sm">

{title}

</p>


<div className="mt-4 flex items-end gap-2">

<h1 className={`text-4xl font-bold ${color}`}>

{value}

</h1>

<span className="text-slate-500">

{unit}

</span>

</div>

</div>

)

}


export default KPIcard;
