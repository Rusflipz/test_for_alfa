import {useDispatch, useSelector} from "react-redux";

import {dataSelector, setFilter} from "../../store/slice/data";
import {TDispatch} from "../../store/types/types";
import {getCards, getNewCard} from "../../utils/api";
import {Button} from "../Button/Button";

import styles from "./Buttons.module.css";

export const Buttons = () => {

    const {array, isFiltered, cardsLoading} = useSelector(dataSelector);

    const dispatch: TDispatch = useDispatch()

    return (
        <div className={styles.main}>
            <Button title='Перезагрузить приложение' disabled={cardsLoading} onClick={() => dispatch(getCards())}/>
            <Button title='Добавить карточку' disabled={cardsLoading} onClick={() => dispatch(getNewCard(array))}/>
            <Button title='Отфильтровать избранные' isActive={isFiltered} disabled={cardsLoading}
                    onClick={() => dispatch(setFilter())}/>
        </div>
    )
}
