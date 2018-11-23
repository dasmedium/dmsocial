FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install Dev Dependencies
COPY package*.json ./

RUN npm install
# If Production
# RUN npm install --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
# CMD ["npm", "heroku-postbuild"]