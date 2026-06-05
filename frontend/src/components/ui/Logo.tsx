import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate("/")}>
            <div className="text-blue-700">
                <Box />
            </div>
            <h1 className="font-bold"><span className="text-2xl font-bold text-blue-700">Flux</span>Colis</h1>
        </div>
    )
}