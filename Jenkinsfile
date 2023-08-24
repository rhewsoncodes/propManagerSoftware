pipeline {
    agent any
    tools {
        maven 'Maven_3_9_4'
    }


    stages{
        stage("Discovery Server"){
            steps{
            checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rhewsoncodes/propManagerSoftware']])
            sh script:'''
                #!/bin/bash
                cd discoveryserver
                mvn clean package
                docker build -t discover_server .
                docker run -d --name=discovery_server -p 8761:8761 discovery_server
            '''
            }
        }
        stage("Email Service"){
            environment {
                EMAIL_DB_URL = "jdbc:postgresql://44.206.244.64:5400/emailDB"
                EMAIL_SERVICE_PORT = 8081
                CLOUD_AWS_REGION = "us-east-1"
                EMAIL_SERVICE_DB_CREDS = credentials('EMAIL_SERVICE_DB')
                CLOUD_AWS_ACCESS_KEY = credentials('AWS_ACCESS_KEY')
                CLOUD_AWS_SECRET_KEY = credentials('AWS_SECRET_KEY')
            }
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rhewsoncodes/propManagerSoftware']])
                sh script:'''
                    #!/bin/bash
                    cd emailService
                    mvn clean package
                    docker build -t email_service .
                    docker run -d --name=email_service -p 8081:8081 email_service
                '''
            }
        }
    }
}
    