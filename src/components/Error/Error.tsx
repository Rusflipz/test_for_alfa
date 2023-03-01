import styles from "./Error.module.css";

function Error() {
  return (
    <div className={`${styles.Main}`}>
      <p className={`${styles.Text}`}>Ошибка: 404</p>
    </div>
  );
}

export default Error;
