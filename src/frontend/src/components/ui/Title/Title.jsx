/**
 * Title — renderiza h1–h4 com os estilos globais do index.css.
 * Use <em> dentro do children para cor de destaque (vermelho).
 *
 * Exemplos:
 *   <Title as="h1">Toda vida merece uma <em>chance.</em></Title>
 *   <Title as="h2">Dar voz a quem não pode falar.</Title>
 *   <Title as="h3" className={styles.cardTitle}>Entenda como tudo começou:</Title>
 */
const Title = ({ as: Tag = 'h2', children, className, ...props }) => (
  <Tag className={className} {...props}>
    {children}
  </Tag>
);

export default Title;
