FROM node:12-alpine
WORKDIR /
COPY package*.json ./
RUN npm install
RUN mkdir local-storage
COPY . .
CMD ["npm", "start"]