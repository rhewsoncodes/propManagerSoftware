FROM openjdk:17
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=target/projectAccountService-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} projectAccService-0.0.1-SNAPSHOT.jar
ENTRYPOINT["java", "-jar", "/projectEmailService-0.0.1-SNAPSHOT.jar"]
