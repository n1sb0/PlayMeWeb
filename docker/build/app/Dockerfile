FROM node:16.18.0-alpine

ARG APP_NAME
ENV HOST 0.0.0.0

RUN echo ${APP_NAME}
RUN apk update
RUN apk add git

RUN mkdir -p /app/${APP_NAME}
RUN chown -R 1000:1000 /app
RUN chmod -R 0777 /app

WORKDIR /app/${APP_NAME}

EXPOSE 3000