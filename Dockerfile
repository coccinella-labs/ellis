FROM node:22

WORKDIR /app

COPY package*.json ./

ENV NPM_CONFIG_IGNORE_SCRIPTS=1

RUN npm install

RUN npm install @rollup/rollup-linux-x64-gnu --save-optional || true

COPY . .

RUN bash -c 'for i in {1..3}; do npm run build && break || sleep 5; done'

EXPOSE 3001

CMD ["npm", "start"]