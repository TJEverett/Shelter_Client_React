# React Shelter App

#### _React based application to connect to C# Shelter Api, 06/28/2023_

#### By _**Tristen Everett**_

## Description

This project was to gain practice with connecting a react application to an API through redux. In this project, I used my [Shelter Api](https://github.com/TJEverett/Shelter_API) that I created in C# to allow users to access the API's functionality through a webpage. When the webpage loads the user will be presented with a title page that contains a navigation bar along the top that will stay the entire time they navigate the site. Until the user is authenticated they will be given view-only access to the animals in the shelter database, once authenticated the user will have new options in the navigation bar to be able to Create/Delete other users, Create an animal into the database, or from the view page of an animal in the database they will be able to Edit and Delete an animal.

### Diagram

* [Diagram](.\diagram\React_Shelter_App.html)

## Setup/Installation Requirements

To use this program you will need to set up the [Shelter Api](https://github.com/TJEverett/Shelter_API) and have it running for the user to access in order to use the website. Webpage Setup instructions require use of [nodeJS](https://nodejs.org/en).

### Webpage Setup

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this Repo
2. Run `npm install` from within the root directory of the cloned project
3. Make sure your instance of the [Shelter Api](https://github.com/TJEverett/Shelter_API) is launched correctly and has an IP address.
4. Modify file `\src\actions\index.js` value of `const ApiUrl`
   1. Default line `const ApiUrl = "http://localhost:5000/api";`
5. Run `npm start` from within the root directory of the cloned project
6. The webpage should start automatically in your default browser. If it doesn't go to http://localhost:3000 in your preferred browser

## Technologies Used

* [Create React App](https://github.com/facebook/create-react-app)
* Redux
* Redux-Thunk
* React-Redux
* React-Router

### License

This software is licensed under the MIT license

Copyright (c) 2023 **_Tristen Everett_**