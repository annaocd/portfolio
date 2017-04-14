#!/bin/sh
PATH=$(npm bin):$PATH
NODE=$(which node)
BASEDIR=`dirname $0`/../

if [ -n "$1" ]; then
    PORT=$1
else
    PORT=''
fi

$NODE $BASEDIR/server.js $PORT
