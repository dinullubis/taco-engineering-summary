import React, { useEffect, useState } from "react";

import { TopBreakdown } from "../types/kpi";
import { getTopBreakdown } from "../services/googleSheetService";

function TopBreakdownTable() {

  const [data, setData] = useState<TopBreakdown[]>([]);

  useEffect(() => {
    getTopBreakdown().then(setData);
  }, []);

  return (

    <div className="bg-[#1E293B] rounded-xl p-5">

      <h3 className="text-white text-lg font-semibold mb-4">
        Top Breakdown Machine
      </h3>

      <div className="overflow-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-slate-700 text-slate-300">

              <th className="text-left p-2">WO</th>
              <th className="text-left p-2">Area</th>
              <th className="text-left p-2">Machine</th>
              <th className="text-left p-2">Problem</th>
              <th className="text-right p-2">Downtime</th>
              <th className="text-right p-2">MTTR</th>

            </tr>

          </thead>

          <tbody>

            {data.map((item, index) => (

              <tr
                key={index}
                className="border-b border-slate-800 hover:bg-slate-800"
              >

                <td className="p-2 text-cyan-400">{item.woNumber}</td>

                <td className="p-2 text-white">{item.area}</td>

                <td className="p-2 text-white">{item.machine}</td>

                <td className="p-2 text-slate-300">{item.problem}</td>

                <td className="p-2 text-right text-red-400">
                  {item.downtime}
                </td>

                <td className="p-2 text-right text-green-400">
                  {item.mttr}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default TopBreakdownTable;
