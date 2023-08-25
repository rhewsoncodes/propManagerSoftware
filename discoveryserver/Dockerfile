FROM openjdk:17
VOLUME /tmp
EXPOSE 8761
ARG JAR_FILE=target/discoveryserver-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} discoveryserver-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "/discoveryserver-0.0.1-SNAPSHOT.jar"]