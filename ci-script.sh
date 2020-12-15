#!/bin/bash

set -e

echo 'Run Linter'
npm run lint

echo 'Run License Tests'
npm run test:license

echo 'Run Tests'

if [ $TRAVIS_PULL_REQUEST != false ] && [ $TRAVIS_SECURE_ENV_VARS == true ]; then
    echo "Pull request with secure environment variables, running Sauce tests...";
    npm run test:sauce || travis_terminate 1;
else
    echo "Not a pull request and/or no secure environment variables, running headless tests...";
    npm run test:local || travis_terminate 1;
fi
