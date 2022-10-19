#!/bin/bash

cd client_mobile
rm -rf /clishared/client.apk
./gradlew build
cp app/build/outputs/apk/debug/app-debug.apk /clishared/client.apk
rm -rf .gradle app/build