#!/bin/bash

order=$1;
deploy=$2; #staging pro dev
echo $deploy;
case $order in
    "build")  if [[ -z $deploy ]]; then
                echo "k";
                set NODE_ENV=production && webpack --color --progress
              else
                echo "nk";
                set NODE_ENV=production && webpack --color --progress && pm2 deploy start-app.json $deploy update
              fi
    ;;
    2)  echo $order
    ;;
    3)  echo $order
    ;;
    4)  echo $order
    ;;
    *)  echo $order
    ;;
esac
