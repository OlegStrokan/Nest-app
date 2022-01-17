### V_1.9.3

# First backend app


## Stack:
* ### Nest.js
* ### PostgreSQL
* ### Sequelize
* ### Swagger
* ### Docker


## Available endpoints:


Auth functional:
- POST */auth/registration - register new account*
- POST */auth/login - login if you already have account*
- PATCH */auth/update - update your account (available only email)*
- GET */auth/activate/:link - get activation link*
- DELETE */auth/:id  - delete your own account*

Users functional:
- GET */users - get all users*
- POST */users - create user (register new account)*
- POST */users/role/:id - assign a role to a user*
- POST */users/ban/:id - ban a user*
- DELETE */users/:id - delete certain user*

Roles roles functional:
- POST */roles - create user's role*
- GET */roles/:value - get user's role*


Posts functional
- GET */posts - get all posts*
- POST */posts - create new post*
- PATCH */posts/:id - update existed post*
- DELETE */posts/:id - deleted existed post*



## Running the app

```bash

$ yarn
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Run in docker container

```bash

# build
$ docker-compose build

# start
$ docker-compose up

```

*Open http://localhost:8000 to view it in browser.*

*Open *http://localhost:8000/api/docs* for view a swagger documentation.*
