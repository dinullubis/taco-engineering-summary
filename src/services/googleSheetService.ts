import { DailyKPI, OpenWO, TopBreakdown } from "../types/kpi";

export const SPREADSHEET_ID =
"1iH_gZNJC5NDdbB1I9tK2sXbUWxcu4pPVZCchHMhlb5g";

export const SHEET_MASTER_KPI_HARIAN =
"MASTER_KPI_HARIAN";

export const SHEET_DATABASE_WO =
"DATABASE_WO";


export const getDailyKPI = async (): Promise<DailyKPI[]> => {

try{

const url =
`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_MASTER_KPI_HARIAN}`;

const response=await fetch(url);

const text=await response.text();

const jsonString=text.substring(
text.indexOf("{"),
text.lastIndexOf("}")+1
);

const jsonData=JSON.parse(jsonString);


return jsonData.table.rows.map((row:any)=>({

tanggal:String(row.c[0]?.f || row.c[0]?.v || ""),

attendanceRate:Number(row.c[1]?.v || 0),

otJam:Number(row.c[2]?.v || 0),

woClose:Number(row.c[7]?.v || 0),

breakdown:Number(row.c[8]?.v || 0),

downtime:Number(row.c[9]?.v || 0),

mttr:Number(row.c[10]?.v || 0),

woOpen:Number(row.c[11]?.v || 0),

mtbf:Number(row.c[12]?.v || 0)

}));

}

catch(error){

console.log(error);

return [];

}

};



export const getLatestDailyKPI = async()=>{

const data=await getDailyKPI();

return data[data.length-1];

};
