# Use the base image of the latest Node.js LTS version - v10.
FROM node:dubnium-alpine

RUN mkdir /server
COPY . /server

WORKDIR /server
RUN npm install --production

EXPOSE 5000

ARG STAGE="production"
ENV NODE_ENV=$STAGE

CMD [ "npm", "start" ]
