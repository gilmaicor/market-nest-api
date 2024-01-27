FROM node:lts-alpine3.17 as debug

WORKDIR /home/api

COPY ./package.json /home/api/

RUN npm install
RUN npm install -g nodemon

COPY ./src/ /home/api/src/

ENTRYPOINT ["nodemon", "-L", "--config", "nodemon-docker-debug.json"]

FROM node:lts-alpine3.17 as dev

WORKDIR /home/api

COPY package.json /home/api/package.json

RUN npm install

COPY ./src/ /home/api/src/

CMD npm run start:dev