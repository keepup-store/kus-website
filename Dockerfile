FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

EXPOSE 7000

CMD [ "npm", "run", "build-n-start" ]