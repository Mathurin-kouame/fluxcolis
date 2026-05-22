import { Routes, Route } from "react-router-dom";
import { PublicRoutes } from "./public.routes";
import AuthRoutes from "./auth.routes";
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />
            {/* <Route path="/app/*" element={<ProtecetedRoutes/>} />     */}
      </Routes>
    )
       
}

