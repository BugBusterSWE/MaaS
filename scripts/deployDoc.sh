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

    git clone --branch=gh-pages $SSH_REPO $CLONED_REPO_NAME
}

function deployDoc() {

    mkdir -p $CLONED_REPO_NAME/dev/$TRAVIS_TAG/

    msg "Creating index page for $TRAVIS_TAG release"
    echo "<!DOCTYPE html>
<html>
    <head>
        <title>$TRAVIS_TAG Documentation - MaaS</title>
        <!--Import Google Icon Font-->
        <link href=\"http://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">
        <!--Import materialize.css-->
        <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css\" media=\"screen\">
        <link type=\"text/css\" rel=\"stylesheet\" href=\"../../../css/structure.css\"  media=\"screen\"/>
        <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">

        <!--Let browser know website is optimized for mobile-->
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>
    </head>
    <body>
        <!--Import jQuery before materialize.js-->
        <script type=\"text/javascript\" src=\"https://code.jquery.com/jquery-2.1.1.min.js\"></script>
        <script src=\"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js\"></script>
        
        <nav>
            <div class=\"nav-wrapper grey darken-3\">
                <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">
                    <li><a href=\"https://www.gitbook.com/book/bugbusterswe/usermanual/details\">User Manual</a></li>
                    <li><a href=\"https://github.com/BugBusterSWE/MaaS\">Source Code</a></li>
                    <li><a href=\"http://bugbusterswe.github.io/MaaS\">Home Page</a></li>
                </ul>
            </div>
        </nav>
        
        
        <div id=\"container\">
            <!-- content of the page -->
            <div id=\"content\">
                <div id=\"contentBody\">
                    <div id=\"titles\">
                        <h1 class=\"center\">MaaS</h1>
                        <h2 class=\"center\">MongoDB as a service</h2>
                    </div>
                </div>
            </div>
            <div id=\"content\">
                <p>Here you can find the documentation for the $TRAVIS_TAG version</p>
                <ul id=\"version-list\">
                    <li><a href=\"api/index.html\">API documentation</a></li>
                    <li><a href=\"source/index.html\">Source Code Documentation</a></li>
                </ul>
            </div>
        </div>
        
        <footer class=\"page-footer grey darken-3\">
          <div class=\"container\">
            <div class=\"row\">
              <div class=\"col l6 s12\">
                <h5 class=\"white-text\">MaaS</h5>
                <p class=\"grey-text text-lighten-4\">MongoDB as a Service. MaaS is under the <a class=\"blue-text text-lighten-3\" href=\"https://github.com/BugBusterSWE/MaaS/blob/master/LICENSE\">MIT</a> license</p>
              </div>
              <div class=\"col l4 offset-l2 s12\">
                <h5 class=\"white-text\">Links</h5>
                <ul>
                  <li><a class=\"blue-text text-lighten-3\" href=\"https://github.com/BugBusterSWE/MaaS\">GitHub repository</a></li>
                  <li><a class=\"blue-text text-lighten-3\" href=\"http://bugbusterswe.github.io/MaaS\">Home Page</a></li>
                  <li><a class=\"blue-text text-lighten-3\" href=\"https://github.com/orgs/BugBusterSWE/people\">Team</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class=\"footer-copyright\">
            <div class=\"container\">(c) 2016 BugBusters</div>
          </div>
        </footer>
    </body>
</html>" | tee doc/index.html >> /dev/null
    
    msg "Coping doc/ to $TRAVIS_TAG"
    cp -rv doc/ $CLONED_REPO_NAME/dev/$TRAVIS_TAG/

    cd $CLONED_REPO_NAME
    
    git add dev/*
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

    msg "Decript key"
    decript_key

    msg "Setting up git"
    setUpGit

    msg "Deploying new documentation"
    deployDoc
}

main
