FROM node:16-alpine as builder

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production --silent
RUN yarn global add serve

COPY . .

RUN yarn build

CMD ["serve", "-s", "build"]
