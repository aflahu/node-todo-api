# Node Todo Api

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/252a0032dec24b61a6a89ebf949b466e)](https://www.codacy.com/app/erka.j.p/node-todo-api?utm_source=github.com&utm_medium=referral&utm_content=Erkajp/node-todo-api&utm_campaign=badger)

Todo RESTful API build with Node.JS, Express, Mocha, MongoDB, and more
> this repo following instruction [ Andrew Mead in udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2/)

## Running project

You need to have installed Node.js and MongoDB

### Install dependencies
To install depedencies enter project folder and run following comand:

``
npm install
``

### Add configuration
to run this project you have to create config.json file in config folder
```
{
    "test": {
        "PORT": 3000,
        "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
        "JWT_SECRET": "Your secrete key"
    },
    "development": {
        "PORT": 3000,
        "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
        "JWT_SECRET": "Your secrete key"
    }
}
```

### Build Project
``
npm run build
``

### Testing Project
``
npm run test
``

## Routes
### /users route
#### POST users/

set header "x-auth" : token

JSON example
```
{
    "email": "es@sa.com",
    "password": "******"
}
```

#### GET users/me

set header "x-auth" : token

#### POST users/login

JSON example
```
{
    "email": "es@sa.com",
    "password": "******"
}
```


#### DELETE users/me/token

### /todos route
#### POST /todos

set header "x-auth" : token

JSON example
```
{
    "text": "learn new tech"
}
```

#### GET /todos

set header "x-auth" : token

#### GET /todos/:id

set header "x-auth" : token

#### PATCH /todos/:id

set header "x-auth" : token

JSON example
```
{
    "completed": true
}
```

#### DELETE /todos/:id

set header "x-auth" : token
