FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .
COPY tailwind.config.ts .
COPY postcss.config.js .

EXPOSE 3000

CMD ["npm", "run", "dev"]
