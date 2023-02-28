import styles from "./Loading.module.css";

function Loading() {

  return (
    <div className={styles.Loading}>
      <p className={styles.Loading_text}>Загрузка...</p>
    </div>
  );
}

export default Loading;
