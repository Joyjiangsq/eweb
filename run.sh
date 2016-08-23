#!/bin/bash

order=$1;
deploy=$2; #staging pro dev
case $order in
    "build")  if [[ -z $deploy ]]; then
                set NODE_ENV=production && webpack --color --progress
              else
                set NODE_ENV=production && webpack --color --progress && pm2 deploy start-app.json $deploy update
              fi
    ;;
    "dev")   set NODE_ENV=dev && node development.js;
    ;;
esac
