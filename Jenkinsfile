pipeline {
    agent any
    tools {
        maven 'Maven_3_9_4'
    }

    environment {
        EMAIL_DB_URL = "jdbc:postgresql://44.206.244.64:5400/emailDB"
        EMAIL_SERVICE_PORT = 8081
        CLOUD_AWS_REGION = us-east-1
        EMAIL_DB_CREDS = credentials('EMAIL_SERVICE_DB')
        EMAIL_DB_USER = EMAIL_DB_CREDS_USR
        EMAIL_DB_PASS = EMAIL_DB_CREDS_PSW
        CLOUD_AWS_ACCESS_KEY = credentials('AWS_ACCESS_KEY')
        CLOUD_AWS_SECRET_KEY = credentials('AWS_SECRET_KEY')
    }
    }
    stages{
        stage("Build Maven"){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rhewsoncodes/propManagerSoftware']])
                sh script:'''
                    #!/bin/bash
                    echo ${EMAIL_DB_URL}
                    cd emailService
                    mvn clean package
                '''
            }
        }
    }
}