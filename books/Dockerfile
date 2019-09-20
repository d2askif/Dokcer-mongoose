FROM node:10.15-stretch as base 

WORKDIR /app
COPY package.json /app

EXPOSE 8000 9229

RUN yarn install

COPY . /app

CMD ["yarn", "start"]