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
