import styles from "./Error.module.css";

const Error = () => (
    <div className={`${styles.main}`}>
        <p className={`${styles.text}`}>Ошибка: 404</p>
    </div>
)

export default Error;
