import { useEffect } from "react";

export function Help() {
    useEffect(() => {
        document.title = "Adoção | ONG Coração Valente";
    }, []);
    
    return (
        <main>
            <h1>Ajuda</h1>
            <p>Informações sobre como ajudar a ONG.</p>
        </main>
    );
}