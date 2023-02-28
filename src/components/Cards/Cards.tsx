import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {dataSelector} from "../../store/slice/data";
import {TCard} from "../../types/Card";
import Card from "../Card/Card";

import styles from "./Cards.module.css";


const CardList = ({isFiltered, array}: { isFiltered: boolean, array: TCard[] }) => {
    const formattedArray = isFiltered ? array.filter((card) => card?.isLike) : array

    return <div className={styles.conteiner}>
        {formattedArray?.map(({...elem}: TCard, index: number) =>
            <div key={index}>
                <Card item={elem}/>
            </div>)}
    </div>
}

const HintText = ({isArrayEmpty, isFilteredArrayEmpty}: { isArrayEmpty: boolean, isFilteredArrayEmpty: boolean }) => {
    if (isArrayEmpty) {
        return <p className={styles.text}>
            Вы удалили все карточки! Добавьте хотябы одну!
        </p>
    }
    if (isFilteredArrayEmpty && !isArrayEmpty) {
        return <p className={styles.text}>
            Чтобы тут появились карточки, вы должны нажать на лайк хотябы на одной из них!
        </p>
    }

    return null
}

export const Cards = () => {

    const {array, isFiltered} = useSelector(dataSelector);

    const [isFilteredArrayEmpty, setIsFilteredArrayEmpty] = useState(false)

    const [isArrayEmpty, setIsArrayEmpty] = useState(false)

    useEffect(() => {
        if (isFiltered && array.filter((elem) =>
            elem?.isLike).length === 0) {
            setIsFilteredArrayEmpty(true)

            return;
        }

        setIsFilteredArrayEmpty(false)

    }, [isFiltered, array])

    useEffect(() => {
        if (array && array?.length === 0) {
            setIsArrayEmpty(true)
        } else {
            setIsArrayEmpty(false)
        }
    }, [array])


    return (
        <div className={styles.main}>
            <HintText isArrayEmpty={isArrayEmpty} isFilteredArrayEmpty={isFilteredArrayEmpty}/>
            <CardList isFiltered={isFiltered} array={array}/>
        </div>
    )
};