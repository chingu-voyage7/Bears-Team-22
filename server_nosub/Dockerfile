## Use base image of latest node lts
FROM node:dubnium-alpine

RUN mkdir /server
WORKDIR /server

COPY package.json /server
RUN npm install

COPY . /server

EXPOSE 5000

CMD [ "npm", "start" ]