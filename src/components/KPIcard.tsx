interface Props{

title:string;

value:number|string;

unit?:string;

color?:string;

}


function KPIcard({

title,

value,

unit,

color="text-cyan-400"

}:Props){

return(

<div className="bg-[#1E293B] rounded-xl p-5">

<p className="text-slate-400 text-sm">

{title}

</p>

<h2 className={`text-3xl font-bold mt-3 ${color}`}>

{value}

<span className="text-lg ml-1">

{unit}

</span>

</h2>

</div>

)

}


export default KPIcard;
