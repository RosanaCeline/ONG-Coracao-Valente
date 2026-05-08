import { useEffect } from "react";

export function Adoption() {
    useEffect(() => {
        document.title = "Adoção | ONG Coração Valente";
    }, []);
    
    return (
        <main>
            <h1>Adoção</h1>
            <p>Informações sobre o processo de adoção.</p>
        </main>
    );
}