FROM node:22-alpine
RUN apk add --no-cache git bash
WORKDIR /app
EXPOSE 3000
CMD ["/bin/bash"]
