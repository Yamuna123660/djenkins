FROM node:19-alpine as stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM stage as now
RUN npm install --production
COPY . .
CMD ["npm", "index.js"]
