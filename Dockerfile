# --- STAGE 1: Build Stage ---
# This stage prepares the files and injects the API key
FROM alpine:latest as builder

# Declare the build-time argument that will receive the secret
ARG API_KEY

# Install sed (a tool for find-and-replace)
RUN apk add --no-cache sed

# Set a working directory
WORKDIR /app

# Copy the source files into the builder
COPY index.html .
COPY style.css .
COPY javascript.js .

# Run the replacement command on javascript.js
# This replaces 'Your_API_KEY' with the key passed during the build
RUN sed -i "s|Your_API_KEY|${API_KEY}|g" javascript.js

# --- STAGE 2: Final Stage ---
# This is the final, clean image that will run
FROM nginx:alpine

# Copy the *modified* website files from the 'builder' stage
# into the final Nginx web root directory
COPY --from=builder /app/index.html /usr/share/nginx/html
COPY --from=builder /app/style.css /usr/share/nginx/html
COPY --from=builder /app/javascript.js /usr/share/nginx/html

# Tell Docker that the container will listen on port 80
EXPOSE 80
