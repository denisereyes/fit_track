FROM node:16.14-alpine

WORKDIR /var/app

COPY ./app/package.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]