### V_1.6.1

# First backend app


## Stack:
### - *Nest.js*
### - *PostgreSQL*
### - *Sequelize*


## Available endpoints:


Auth functional:
- POST */auth/registration - register new account*
- POST */auth/login - login if you already have account*

Users functional:
- GET */users - get all users*
- POST */users - create user (register new account)*
- POST */users/role - assign a role to a user*
- POST */users/ban - ban a user*

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
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
