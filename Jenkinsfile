pipeline {
    agent any
    tools {
        maven 'Maven_3_9_4'
    }
    stages{
        stage("Build Maven"){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rhewsoncodes/propManagerSoftware']])
                sh script:'''
                    #!/bin/bash
                    cd propertyService
                    mvn clean package
                    cd ../
                    cd accountService
                    mvn clean package
                    cd ../
                    cd emailService
                    mvn clean package
                    cd ../
                    cd discoveryserver
                    mvn clean package
                    cd ../ 
                    cd gateway
                    mvn clean package
                '''
            }
        }
    }
}