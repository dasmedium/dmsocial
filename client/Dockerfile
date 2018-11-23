FROM node:10 as build

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install 

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . . 
RUN npm run build

FROM nginx:1.15.6
COPY --from=build /usr/src/app/src/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

