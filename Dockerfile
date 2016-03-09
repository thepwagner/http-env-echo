FROM node:4.3-slim

RUN useradd -g daemon -m -d /tmp app \
  && mkdir /app \
  && chown app:daemon /app

WORKDIR /app

COPY package.json /app/package.json
RUN npm install

COPY / /app/

ENV MESSAGE "hello world"

USER app
CMD [ "node", "/app/start.js" ]

