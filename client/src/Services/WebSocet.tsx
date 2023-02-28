import {
    connecting, connectingSuccess, getDataSuccess, ConnectingFail,
} from './slice/data';



export const getData: any = (action: string) => {
    return async (dispatch: any) => {
        try {
            //Начинаем обработку и запускаем загрузку
            dispatch(connecting())
            //переменная для записи данных
            let info = null
            info = new WebSocket("wss://norma.nomoreparties.space/orders/all")

            if (action == 'connect') {
                info.onopen = () => {
                    dispatch(connectingSuccess())
                    // console.log(`Соеденение успешно установлено`)
                }
                info.onmessage = (event) => {
                    let mainData = JSON.parse(event.data)
                    dispatch(getDataSuccess(mainData))
                    // console.log(`Данные успешно получены`)
                }
                //Закрытие соеденения
                info.onclose = () => {
                    dispatch(ConnectingFail())
                    // console.log(`Соеденение закрыто`)
                }
                //Обработка ошибок подключение
                info.onerror = (event: any) => {
                    dispatch(ConnectingFail())
                    console.log(`Ошибка ${event.message}`)
                }
                //Тригер закрытия соеденения
            } else if (action == 'disconnect') {
                info.close()
                // console.log(`Соеденение успешно закрыто`)
            }
            //Ловим ошибки
        } catch (err) {
            console.log(err)
        }
    }
}
