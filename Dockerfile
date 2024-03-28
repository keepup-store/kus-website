FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . /app

# Copy the views folder to the build directory
RUN mkdir -p /app/build/views && \
    cp -R /app/src/views /app/build/

EXPOSE 7000

CMD [ "npm", "run", "build-n-start" ]