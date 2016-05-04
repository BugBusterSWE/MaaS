node {
   // Mark the code checkout 'stage'....
   stage 'Checkout'
   
//   sh '''#!/bin/bash
//rm -rf *
//'''
   // Get some code from a GitHub repository
   git url: 'https://github.com/BugBusterSWE/MaaS.git'

   stage 'Install'
   
   sh '''#!/bin/bash
. /opt/nvm/.bashrc
npm install
'''

    stage 'Lint'
    
    sh '''#!/bin/bash
. /opt/nvm/.bashrc
npm run lint
'''

    stage 'Build' 

    sh '''#!/bin/bash
. /opt/nvm/.bashrc
npm run build
'''
    stage 'Test' 

    sh '''#!/bin/bash
. /opt/nvm/.bashrc
npm test
'''
}