import { useEffect } from "react"; 

export function Donate() {
    useEffect(() => {
        document.title = "Doação | ONG Coração Valente";
    }, []);
    return (
        <main>
            <h1>Doação</h1>
            <p>Informações sobre como doar para a ONG.</p>
        </main>
    );
}