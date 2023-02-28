import styles from "./List.module.css";
import { useSelector } from "react-redux";
import { dataSelector } from "../../Services/slice/data";

//Функциональный комонент, который отрисовывает Тикер
function List() {

  //Получаем данные из redux
  const { listOfOrders } = useSelector(dataSelector);

  //Функция отрисовки элементов
  function renderListItems(item: any) {
    return (
      <>
        <div className={`${styles.List_item}`}>{item.id}</div>
        <div className={`${styles.List_item}`}>{item.CreationTime}</div>
        <div className={`${styles.List_item}`}>{item.ChangeTime}</div>
        <div className={`${styles.List_item}`}>{item.Status}</div>
        <div className={`${styles.List_item}`}>{item.Side}</div>
        <div className={`${styles.List_item}`}>{item.Price}</div>
        <div className={`${styles.List_item}`}>{item.Amount}</div>
        <div className={`${styles.List_item}`}>{item.Instrument}</div>
      </>
    )
  }

  return (
    <div className={`${styles.List}`}>
      <div className={`${styles.List_item}`}>id</div>
      <div className={`${styles.List_item}`}>Дата создания</div>
      <div className={`${styles.List_item}`}>Дата изменения</div>
      <div className={`${styles.List_item}`}>Статус</div>
      <div className={`${styles.List_item}`}>Операция</div>
      <div className={`${styles.List_item}`}>Цена</div>
      <div className={`${styles.List_item}`}>Количество</div>
      <div className={`${styles.List_item}`}>Валюта</div>
      {listOfOrders.map((element: any) => renderListItems(element))}
    </div>
  );
}

export default List;
