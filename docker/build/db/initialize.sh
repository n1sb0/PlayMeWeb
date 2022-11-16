#!/bin/bash
while getopts ":d:p:" flag
do
    case "$flag" in
        d) databaseName=${OPTARG};;
        p) saPassword=${OPTARG};;
    esac
done
# Wait to be sure that SQL Server came up
sleep 10s
# Run the setup script to create the DB and the schema in the DB
# Note: make sure that your password matches what is in the Dockerfile
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P ${saPassword} -d master -i create-database.sql -v database=${databaseName}

