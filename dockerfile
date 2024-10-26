FROM oven/bun:1.1.32
WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

CMD ["bun", "run", "start"]