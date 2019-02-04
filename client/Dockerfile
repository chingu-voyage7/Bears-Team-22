# Use the base image of the latest Node.js LTS version - v10.
FROM node:dubnium-alpine

RUN mkdir /app
COPY . /app

WORKDIR /app
RUN npm install --production
RUN apk --no-cache add --virtual native-deps \
	g++ gcc libgcc libstdc++ linux-headers make python && \
	npm install --production --quiet node-gyp -g &&\
	npm install --production --quiet && \
	apk del native-deps

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
