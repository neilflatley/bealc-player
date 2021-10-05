FROM node:14 as builder
# The following prevents errors when cwebp is installing.
RUN apt-get update
RUN apt-get install libglu1 -y
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --loglevel error
COPY config /usr/src/app/config
COPY public /usr/src/app/public

COPY src /usr/src/app/src
COPY webpack /usr/src/app/webpack
COPY babel.config.js .
COPY .env* ./
COPY .eslintignore .
COPY .eslintrc.js .
COPY .nvmrc .
COPY .prettierignore .
COPY .prettierrc .
COPY .stylelintrc .
COPY tsconfig.json .
COPY jsconfig.json .
RUN npm run build

FROM mhart/alpine-node:14

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install --production --loglevel error
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

# Standard classic start script, will start the server with the environment started last 
# (or using configuration from the default .env if never started)
ENTRYPOINT node dist/server/start.js

# Start the server using just a cms alias targeting the specific start script
#ENTRYPOINT node dist/server/start.$alias.js

# Start the server using a project id and cms alias targeting the specific start script
# ENTRYPOINT node --max-http-header-size=800000 dist/server/start.$projectId.$alias.js

# Start the server configured for a given cms alias where the projectId is 'website' using env variable
#ENTRYPOINT npm --start=$alias run-script server

# Start the server configured for a given cms alias targeted to a specific project using env variable
#ENTRYPOINT npm --start=$projectId.$alias run-script server

EXPOSE 3001
