FROM node:16

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY  . .

COPY ./dist ./dist

CMD ["yarn", "start:dev"]


