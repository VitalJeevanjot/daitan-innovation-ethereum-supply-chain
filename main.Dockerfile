FROM node:10
WORKDIR /app

RUN apt-get update
RUN npm install -g ganache-cli truffle http-server live-server
# COPY /start.sh /start.sh
# CMD [ "/start.sh" ]