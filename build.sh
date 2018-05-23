#! /bin/bash

rm npm-shrinkwrap.json
npm install scuttlebot@$1 --package-lock && {
  npm shrinkwrap
  node update.js $1 $2
  npm install #install dev deps
  git add .
  git commit -m $1$2
  hash=`shasum -a 256 < npm-shrinkwrap.json`
  echo $1$2 ${hash:0:64} >> hashes.txt
  npm test && {
    npm publish
  }
}

