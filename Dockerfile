FROM node:20.7.0-slim

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.11.0/wait /wait

RUN chmod +x /wait

FROM postgres:16.0

RUN apt-get update && apt-get install -y postgresql-16-postgis-3

EXPOSE 3000

CMD ["/usr/local/bin/docker-entrypoint.sh","postgres"] && /wait && npm start