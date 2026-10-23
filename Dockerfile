FROM nginx:alpine

# Copy all static website assets into Nginx html directory
COPY . /usr/share/nginx/html

# Expose ports
EXPOSE 80 8080 3000

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
