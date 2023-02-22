FROM node:18-alpine
RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY . .
EXPOSE 3000
CMD npm install && npm run start
