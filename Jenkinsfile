pipeline {
    agent any
    tools {
        maven 'maven_3_9_4'
    }
    stages{
        stage("Build Maven"){
            steps{
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rhewsoncodes/propManagerSoftware']])
                sh 'ls'
            }
        }
    }
}