# Тестовое задане (Отрисовка и взаимодействие с карточками)

## Запсук приложения

Для запуска приложения необходимо скопировать репозиторий, зайти в него и ввести команды:
npm i и npm run start

## О приложении

Данное приложение отрисовывает 10 карточек, которые получает с [публичного api](https://random-data-api.com/documentation), сохраняет их в store. в приложении можно поставить лайк, убрать лайк, удалить или добавить рандомную карточку, перезапустить преложение, а также возмость отфильтровать понравившиеся карточки.

## Стэк

React + redux + typeScript

## Что реализовано?

- Создано хранилище
- Написаны методы взаимодейсвия с API
- Создана страница ошибки, на которую идет переадресация, если не получилось получить карточки
- Создана Анимация загрузки карточек
- Создана логика обработки работы запросов (Проверка состояния запроса)
- Возможность ставить и убирать лайк
- Возмодность удалять и добавлять карточки, а также перезапустить приложение
- Текст с подсказками, если нет понравившихся карточек, или все карточки были удалены
- Кнопка фильтрации картинок на понравившиеся со сменой состояния
- Деактивизация кнопок при загрузки карточек
- Изменение стилей при наведении на интерактивные элементы для удобства интуитивного взаимодейсвия с ними
- Создание интерфейсов для типизации данных
- Немного стилизации под разные разрешения экрана, чтобы адекватно смотрелось на телефоне

## Костыли и условности

- Полсле получения масива добавляю новое ключ - значение (isLike: false) в каждый обьект для реализации функции лайка. Обычно с карточкой приходит еще массив с id пользователей, которые нажали like, для отображения количества лайков. Тут я менял толко массив в store, но если будет подходящий api, код и логика станут проще.
- Тоже самое и с методом delete, т.к. нет подходящего api, изменяю store.
- В build версии вместо BrowserRouter использован HashRouter в связи с ограничениями GitHub Pages

## GitHub Pages

[ccылка на GitHub Pages](https://rusflipz.github.io/test_for_alfa/#/)
