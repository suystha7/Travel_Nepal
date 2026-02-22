# Dev-focused image: install deps and run Next.js dev server in-container.
# This avoids the NextAuth secret requirement enforced in production mode.

FROM node:22-alpine
WORKDIR /app

# Install git for any postinstall needs; add libc for node-alpine compat.
RUN apk add --no-cache git libc6-compat

# Install dependencies (skip husky scripts)
ENV HUSKY=0
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Expose dev port
EXPOSE 3000

# Run Next.js dev server on all interfaces
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]