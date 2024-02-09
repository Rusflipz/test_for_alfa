import {JSX} from "react";
import {useSelector} from "react-redux";

import {dataSelector} from "../../store/slice/data";
import {Loading} from "../Loading/Loading";

export const WithLoader = ({children}: { children: JSX.Element }) => {

    const {cardsLoading} = useSelector(dataSelector);

    if (cardsLoading) return <Loading/>

    return children

}
