
interface TrackingPros {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
}

export const TrackingSearch = ({value, onChange, onSearch}:TrackingPros) => {
    return (
        <div className="rounded-t-md m-0.5 bg-linear-to-r from-blue-700 to-indigo-700 p-10 sm:p-8 md:p-8 shadow-sm">
            <h2 className="text-center text-2xl md:text-3xl sm:text-4xl font-bold text-white">
                Suivi de votre colis 
            </h2>

            <p className="mt-2 text-center text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
               Entrez votre numéro de suivi pour suivre l'état de votre colis en temps réel.
            </p>
            <div className="mt-8 flex justify-center flex-col sm:flex-row gap-3 sm:gap-0">
                <input
                    value={value}
                    onChange={(e) =>
                        onChange(e.target.value)
                    }
                    placeholder="FLX-2026-0001"
                    className="w-full max-w-md p-2.5 rounded-4xl outline-none bg-white sm:rounded-r-sm"
                />

                <button
                    onClick={onSearch}
                    className="rounded-4xl bg-blue-900 p-2.5 text-white font-medium transition hover:bg-blue-950 cursor-pointer sm:rounded-l-sm whitespace-nowrap"
                >
                    Recherche
                </button>
            </div>
        </div>
    )
}