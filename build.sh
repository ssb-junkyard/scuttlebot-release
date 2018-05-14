#! /bin/bash

npm install scuttlebot@$1 --package-lock
npm shrinkwrap
node update.js $1
npm install #install dev deps
npm test

