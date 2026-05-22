import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../features/auth/pages/LoginPage";

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/auth/pages/login" element={<LoginPage />} />   
            <Route path="/auth/pages/register" element={<RegisterPage />} />   
        </Routes>
    )
}