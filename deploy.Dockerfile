FROM node:10
WORKDIR /app
COPY db db

RUN apt-get update
RUN npm install -g ganache-cli truffle http-server live-server
COPY /start.sh /start.sh
CMD [ "/start.sh" ]
RUN cd ethereum-supply-chain/web
CMD ["live-server"]
EXPOSE 8080
