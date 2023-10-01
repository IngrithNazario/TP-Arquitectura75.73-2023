# TP-ARQUITECTURA75.73-2023/Dockerfile
FROM node:16
WORKDIR /usr/tp_arquitectura_7573
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]