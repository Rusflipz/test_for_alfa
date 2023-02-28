import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch, useHistory} from "react-router-dom";

import {dataSelector} from "../../store/slice/data";
import {TDispatch} from "../../store/types/types";
import {getCards} from "../../utils/api";
import {Buttons} from "../Buttons/Buttons";
import {Cards} from "../Cards/Cards";
import Error from "../Error/Error";
import {Header} from "../Header/Header";
import {WithLoader} from "../Hoc/withLoader";

import styles from "./App.module.css";

const App = () => {

    const history = useHistory();
    const dispatch: TDispatch = useDispatch()
    const {cardsError} = useSelector(dataSelector);

    useEffect(() => {
        dispatch(getCards())
    }, [])

    useEffect(() => {
        if (cardsError) {
            history.push("/error");
        }
    }, [cardsError, history])

    return (
        <Switch>
                <Route path='/error' exact>
                    <Error/>
                </Route>
                <Route path='*'>
                    <div className={`${styles.app}`}>
                        <Header/>
                        <Buttons/>
                        <WithLoader>
                            <Cards/>
                        </WithLoader>
                    </div>
                </Route>
            </Switch>
    );
}

export default App;
