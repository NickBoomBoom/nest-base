FROM node:18-alpine as builder
WORKDIR /build
COPY . /build
RUN npm install -g pnpm
RUN pnpm i
RUN pnpm build
RUN ls -l /build
CMD ["node", "/build/dist/main.js"]
EXPOSE 3000
  
