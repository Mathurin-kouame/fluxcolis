import { usePublicTracking } from "@/hooks/usePublicTracking"
import { TrackingSearch } from "../components/TrackingSearch"
import { useEffect, useState } from "react"
import { TrackingResult } from "../components/TrackingResult";

export const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchTracking, setSearchTracking] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [searchStartedAt, setSearchStartedAt] = useState<number | null>(null)
  


  const { data, isError } = usePublicTracking(searchTracking);

  const isSearching = !!searchTracking && !showResult && !isError

  const handleSearch = () => {
    const value = trackingNumber.trim();

    if (!value) return;
     
    setShowResult(false);
    setSearchStartedAt(Date.now());
    setSearchTracking(value)
    
  }

  useEffect(() => {
    if (!data || !searchStartedAt) return

    const elapsedTime = Date.now() - searchStartedAt;
    const minimumDelay = 1000;
    const remainingTime = Math.max(minimumDelay - elapsedTime, 0);

    const timer = setTimeout(() => {
        setShowResult(true);
      }, remainingTime);

      return () => clearTimeout(timer);  
  }, [data, searchStartedAt]);

  return (
    <div className="mx-auto max-w-6xl overflow-y-auto mt-0 rounded-md border border-slate-200 bg-white shadow-sm  md:mt-16 lg:mt-20 md:mx-auto">

      <TrackingSearch
        value={trackingNumber}
        onChange={setTrackingNumber}
        onSearch={handleSearch}
      />

      {isSearching && (
        <p className="mt-10 text-center text-black">
          Recherche du colis...
        </p>
      )}

      {isError && (
        <div className="py-6 text-center">
          <p className="text-red-500">
            Aucun colis trouvé.
          </p>
        </div>
      )}

     {showResult && data && (
        <TrackingResult parcel={data} />
      )}

    </div>
  )
}