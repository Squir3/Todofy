FROM node:16-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16-alpine As development

WORKDIR /app

COPY --from=builder /app  .

ENV NODE_ENV=development

EXPOSE 8080

CMD [ "npm", "run", "serve" ]

