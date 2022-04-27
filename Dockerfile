FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

EXPOSE 3050

RUN npm ci --only=production

COPY . ./

CMD [ "node", "/usr/src/app" ]