import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dataSelector } from "../../services/slice/data";
import { getCards } from "../../services/api";
import styles from "./App.module.css";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Buttons from "../Buttons/Buttons";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { Dispatch } from "redux";

function App() {

  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch()
  const { cardsLoading, cardsError } = useSelector(dataSelector);

  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  useEffect(() => {
    if (cardsError) {
      history.push("/error");
    }
  }, [cardsError, history])

  return (
    <>
      <Route path={"/error"} exact={true}>
        <Error></Error>
      </Route>
      <Route path={"/"} exact={true}>
        <div className={`${styles.App}`}>
          <Header></Header>
          <Buttons></Buttons>
          {cardsLoading ? <Loading></Loading> : <Cards></Cards>}
        </div>
      </Route>
    </>
  );
}

export default App;
