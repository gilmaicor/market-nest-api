FROM node:lts-alpine3.12 as debug

WORKDIR /home/api

COPY ./package.json /home/api/

RUN npm install
RUN npm install -g nodemon

COPY ./src/ /home/api/src/

ENTRYPOINT ["nodemon", "-L", "--config", "nodemon-docker-debug.json"]

FROM node:lts-alpine3.12 as dev

WORKDIR /home/api

COPY package.json /home/api/package.json

RUN npm install

COPY . /home/api/

CMD npm run start:dev