FROM node:20.7.0-slim

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

RUN /wait

ENTRYPOINT [ "yarn" ]

CMD [ "start" ]
