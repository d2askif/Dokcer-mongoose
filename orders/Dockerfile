FROM node:10.15-stretch as base 

WORKDIR /orders
COPY package.json /orders

EXPOSE 8000 9229


RUN yarn install

COPY . /orders

CMD ["yarn", "start:watch"]