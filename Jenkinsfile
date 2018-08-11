pipeline {
    agent {
        docker {
            image 'node:6-alpine' 
            args '-p 3000:3000'
            args '-e VIRTUAL_HOST=app.tetoka.co'
            args '-e LETSENCRYPT_HOST=app.tetoka.co'
            args '-e LETSENCRYPT_EMAIL=dasmedium.co@gmail.com'
            args '-e VIRTUAL_PORT=3000'
        }
    }
     environment {
        CI = 'true'
    }
    stages {
        stage('Npm-Install') { 
            steps {
                sh 'npm heroku-postbuild' 
            }
        }

        stage('Build') { 
            steps {
                sh 'npm run build' 
            }
        }

        stage('Run') { 
            steps {
                sh 'npm start' 
            }
        }

        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
    }
}