import { STATS } from "../constants/navigation"

export const StatsSection = () => {
    return (
        <section className=" max-w-7xl mx-auto px-6 py-6 pb-24">
            <div className=" grid grid-cols-2 lg:grid-cols-4 ms:grid-cols-2 gap-6">
                {STATS.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div key={stat.title}
                        className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-xl flex items-center gap-2 transition-all"
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon className="text-blue-600" />    
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
                            <p className="text-slate-600">{ stat.subtitle}</p>
                        </div>
                    )
              })}
            </div>
        </section>
    )
}