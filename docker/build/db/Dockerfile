FROM mcr.microsoft.com/mssql/server:2019-latest
EXPOSE 1433
VOLUME /var/opt/mssql/data
USER root

RUN apt-get update && \
    apt-get install dos2unix && \
    apt-get clean

COPY create-database.sql create-database.sql
COPY initialize.sh initialize.sh

RUN dos2unix initialize.sh
RUN chmod +x initialize.sh
