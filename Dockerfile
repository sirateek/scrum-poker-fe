## Builder Stage
FROM node:lts-alpine as build-stage

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'yarn.lock' (if available)
COPY package*.json ./
COPY yarn.lock ./

# Install Git
RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

# Initilize the Git
RUN git init

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Export RELEASE env
RUN export RELEASE=$(git rev-parse --short HEAD)

# build app for production with minification
RUN yarn run build

# Remove sourcemap file before send output to production-stage
RUN find . -name "*.map" -type f -delete


## production-stage
FROM nginx:stable-alpine as production-stage
RUN apk add --no-cache bash

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html/

COPY entrypoint.sh /usr/share/nginx/entrypoint.sh
RUN chmod +x /usr/share/nginx/entrypoint.sh

ENTRYPOINT [ "/usr/share/nginx/entrypoint.sh" ]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
