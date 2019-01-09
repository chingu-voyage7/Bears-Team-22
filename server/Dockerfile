# Use the base image of the latest Node.js LTS version - v10.
FROM node:dubnium-alpine

RUN mkdir /server
COPY . /server

WORKDIR /server
RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]
