# payment-form-DS-test

Payment form React.js with AntDesign on node.js (express) server

## Для запуска проекта:

1. Скачать проект (клонировтаь репозиторий).
2. Находясь в корне проекта:

- `/frontend`
  Поочередно запустить в терминале команды:

```bash
cd frontend
npm i
npm start
```

Сайт запуститься локально:
http://localhost:3000/

- `/backend`
  Поочередно запустить в терминале команды:

```bash
cd backend
npm i
npm rud dev
```

Сервер запуститься локально:
http://localhost:5000/

## Payment Form

Репозиторий для приложение приема платежей, включающий фронтенд и бэкенд части приложения со следующими возможностями:

#### Приложение выводит форму с полями:

- Card Number
- Expiration Date
- CVV
- Amount

#### Валидация

#### При отправе формы запрос уходит на сервер с данными формы в формате JSON

#### Сервер: (expess.js)

- Сохраняет данные в mongoDB
- Возвращает в ответ ID записи и Amount в формате JSON

## Стек технологий

- React.js
- AntDesign
- JavaScript (ES6)
- API
- node.js
- express.js
- MongoDB
- mongoose
