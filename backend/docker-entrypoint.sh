#!/bin/sh

echo "Waiting for database..."

sleep 5

echo "Generating Prisma Client..."

npx prisma generate

echo "Running Prisma migrations..."

npx prisma migrate deploy

echo "Starting NestJS..."

npm run start:dev