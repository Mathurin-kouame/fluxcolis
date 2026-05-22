import { Route, Routes } from "react-router-dom";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
             <Route path="/track/:trackingNumber?" element={<PublicTrackingPage />} />
        </Routes>
    )
}