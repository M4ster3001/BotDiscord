FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install  \
  && npm install -g pm2 \
  && pm2 install typescript

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]