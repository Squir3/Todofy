# BUILD FOR LOCAL DEVELOPMENT
FROM node:18-alpine As builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY --from=builder /usr/src/app/dist ./dist

ENV NODE_ENV development

ENV HOST 0.0.0.0

EXPOSE 3000

CMD [ "node", "dist/main.js" ]


