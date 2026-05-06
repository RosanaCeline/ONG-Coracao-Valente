import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/btn/ButtonComponent/ButtonComponent";
import CardFunctionalitiesComponent from "../../components/card/CardFuncionalitiesComponent/CardFuncionalitiesComponent";

const Home = () => {

    const navigate = useNavigate();

    return (
        <main>
            <h1>Bem-vindo à nossa ONG!</h1>
            <p>Toda vida importa.</p>

            <ButtonComponent onClick={() => navigate("/contato")}>
                Contato
            </ButtonComponent>

            <CardFunctionalitiesComponent
                title="Contato com voluntários"
                icon={Zap}
            />
        </main>
    );
};

export default Home;
