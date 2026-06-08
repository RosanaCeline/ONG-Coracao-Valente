import { useEffect } from "react";

const History = () => {
    useEffect(() => {
        document.title = "História | ONG Coração Valente";
    }, []);

    return (
        <main>
            <h1>História</h1>
            <p>Conheça a história da ONG Coração Valente.</p>
        </main>
    );
};

export default History;
