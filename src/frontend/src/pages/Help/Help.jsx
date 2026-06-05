import { useEffect } from "react";
import limpeza from "../../assets/help/limpeza.jpg";
import organizacao from "../../assets/help/organizacao.png";
import divulgacao from "../../assets/help/divulgacao.jpg";
import racao from "../../assets/help/racao.jpg";
import imageDog from "../../assets/help/imageDog.png";
import styles from "../Help/help.module.css";

const areas = [
  { id: 1, titulo: "Limpeza", imagem: limpeza },
  { id: 2, titulo: "Organização", imagem: organizacao },
  { id: 3, titulo: "Divulgação", imagem: divulgacao },
  { id: 4, titulo: "Cuidados básicos", imagem: racao },
];

export function Help() {
  useEffect(() => {
    document.title = "Ajudar | ONG Coração Valente";
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <p className={styles.tag}>Adote um animal</p>
        <h1 className={styles.headline}>
          Sua presença <span className={styles.destaque}>salva vidas.</span>
        </h1>
        <p className={styles.subtitulo}>
          Não é preciso ser veterinário para fazer a diferença. Com algumas
          horas por semana, você pode ajudar na:
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

        <button className={styles.btn}>
          Quero começar a fazer diferença agora
        </button>

        <div className={styles.secaoImpacto}>
          <div className={styles.impactoTexto}>
            <h2 className={styles.headlineImpacto}>
              Sua ajuda <span className={styles.destaque}>importa.</span>
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
              Cada voluntário que entra pela nossa porta muda a rotina de quem
              não tem voz para pedir ajuda.
            </p>
            <div className={styles.impactoRodape}>
              <button className={styles.btnDar}>Prefiro doar</button>
            </div>
          </div>
          <img
            src={imageDog}
            alt="Cachorro resgatado"
            className={styles.cachorroImg}
          />
        </div>

        <div className={styles.secaoForm}>
          <div className={styles.formEsquerda}>
            <p className={styles.formTag}>Se voluntarie</p>
            <h2 className={styles.headlineForm}>Participe, faça diferença.</h2>
            <p className={styles.formSubtitulo}>
              Preencha abaixo e a gente entra em contato pelo WhatsApp para
              alinhar os próximos passos.
            </p>
          </div>
          <div className={styles.formDireita}>
            <label className={styles.label}>Nome:</label>
            <input
              type="text"
              placeholder="Como podemos te chamar?"
              className={styles.input}
            />
            <label className={styles.label}>Como quer ajudar?</label>
            <select className={styles.input}>
              <option value="">Escolha uma área</option>
              <option value="limpeza">Limpeza</option>
              <option value="organizacao">Organização</option>
              <option value="divulgacao">Divulgação</option>
              <option value="cuidados">Cuidados básicos</option>
            </select>
            <button className={styles.btnForm}>Quero me voluntariar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
