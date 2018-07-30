FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install Dev Dependencies
COPY package*.json ./

RUN npm install
# If Production
# RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "dev"]
# CMD ["npm", "heroku-postbuild"]