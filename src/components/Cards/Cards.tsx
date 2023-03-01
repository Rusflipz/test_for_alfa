import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { dataSelector, setFilterArrayState, setIsArrayEmpty } from "../../services/slice/data";
import { Icard } from "../../utils/Interface";
import Card from "../Card/Card";
import styles from "./Cards.module.css";

function Cards() {

    const dispatch: Dispatch<any> = useDispatch();

    const { array, isFiltered, isFilteredArrayEmpty, isArrayEmpty } = useSelector(dataSelector);

    useEffect(() => {
        if (isFiltered && array.filter((elem: { isLike: boolean; }) =>
            elem.isLike === true).length === 0) {
            dispatch(setFilterArrayState(true))
        } else {
            dispatch(setFilterArrayState(false))
        }
    }, [dispatch, isFiltered, array])

    useEffect(() => {
        if (array && array.length === 0) {
            dispatch(setIsArrayEmpty(true))
        } else {
            dispatch(setIsArrayEmpty(false))
        }
    }, [dispatch, array])

    return (
        <>
            <div className={styles.main}>
                {isArrayEmpty ?
                    <p className={styles.text}>
                        Вы удалили все карточки! Добавьте хотябы одну!
                    </p> : <></>}
                {isFilteredArrayEmpty && !isArrayEmpty ?
                    <p className={styles.text}>
                        Чтобы тут появились карточки, вы должны нажать на лайк хотябы на одной из них!
                    </p> : <></>}
                {array && !isFiltered ? <div className={styles.conteiner}>{
                    array.map(({ ...elem }: Icard, index: number) =>
                        <div key={index}><Card item={elem}></Card></div>)}</div> :
                    <div className={styles.conteiner}>{
                        array && array.filter((elem: { isLike: boolean; }) =>
                            elem.isLike === true).map(({ ...elem }: Icard, index: number) =>
                                <div key={index}><Card item={elem}></Card></div>)} </div>}
            </div>
        </>
    );
};

export default Cards;