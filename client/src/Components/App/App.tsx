import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataSelector } from '../../Services/slice/data';
import { getData } from '../../Services/WebSocet';
import Loading from '../Loading/Loading';
import './App.css';
import MainPage from '../../Pages/MainPage/MainPage';

function App() {

  const dispatch = useDispatch();
  const { connectionLoading } = useSelector(dataSelector);

  useEffect(() => {
    dispatch(getData('connect'))
    return () => {
      dispatch(getData('disconnect'))
    }
  }, [])

  return (
    <div className="App">
      {connectionLoading ? <Loading /> : <MainPage />}
    </div>
  );
}

export default App;
