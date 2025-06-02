#!/bin/bash

set -e

echo "Ensuring .env exists..."
cp .env.example .env

echo "Starting Docker containers..."
docker compose up --build -d

echo "Done."