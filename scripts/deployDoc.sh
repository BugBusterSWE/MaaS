#!/bin/bash

function msg() {

    echo $1
}


function setUpGit() {

    git config --global user.email ${GIT_EMAIL}
    git config --global user.name ${GIT_NAME}
    git clone --branch=gh-pages https://${GH_TOKEN}@github.com/bugbusterswe/MaaS documentation
}

function deployDoc() {

    mkdir -p documentation/dev/$TRAVIS_TAG/

    msg "Coping doc/ to $TRAVIS_TAG"
    cp doc/* documentation/dev/$TRAVIS_TAG/
    
    git add documentation/dev/*
    git commit -m "Travis CI autocommit from travis build ${TRAVIS_BUILD_NUMBER}"
    git push -f origin gh-pages
}

function main() {

    msg "Setting up git"
    
    setUpGit

    msg "Deploying new documentation"
    deployDoc
}

main
