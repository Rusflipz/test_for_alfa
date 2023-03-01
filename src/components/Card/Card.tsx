import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { deleteCard, likeCard } from "../../services/api";
import { dataSelector } from "../../services/slice/data";
import { Icard } from "../../utils/Interface";
import styles from "./Card.module.css";

function Card(props: { item: Icard }) {

    const dispatch: Dispatch<any> = useDispatch()
    const { array } = useSelector(dataSelector);

    let index = array.findIndex((el: { id: number; }) => el.id === props.item.id);

    function like() {
        if (props.item.isLike === false) {
            const newArray = array.map((a: Icard) => ({ ...a }));
            newArray[index].isLike = true;
            dispatch(likeCard(newArray))
        } else {
            const newArray = array.map((a: Icard) => ({ ...a }));
            newArray[index].isLike = false;
            dispatch(likeCard(newArray))
        }
    }

    function deleteItem() {
        const newArray = array.map((a: Icard) => ({ ...a }));
        newArray.splice(index, 1);
        dispatch(deleteCard(newArray));
    }

    return (
        <div key={props.item.id} className={styles.main}>
            <div onClick={() => deleteItem()} className={styles.delete}></div>
            <img className={styles.image} alt="Аватарка не загрузилась, попробуйте обновить страницу"
                src={props.item.avatar}></img>
            <div className={`${styles.bottom}`}>
                <p>{`${props.item.first_name} ${props.item.last_name}`}</p>
                {!props.item.isLike ?
                    <div onClick={() => like()} className={`${styles.like}`}></div> :
                    <div onClick={() => like()} className={`${styles.like} ${styles.like_active}`}></div>}
            </div>
        </div>
    );
};

export default Card;