export interface KPI {

title:string;

value:number|string;

unit?:string;

trend?:string;

color?:string;

}



export interface DailyKPI {

tanggal:string;

attendanceRate:number;

otJam:number;

woClose:number;

woOpen:number;

breakdown:number;

downtime:number;

mttr:number;

mtbf:number;

}
export interface KPI {

  title:string;

  value:number|string;

  unit?:string;

  trend?:string;

  color?:string;

}

export interface DailyKPI {

  tanggal:string;

  attendanceRate:number;

  otJam:number;

  woClose:number;

  woOpen:number;

  breakdown:number;

  downtime:number;

  mttr:number;

  mtbf:number;

}


export interface OpenWO {

  woNumber:string;

  area:string;

  machine:string;

  problem:string;

  picEngineer:string;

  status:string;

  openDate:string;

}


export interface TopBreakdown {

  area:string;

  machine:string;

  woNumber:string;

  problem:string;

  downtime:number;

  mttr:number;

}
