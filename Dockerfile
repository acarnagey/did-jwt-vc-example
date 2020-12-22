## Stage 1 build step
FROM node:14.15.3-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build:prod

## Stage 2 run app step
FROM node:14.15.3-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./
EXPOSE 5000
CMD node server