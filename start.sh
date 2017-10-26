#! /bin/sh
wget http://$NODE_ENV.config.we2tu.com/$PROJECTNAME/config.json -O /usr/src/app/config/config.json
wget http://$NODE_ENV.config.we2tu.com/$PROJECTNAME/log.json -O /usr/src/app/config/log.json
yarn start