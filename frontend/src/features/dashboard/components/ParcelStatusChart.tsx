import {Pie, ResponsiveContainer, PieChart, Tooltip, } from "recharts";

type ParcelStatusChartProps = {
    pending: number;
    inTransit: number;
    delivered: number;
    cancelled: number;
}

export const ParcelStatusChart = ({ pending, inTransit, delivered, cancelled }: ParcelStatusChartProps) => {

    const total = pending + inTransit + delivered + cancelled;
   
    const data = [
        {
            name: "En attente",
            value: pending,
            fill: "#fbbf24"
       },
        {
            name: "En transit",
            value: inTransit,
            fill: "#c084fc"
       },
        {
            name: "Livrés",
            value: delivered,
            fill: "#4ade80"
       },
        {
            name: "Annulés",
            value: cancelled,
            fill: "#f87171"
       },
    ]
    
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center">
                <h2 className="text-sm font-semibold text-slate-700">
                    Répartition des colis
                </h2>
               
            </div>
            <div className="flex items-center justify-center">
                 <div className="h-40 w-60 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            fill="#fbbf24"
                            cx="60%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={50}
                            paddingAngle={3}
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3">
                {data.map((item) => (
                    
                    <div
                        key={item.name}
                        className="flex items-center gap-2 text-sm"
                    >
                        <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{backgroundColor: item.fill}}
                        />

                        <span className="text-slate-500">
                            {item.name}
                        </span>

                        <span className="font-semibold text-slate-700">
                          {item.value}
                        </span>

                        <span>
                            ({total > 0
                                ? Math.round((item.value / total) * 100)
                                : 0
                            }%)
                        </span>
                    </div>
                ))}
            </div>
            </div>
           
        </div>
    )
};