FROM postgres:16

ENV POSTGRES_USER=magasin
ENV POSTGRES_PASSWORD=magasin
ENV POSTGRES_DB=magasin

COPY database/init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432
