#!/bin/bash

BACKEND_DIR=/var/www/remdesk
FRONTEND_DIR=/var/vue/remdesk-frontend

cd "$BACKEND_DIR"
./mvnw clean package -Dmaven.test.skip=true --no-transfer-progress
cp target/api-0.0.1-SNAPSHOT.jar "$FRONTEND_DIR/app.jar"

cd "$FRONTEND_DIR"
#yarn build
yarn electron:build
