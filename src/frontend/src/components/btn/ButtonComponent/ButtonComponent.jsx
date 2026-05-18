import styles from "./ButtonComponent.module.css";

const ButtonComponent = ({
    children,
    icon: Icon,
    variant = "red",
    size = 18,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${styles[`button--${variant}`]} ${className}`.trim()}
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
