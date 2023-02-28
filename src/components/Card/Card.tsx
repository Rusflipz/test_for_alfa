import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";

import clsx from "clsx";

import {dataSelector, fetchCardsSuccess} from "../../store/slice/data";
import {TDispatch} from "../../store/types/types";
import {TCard} from "../../types/Card";

import styles from "./Card.module.css";

const likeCard = (newArray: TCard[]) => async (dispatch: Dispatch) => {
    dispatch(fetchCardsSuccess(newArray))
}

const deleteCard = (newArray: TCard[]) => async (dispatch: Dispatch) => {
    dispatch(fetchCardsSuccess(newArray))
}

const Card = (props: { item: TCard }) => {

    const dispatch: TDispatch = useDispatch()

    const {array} = useSelector(dataSelector);

    const index = array.findIndex((el: { id: number }) => el.id === props.item.id);

    const like = () => {
        const newArray: TCard[] = array.map((card: TCard) => ({...card}));

        newArray[index].isLike = !newArray[index].isLike;
        dispatch(likeCard(newArray))
    }

    const deleteItem = () => {
        const newArray: TCard[] = array.map((card: TCard) => ({...card}));

        newArray.splice(index, 1);
        dispatch(deleteCard(newArray));
    }

    return (
        <div key={props.item.id} className={styles.main}>
            <div onClick={() => deleteItem()} className={styles.delete}/>
            <img className={styles.image} alt='Аватарка не загрузилась, попробуйте обновить страницу'
                 src={props.item.avatar}/>
            <div className={`${styles.bottom}`}>
                <p>{`${props.item.first_name} ${props.item.last_name}`}</p>
                <div onClick={() => like()}
                     className={clsx(styles.like, props?.item?.isLike ? styles.like_active : null)}/>
            </div>

        </div>
    );
};

export default Card;