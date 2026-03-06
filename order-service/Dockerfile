FROM node:18-slim
WORKDIR /app
RUN npm install express
COPY . .
# Make sure this says server.js
CMD ["node", "server.js"]