#!/bin/bash

CLONED_REPO_NAME=documentation

function msg() {

    echo $1
}


function setUpGit() {

    git config --global user.email ${GIT_EMAIL}
    git config --global user.name ${GIT_NAME}

    # Save some useful information
    REPO=`git config remote.origin.url`
    SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
    SHA=`git rev-parse --verify HEAD`

    git clone --branch=gh-pages $REPO $CLONED_REPO_NAME
}

function deployDoc() {

    mkdir -p $CLONED_REPO_NAME/dev/$TRAVIS_TAG/

    msg "Coping doc/ to $TRAVIS_TAG"
    cp -rv doc/ $CLONED_REPO_NAME/dev/$TRAVIS_TAG/
    
    git add $CLONED_REPO_NAME/dev/*
    git commit -m "Travis CI autocommit from travis build ${TRAVIS_BUILD_NUMBER}"
    git push -f origin gh-pages
}

function decript_key() {

    local bak=`pwd`
    cd scripts/
    local ENCRYPTED_KEY_VAR="encrypted_4fb01e47edd4_key"
    local ENCRYPTED_IV_VAR="encrypted_4fb01e47edd4_iv"
    local ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
    local ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
    openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in id_rsa.enc -out deploy_key -d
    chmod 600 deploy_key
    eval `ssh-agent -s`
    ssh-add deploy_key
    cd $bak
}

function main() {

    msg "Setting up git"
    setUpGit
    msg "Decript key"
    decript_key

    msg "Deploying new documentation"
    deployDoc
}

main
