# Use the base image of the latest Node.js LTS version - v10.
FROM node:dubnium-alpine

RUN mkdir /server
WORKDIR /server

COPY package.json /server
RUN npm install

COPY . /server

EXPOSE 5000

CMD [ "npm", "start" ]
