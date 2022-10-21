# SPA-app

Проект по работе с сообщениями

Возможности

1.	Просмотр списка корневых сообщений – “Message”
2.	Просмотр цепочек ответов на корневые сообщения – нажатие на заголовок
3.	Добавление сообщения – “Add”
4.	Добавление сообщения – ответа на сообщение (“reply”)

Установка

Сервер (web-api)

1.	Установить IIS
2.	Опубликовать в Visual Studio проект и перенести на сервер
3.	Установить MSSQL подключить пользователя sa с паролем
4.	Настроить IIS под установку web-api и создать сайт с путем к проекту
5.	Установить windows server hosting
6.	В файле appsettings.json указать пользователя и пароль для доступа к базе

Клиент (react)

1.	В файле .env указываем адрес и порт сервера
2.	Указываем в панели управления reCAPTCHA адрес сайта и вносим ключи в .env файл и appsetting.json
3.	Сборка – npm run build
4.	Переносим на сервер
5.	Настраиваем на папку сборки
