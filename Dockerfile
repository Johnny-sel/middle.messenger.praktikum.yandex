FROM node:18-alpine
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .
CMD npm install && npm run build && npm run start:render
