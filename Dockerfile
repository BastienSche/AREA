FROM mhart/alpine-node:16.2.0 as base

COPY package.json ./
RUN apk update
RUN apk add bash
RUN npm install -g sequelize-cli --save
RUN npm install sequelize --save
RUN npm install pg --save
RUN npm install