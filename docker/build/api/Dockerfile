FROM mcr.microsoft.com/dotnet/sdk:6.0 as build

WORKDIR /app

EXPOSE 5000
RUN dotnet dev-certs https --trust
ENTRYPOINT dotnet watch run --urls=http://*:5000