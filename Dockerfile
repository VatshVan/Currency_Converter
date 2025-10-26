# Use a lightweight Nginx server as the base image
FROM nginx:alpine

# Copy your website's files into the Nginx web root directory
# (Assuming you renamed converter.html to index.html)
COPY index.html /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY javascript.js /usr/share/nginx/html

# Tell Docker that the container will listen on port 80
EXPOSE 80
