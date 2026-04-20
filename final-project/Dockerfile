# ---- Base image ----
FROM node:20-alpine

# ---- Create app directory ----
WORKDIR /usr/src/app

# ---- Copy package files first (better caching) ----
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# ---- Install production dependencies ----
RUN npm install --omit=dev

# ---- Copy the rest of the project ----
COPY . .

# ---- Build the React frontend ----
RUN npm run build:frontend

# ---- Default command ----
CMD ["npm", "start"]
