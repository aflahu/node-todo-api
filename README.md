# Node Todo Api
Todo RESTful API build with Node.JS, Express, Mocha, MongoDB, and more
> this repo following instruction [ Andrew Mead in udemy](https://www.udemy.com/the-complete-nodejs-developer-course-2/)

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