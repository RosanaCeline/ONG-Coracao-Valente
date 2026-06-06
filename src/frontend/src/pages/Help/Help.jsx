import { useEffect } from "react";
import limpeza from "../../assets/help/limpeza.jpg";
import organizacao from "../../assets/help/organizacao.png";
import divulgacao from "../../assets/help/divulgacao.jpg";
import racao from "../../assets/help/racao.jpg";
import imageDog from "../../assets/help/imageDog.png";
import styles from "./Help.module.css";
import ButtonComponent from "../../components/btn/ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";

const areas = [
  { id: 1, titulo: "Limpeza", imagem: limpeza },
  { id: 2, titulo: "Organização", imagem: organizacao },
  { id: 3, titulo: "Divulgação", imagem: divulgacao },
  { id: 4, titulo: "Cuidados básicos", imagem: racao },
];

export function Help() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Voluntariado | ONG Coração Valente";
  }, []);

  return (
    <main className={styles.main}>
      <p className={styles.tag}>Seja voluntário</p>
      <h1>
        Sua presença <em>salva vidas.</em>
      </h1>
      <p className={styles.subtitulo}>
        Não é preciso ser veterinário para fazer a diferença. Com algumas horas
        por semana, você pode ajudar na:
      </p>

      <div className={styles.grid}>
        {areas.map((area) => (
          <div key={area.id} className={styles.card}>
            <img
              src={area.imagem}
              alt={area.titulo}
              className={styles.cardImg}
            />
            <span className={styles.cardTitulo}>{area.titulo}</span>
          </div>
        ))}
      </div>

      <p className={styles.subtitulo}>
        Cada voluntário que entra pela nossa porta leva junto um pedaço de
        esperança para quem não sabe o que é isso ainda.
      </p>

      <ButtonComponent style={{ alignSelf: "center" }}>
        Quero começar a fazer diferença agora
      </ButtonComponent>

      <div className={styles.secaoImpacto}>
        <div className={styles.impactoTexto}>
          <h2>
            Sua ajuda <em>importa.</em>
          </h2>
          <p className={styles.textoImpacto}>
            Com algumas horas por semana, você ajuda a{" "}
            <strong>
              melhorar as condições de vida dos animais resgatados
            </strong>
            , aumentar as chances de adoção e ajudar na recuperação de cada
            animal.
          </p>
          <p className={styles.textoImpacto}>
            Cada voluntário que entra pela nossa porta muda a rotina de quem não
            tem voz para pedir ajuda.
          </p>
          <ButtonComponent onClick={() => navigate("/doar")}>
            Prefiro doar
          </ButtonComponent>
        </div>
        <img
          src={imageDog}
          alt="Cachorro resgatado"
          className={styles.cachorroImg}
        />
      </div>

      <section className={styles.secaoForm}>
        <div className={styles.secaoFormInner}>
          <p className={styles.formTag}>Voluntarie-se</p>
          <h2 className={styles.headlineForm}>Participe, faça diferença.</h2>
          <p className={styles.formSubtitulo}>
            Preencha abaixo e a gente entra em contato pelo WhatsApp para
            alinhar os próximos passos.
          </p>
          <form
            className={styles.formDireita}
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="volunteer-name" className={styles.label}>
              Nome:
            </label>
            <input
              id="volunteer-name"
              type="text"
              placeholder="Como podemos te chamar?"
              className={styles.input}
            />
            <label htmlFor="volunteer-area" className={styles.label}>
              Como quer ajudar?
            </label>
            <select id="volunteer-area" className={styles.input}></select>
            <ButtonComponent variant="outline-white" style={{ width: "100%" }}>
              Quero me voluntariar
            </ButtonComponent>
          </form>
        </div>
      </section>
    </main>
  );
}
