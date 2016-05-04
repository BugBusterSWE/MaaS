node {

   stage 'List'

   sh '''#!/bin/bash
. /opt/nvm/.bashrc
ls -laR
'''

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
