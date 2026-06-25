import { useState } from "react"

export const Button = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <button
            onClick={() =>setIsOpen(true)}
        >
            Nouveau colis
        </button>

        
    )
}