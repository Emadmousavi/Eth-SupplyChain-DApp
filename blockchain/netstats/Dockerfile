FROM timbru31/node-alpine-git

# RUN apk update
# RUN apk add git
RUN npm install -g grunt
RUN git clone https://github.com/goerli/ethstats-server.git

WORKDIR /ethstats-server
RUN git checkout 01779e313392017152dd9165d3c7cd0e56e1f91a
RUN sed -i "s/Testnet/Ethereum/" src/views/layout.jade
RUN npm install && grunt poa
CMD npm start

EXPOSE 3000