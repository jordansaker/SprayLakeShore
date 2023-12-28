FROM postgres:16.0

RUN apt-get update && apt-get  install -y postgresql-16-postgis-3  

CMD ["/usr/local/bin/docker-entrypoint.sh","postgres"]