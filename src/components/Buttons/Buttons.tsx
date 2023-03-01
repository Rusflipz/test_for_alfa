import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { getCards, getNewCard } from "../../services/api";
import { dataSelector, setFilter } from "../../services/slice/data";
import styles from "./Buttons.module.css";

function Buttons() {

    const { array, isFiltered, cardsLoading } = useSelector(dataSelector);

    const dispatch: Dispatch<any> = useDispatch()

    return (<>
        {cardsLoading ? <div className={styles.main}>
            <button disabled className={`${styles.button}`}>Перезагрузить приложение</button>
            <button disabled className={styles.button} >Добавить карточку</button>
            <button disabled className={styles.button} >Отфильтровать избранные</button>
        </div> : <div className={styles.main}>
            <button className={styles.button}
                onClick={() => dispatch(getCards())}>Перезагрузить приложение</button>
            <button className={styles.button}
                onClick={() => dispatch(getNewCard(array))}>Добавить карточку</button>
            {isFiltered ?
                <button
                    className={`${styles.button} ${styles.button_active}`}
                    onClick={() => dispatch(setFilter())}>Отфильтровать избранные</button> :
                <button className={styles.button}
                    onClick={() => dispatch(setFilter())}>Отфильтровать избранные</button>}
        </div>}

    </>)
}

export default Buttons