FROM node:18-alpine as build

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD cp -r build result_build
