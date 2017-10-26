FROM node:alpine

ENV PROJECTNAME openapi
ENV TZ Asia/Shanghai

RUN apk add --update tzdata
RUN echo "${TZ}" > /etc/timezone
RUN ln -sf /usr/share/zoneinfo/${TZ} /etc/localtime
RUN apk --update add wget
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn
RUN ./node_modules/.bin/gulp release
RUN rm -rf src/
ENTRYPOINT ["/bin/sh","start.sh"] 
EXPOSE 3000
