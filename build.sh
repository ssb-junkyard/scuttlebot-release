#! /bin/bash

rm npm-shrinkwrap.json
npm install scuttlebot@$1 --package-lock
npm shrinkwrap
node update.js $1
npm install #install dev deps
git add .
git commit -m $1
npm test && {
  npm publish
}

