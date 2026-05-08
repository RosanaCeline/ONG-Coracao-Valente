import { useEffect } from "react";

const Contact = () => {
    useEffect(() => {
        document.title = "Contato | ONG Coração Valente";
    }, []);

    return (
        <main>
            <h1>Contato</h1>
            <p>Entre em contato com a ONG.</p>
        </main>
    );
};

export default Contact;
