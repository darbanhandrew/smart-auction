FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g npm@9.6.6
RUN npm install --global yarn --force
RUN yarn install
COPY ./ .
RUN yarn build
EXPOSE 3000
ENV NODE_ENV=production
CMD ["yarn", "run", "start"]

