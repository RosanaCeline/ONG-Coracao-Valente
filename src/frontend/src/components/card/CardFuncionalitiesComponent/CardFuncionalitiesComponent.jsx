import styles from "./CardFuncionalitiesComponent.module.css";

const CardFuncionalitiesComponent = ({
    title,
    icon: Icon,
    ...props
}) => {
    return (
        <div className={styles.card} {...props}>
            {Icon && (
                <span className={styles.icon}>
                <Icon size={18} strokeWidth={2} />
                </span>
            )}

            <p className={styles.title}>{title}</p>
        </div>
    );
};

export default CardFuncionalitiesComponent;
