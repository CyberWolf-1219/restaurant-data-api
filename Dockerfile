FROM node:18-alpine

ENV PORT=1219

ENV MONGO_URI=mongodb+srv://blackmonkey1219:rJRAh8AmaABr4xb4@cluster0.dvnufaf.mongodb.net/?retryWrites=true&w=majority

WORKDIR /api

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 1219

CMD ["node","/dist/index.js"]