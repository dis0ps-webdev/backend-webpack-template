# Shoud out to :
# https://cheatsheetseries.owasp.org/cheatsheets/NodeJS_Docker_Cheat_Sheet.html
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

FROM node:lts-alpine3.12@sha256:3bdf888ea7e13472a20f34b79b966a16f3dbfc28b706eb4fa32489284c28b616 as node-base

# Add init handling
RUN apk add --no-cache dumb-init

# Pull in node dependencies
USER node
WORKDIR /app
COPY --chown=node:node ./package*.json /app
RUN npm ci --only=production


# Drop transpiled code
COPY --chown=node:node ./dist /app/src

# Set running environment
ENV NODE_ENV production
USER node

# Start backend via init for better signal handling
EXPOSE 8080
CMD ["dumb-init","node","src/backend.js"]