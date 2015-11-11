FROM node:4.1-slim

ADD server.js /server.js

ENV MESSAGE "hello world"

CMD [ "node", "/server.js" ]

