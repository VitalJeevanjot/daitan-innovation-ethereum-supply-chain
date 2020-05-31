FROM node:10
WORKDIR /app

RUN apt-get update
RUN npm install -g ganache-cli truffle http-server live-server
ENTRYPOINT ["ganache-cli", "-m 'define actress exhibit green grocery grape caution floor mind reunion latin tired'"]