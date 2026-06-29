import { DailyKPI, OpenWO, TopBreakdown } from "../types/kpi";

export const SPREADSHEET_ID =
"1iH_gZNJC5NDdbB1I9tK2sXbUWxcu4pPVZCchHMhlb5g";

export const SHEET_MASTER_KPI_HARIAN =
"MASTER_KPI_HARIAN";

export const SHEET_DATABASE_WO =
"DATABASE_WO";


export interface AreaBreakdown{
  area:string;
  count:number;
}

export interface WOTrend{
  date:string;
  open:number;
  close:number;
}

export interface DowntimeTrend{
  date:string;
  downtime:number;
}

export interface MTTRMTBFTrend{
  date:string;
  mttr:number;
  mtbf:number;
}

export interface WOSummary {
  woOpen: number;
  woClose: number;
  breakdown: number;
  downtime: number;
  mttr: number;
  mtbf: number;
}

// ================= KPI =================

export const getDailyKPI = async (): Promise<DailyKPI[]> => {

try{

const url=
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

attendanceRate:Number((row.c[5]?.v || 0)*100),

otJam:Number(row.c[6]?.v || 0),

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

export const getLatestDailyKPI = async (): Promise<DailyKPI> => {

  const data = await getDailyKPI();

  const latest = [...data]
    .reverse()
    .find(item =>
      item.woClose > 0 ||
      item.woOpen > 0 ||
      item.breakdown > 0 ||
      item.downtime > 0 ||
      item.otJam > 0
    );

  return latest ?? data[data.length - 1];

};



// ================= BREAKDOWN AREA =================

export const getBreakdownByArea = async():Promise<AreaBreakdown[]>=>{

try{

const url=
`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATABASE_WO}`;

const response=await fetch(url);

const text=await response.text();

const jsonString=text.substring(
text.indexOf("{"),
text.lastIndexOf("}")+1
);

const jsonData=JSON.parse(jsonString);

const rows=jsonData.table.rows;

const map:Record<string,number>={};

rows.forEach((row:any)=>{

if(!row?.c) return;

const area=String(row.c[7]?.v || "");

const status=String(row.c[9]?.v || "");

if(status==="BREAKDOWN"){

map[area]=(map[area]||0)+1;

}

});

return Object.keys(map).map(key=>({

area:key,

count:map[key]

}));

}

catch{

return[];

}

};


// ================= WO TREND =================

export const getWOTrend=async():Promise<WOTrend[]>=>{

const data=await getDailyKPI();

return data.map(item=>({

date:item.tanggal,

open:item.woOpen,

close:item.woClose

}));

};


// ================= DOWNTIME =================

export const getDowntimeTrend=async():Promise<DowntimeTrend[]>=>{

const data=await getDailyKPI();

return data.map(item=>({

date:item.tanggal,

downtime:item.downtime

}));

};


// ================= MTTR MTBF =================

export const getMTTRMTBF=async():Promise<MTTRMTBFTrend[]>=>{

const data=await getDailyKPI();

return data.map(item=>({

date:item.tanggal,

mttr:item.mttr,

mtbf:item.mtbf

}));

};


// ================= TOP BREAKDOWN =================

export const getTopBreakdown=async():Promise<TopBreakdown[]>=>{

try{

const url=
`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATABASE_WO}`;

const response=await fetch(url);

const text=await response.text();

const jsonString=text.substring(
text.indexOf("{"),
text.lastIndexOf("}")+1
);

const jsonData=JSON.parse(jsonString);

const rows=jsonData.table.rows;

const data:TopBreakdown[]=[];

rows.forEach((row:any)=>{

if(!row?.c) return;

const downtime=Number(row.c[19]?.v || 0);

if(downtime>0){

data.push({

area:String(row.c[7]?.v || ""),

machine:String(row.c[8]?.v || ""),

woNumber:String(row.c[0]?.v || ""),

problem:String(row.c[10]?.v || ""),

downtime:downtime,

mttr:Number(row.c[20]?.v || 0)

});

}

});

data.sort((a,b)=>b.downtime-a.downtime);

return data.slice(0,10);

}

catch{

return[];

}

};


// ================= OPEN WO =================

export const getOpenWO = async():Promise<OpenWO[]>=>{

try{

const url=
`https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATABASE_WO}`;

const response=await fetch(url);

const text=await response.text();

const jsonString=text.substring(
text.indexOf("{"),
text.lastIndexOf("}")+1
);

const jsonData=JSON.parse(jsonString);

const rows=jsonData.table.rows;

const data:OpenWO[]=[];

rows.forEach((row:any)=>{

if(!row?.c) return;

const status=String(row.c[13]?.v || "").trim();

if(status && status.toUpperCase()!=="CLOSE"){

data.push({

woNumber:String(row.c[0]?.v || ""),

area:String(row.c[7]?.v || ""),

machine:String(row.c[8]?.v || ""),

problem:String(row.c[10]?.v || ""),

picEngineer:String(row.c[14]?.v || ""),

status:status,

openDate:String(row.c[2]?.f || row.c[2]?.v || "")

});

}

});

return data;

}

catch(error){

console.log(error);

return [];

}

};
export const getWOSummary = async (): Promise<WOSummary> => {

  try {

    const url =
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATABASE_WO}`;

    const response = await fetch(url);
    const text = await response.text();

    const jsonString = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );

    const jsonData = JSON.parse(jsonString);
    const rows = jsonData.table.rows;

    let woOpen = 0;
    let woClose = 0;
    let breakdown = 0;
    let downtime = 0;
    let totalMTTR = 0;
    let mttrCount = 0;

    rows.forEach((row:any) => {

      if (!row?.c) return;

      const statusProgress = String(row.c[13]?.v || "")
        .trim()
        .toUpperCase();

      const statusWO = String(row.c[9]?.v || "")
        .trim()
        .toUpperCase();

      const downtimeValue = Number(row.c[19]?.v || 0);
      const mttrValue = Number(row.c[20]?.v || 0);

      if (statusProgress === "CLOSE") {
        woClose++;
      } else if (statusProgress !== "") {
        woOpen++;
      }

      if (statusWO === "BREAKDOWN") {
        breakdown++;
      }

      downtime += downtimeValue;

      if (mttrValue > 0) {
        totalMTTR += mttrValue;
        mttrCount++;
      }

    });

    return {

      woOpen,
      woClose,
      breakdown,
      downtime,
      mttr: mttrCount === 0 ? 0 : Number((totalMTTR / mttrCount).toFixed(2)),
      mtbf: 0

    };

  } catch (error) {

    console.log(error);

    return {

      woOpen: 0,
      woClose: 0,
      breakdown: 0,
      downtime: 0,
      mttr: 0,
      mtbf: 0

    };

  }

};

// ================= RAW DATA =================

export const getAllDailyKPI = async (): Promise<DailyKPI[]> => {
  return await getDailyKPI();
};

export interface WORow {
  woNumber: string;
  openDate: string;
  area: string;
  machine: string;
  statusWO: string;
  problem: string;
  statusProgress: string;
  picEngineer: string;
  downtime: number;
  mttr: number;
}

export const getAllWO = async (): Promise<WORow[]> => {

  try {

    const url =
      `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_DATABASE_WO}`;

    const response = await fetch(url);

    const text = await response.text();

    const jsonString = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1
    );

    const jsonData = JSON.parse(jsonString);

    const rows = jsonData.table.rows;

    return rows.map((row: any) => ({

      woNumber: String(row.c[0]?.v || ""),

      openDate: String(row.c[2]?.f || row.c[2]?.v || ""),

      area: String(row.c[7]?.v || ""),

      machine: String(row.c[8]?.v || ""),

      statusWO: String(row.c[9]?.v || ""),

      problem: String(row.c[10]?.v || ""),

      statusProgress: String(row.c[13]?.v || ""),

      picEngineer: String(row.c[14]?.v || ""),

      downtime: Number(row.c[19]?.v || 0),

      mttr: Number(row.c[20]?.v || 0)

    }));

  } catch (error) {

    console.log(error);

    return [];

  }

};

