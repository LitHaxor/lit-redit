FROM node:alpine3.13

WORKDIR /app

COPY package.json .

RUN if [ "$NODE_ENV" = "development" ]; \
        then yarn install; \
        else npm install --only=production; \
        fi

COPY . .

RUN yarn build

CMD [ "yarn","start" ]