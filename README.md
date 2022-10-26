# SPA-app

Project for work with messages

Capabilities

1.	View the list of root messages – “Message”
2.	View chains of answers to root messages – pressing for the heading
3.	Adding a message – “Add”
4.	Adding a message - response to a message (“reply”)
5. Sorting by name, e-mail, date

Installation

Server (Web-Api)

1.	Install IIS
2.	Publish a project in Visual Studio and transfer to the server
3.	Install MSSQL connect a sa user with a password
4.	Configure IIS for installing web-api and create a site with the path to the project
5.	Install windows server hosting
6.	In the appsettings.json file specify the user and password for access to the database

Frontend (react)

1.	In the .env file indicate the address and port of the server
2.	Specify the site address in the reCAPTCHA control panel and make the keys to the .env file and appsetting.json
3.	Assembly – npm run build
4.	Transfer to the server
5.	We set up on the assembly folder
