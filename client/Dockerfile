FROM node:20 as base

WORKDIR /usr/src/client
COPY package*.json ./
RUN npm install -g pnpm
COPY . /usr/src/client
RUN pnpm install
RUN pnpm run build

FROM base as client
CMD [ "pnpm", "run", "start" ]
