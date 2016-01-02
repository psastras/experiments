#!/bin/bash

BASEDIR=$(dirname $0)

pushd server/
tsc
popd

webpack --config ./webpack-prod.config.js --progress --colors