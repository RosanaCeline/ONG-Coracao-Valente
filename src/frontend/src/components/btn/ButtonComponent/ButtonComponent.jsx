import styles from "./ButtonComponent.module.css";

// Variants aceitas: 'red' | 'white' | 'outline' | 'outline-white'
// Para 'outline': use borderColor (cor da borda) e color (cor do texto/label)
const ButtonComponent = ({
    children,
    icon: Icon,
    variant = "red",
    borderColor,
    color,
    size = 18,
    disabled = false,
    className = '',
    style,
    ...props
}) => {
    const outlineVars = variant === 'outline' && (borderColor || color)
        ? {
            ...(borderColor && { '--btn-border-color': borderColor, '--btn-hover-bg': `color-mix(in srgb, ${borderColor} 10%, transparent)` }),
            ...(color && { '--btn-color': color }),
          }
        : undefined;

    return (
        <button
            className={`${styles.button} ${styles[`button--${variant}`]} ${className}`.trim()}
            style={{ ...outlineVars, ...style }}
            disabled={disabled}
            {...props}
        >
            {children && <span className={styles.text}>{children}</span>}

            {Icon && (
                <span className={styles.icon}>
                <Icon size={size} strokeWidth={2} />
                </span>
            )}
        </button>
    );
};

export default ButtonComponent;
