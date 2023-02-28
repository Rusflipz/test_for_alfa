import styles from "./Ticker.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList, dataSelector } from "../../Services/slice/data";

//Функциональный комонент, который отрисовывает Тикер
function Ticker() {

  const dispatch = useDispatch();
  //Получаем данные из redux
  const { data1, listOfOrders, connectionLoading, connectionError, connectionSuccess, dataSuccess } = useSelector(dataSelector);

  //Создаем state для изменения и валидации input
  const [count, setCount] = useState("");
  //Создаем state для изменения и валидации option
  const [optionValue, setoptionValue] = useState("CHY/RUB");
  //Создаем state для изменения и валидации button
  const [isValueEmpty, setIsValueEmpty] = useState(true);

  //Фукция валидации и записи числа в input
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    isNumeric(e.target.value)
    //проверка на то, чтобы строкаа была числом и регулировка ее длины
    if ((isNumeric(e.target.value) || e.target.value === "") && e.target.value.length < 8) {
      //Проверяем пустая ли строка
      if (e.target.value === "") {
        //Строка пустая
        setIsValueEmpty(true)
      } else {
        //Строкаа не пустая
        setIsValueEmpty(false)
      }
      //Устанавливаем значение
      setCount(e.target.value)
    }
  }

  //проверка является ли строка числом
  function isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  // меняем state в зваисимости от выбора
  function handleChangeOption(e: any) {
    e.preventDefault();
    setoptionValue(e.target.value)
  }

  //Обработка клика по одной из кнопок
  function handleClickButton(side: "BUY" | "SELL", price: number) {
    //Берем дату и время
    let today = new Date;
    let today1 = `${today.getDay()}.${today.getMonth()}.${today.getFullYear()}`
    //Создаем дубликат массива
    let list = listOfOrders;
    //Если массив пустой, создаем первую запись с id 1
    if (list.length == 0) {
      console.log("Пустой массив")
      let listToPush = [];
      let object = {
        id: 1,
        CreationTime: today1,
        ChangeTime: today1,
        Status: "Active",
        Side: side,
        Price: price,
        Amount: count,
        Instrument: optionValue,
      }
      //Добавляем в массив
      listToPush.push(object)
      //Обновляем в хранилище
      dispatch(addToList(listToPush))
      //Устанавливаем счетчик в исходное положение
      setCount('')
      // Выводим окно
      alert('Заявка успешно создана')
    } else {
      //создаем копию массива
      let listToPush = Array.from(listOfOrders);
      //берем последний элемент и смотрим его id
      let last = list[list.length - 1];
      let newId = last.id + 1;
      let object = {
        id: newId,
        CreationTime: today1,
        ChangeTime: today1,
        Status: "Active",
        Side: side,
        Price: price,
        Amount: count,
        Instrument: optionValue,
      }
      //Добавляем в массив
      listToPush.push(object)
      //Обновляем в хранилище
      dispatch(addToList(listToPush))
      //Устанавливаем счетчик в исходное положение
      setCount('')
      // Выводим окно
      alert('Заявка успешно создана')
    }
  }

  return (
    <div className={`${styles.Ticker}`}>
      <div className={`${styles.Ticker_header}`}>
        <p className={`${styles.Ticker_title}`}>Форма для создание заявок</p>
        {/* Выпадюющий список для выбора актива */}
        <select onChange={e => handleChangeOption(e)} value={optionValue}
          className={`${styles.Ticker_header_option}`}>
          <option>CHY/RUB</option>
          <option>EUR/RUB</option>
          <option>USD/RUB</option>
          <option>TRY/RUB</option>
          <option>BYN/RUB</option>
        </select>
        <input placeholder="Введите количество" value={count} onChange={e => handleChangeInput(e)}
          className={`${styles.Ticker_header_input}`}></input>
        <div className={`${styles.Ticker_header_amount}`}></div>
      </div>
      <div className={`${styles.Ticker_bottom}`}>
        <div className={`${styles.Ticker_bottom_box} ${styles.Ticker_bottom_sell}`}>
          <p className={`${styles.Ticker_bottom_price_sell} ${styles.Ticker_bottom_price}`}>
            {/* Курс выбранного актива, умножанный на количество */}
            {data1 && data1.rateSell[optionValue] * Number(count)}
          </p>
          {/* Активная и неактивная кнопка отрисовывается динамически в зависимости от состояния input */}
          {isValueEmpty ? <button
            disabled
            className={`${styles.Ticker_bottom_button} ${styles.Ticker_bottom_button_disabled}`}>
            <p className={`${styles.Ticker_bottom_button_text}`}>SELL</p>
          </button> : <button
            onClick={() => handleClickButton("SELL", data1.rateSell[optionValue])}
            className={`${styles.Ticker_bottom_button} ${styles.Ticker_bottom_button_active}`}>
            <p className={`${styles.Ticker_bottom_button_text}`}>SELL</p>
          </button>
          }
        </div>
        <div className={`${styles.Ticker_bottom_box} ${styles.Ticker_bottom_buy}`}>
          <p className={`${styles.Ticker_bottom_price_buy} ${styles.Ticker_bottom_price}`}>
            {/* Курс выбранного актива, умножанный на количество */}
            {data1 && data1.rateBuy[optionValue] * Number(count)}
          </p>
          {/* Активная и неактивная кнопка отрисовывается динамически в зависимости от состояния input */}
          {isValueEmpty ? <button
            disabled
            className={`${styles.Ticker_bottom_button} ${styles.Ticker_bottom_button_disabled}`}>
            <p className={`${styles.Ticker_bottom_button_text}`}>BUY</p>
          </button> : <button
            onClick={() => handleClickButton("BUY", data1.rateBuy[optionValue])}
            className={`${styles.Ticker_bottom_button} ${styles.Ticker_bottom_button_active}`}>
            <p className={`${styles.Ticker_bottom_button_text} `}>BUY</p>
          </button>
          }
        </div>
      </div>
    </div>
  );
}


export default Ticker;
