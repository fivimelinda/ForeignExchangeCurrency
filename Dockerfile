# Build process
FROM node:alpine as build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

COPY . ./

RUN npm run build

# Production environment
FROM node:alpine
RUN npm i -g serve
WORKDIR /app
COPY --from=build /app/build .
CMD ["serve", "-p", "80", "-s", "."]