
FROM node:16


WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --only=production

COPY . .

RUN npm run build


EXPOSE 3000


ENV NODE_ENV=production


CMD ["node", "dist/app.js"]
