FROM node:18-alpine

# Install dependencies for node-gyp and others
RUN apk add --update --no-cache \
    python3 \
    make \
    g++ \
    bash git openssh \
    && ln -sf python3 /usr/bin/python

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.base.json ./
COPY .next ./.next
COPY public ./public
COPY libs ./libs

ARG IMAGE_SHA
ENV IMAGE_SHA=${IMAGE_SHA}
RUN echo "IMAGE_SHA is ${IMAGE_SHA}"

EXPOSE 3000
CMD ["npm", "run", "start"]
