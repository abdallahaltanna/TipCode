# Stage 1: Build the frontend React application
FROM node:18 AS frontend-builder
WORKDIR /app
COPY ./client ./client
COPY package.json package-lock.json ./
RUN cd client && npm install && npm run build

# Stage 2: Build the backend TypeScript application
FROM node:18 AS backend-builder
WORKDIR /app
COPY ./server ./server
COPY package.json package-lock.json tsconfig.json ./
RUN npm install
RUN npm run build

# Stage 3: Final stage to combine frontend and backend
FROM node:18-alpine
WORKDIR /app
COPY --from=backend-builder /app/dist /app/dist
COPY --from=frontend-builder /app/client/dist /app/client/dist
COPY package.json package-lock.json ./
RUN npm install

# Expose the port on which the app runs
EXPOSE 8080

# Command to run the backend server
CMD ["node", "dist/server/index.js"]