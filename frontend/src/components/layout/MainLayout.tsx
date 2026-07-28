import { Navbar } from "@/features/landing/components/Navbar"
import { Outlet } from "react-router-dom"

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet /> 
            </main>
        </>
    )
}