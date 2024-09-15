FROM node:20
WORKDIR /server
COPY src/ /server/src
COPY prisma/ /server/prisma
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate