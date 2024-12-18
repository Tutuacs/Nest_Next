FROM node:20 as base

WORKDIR /usr/src/server
COPY package*.json ./
RUN npm install -g pnpm
COPY . /usr/src/server
RUN pnpm install
RUN pnpm postinstall
EXPOSE ${PORT}
# RUN pnpm run start

FROM base as server
CMD [ "node", "dist/main.js" ]
