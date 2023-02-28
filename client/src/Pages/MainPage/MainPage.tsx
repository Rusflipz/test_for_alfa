import Ticker from '../../Components/Ticker/Ticker';
import './MainPage.css';
import List from '../../Components/List/List';

function MainPage() {

  return (
    <div className="MainPage">
      <Ticker></Ticker>
      <List></List>
    </div>
  );
}

export default MainPage;
