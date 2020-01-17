FROM java:8-jre
WORKDIR usr/src
ENV MYSQL_DATABASE=pubgdb
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_CI_URL=jdbc:mysql://localhost:3306/pubgdb
ENV MYSQL_DRIVER=com.mysql.jdbc.Driver
ENV MYSQL_DIALECT=org.hibernate.dialect.MySQL5InnoDBDialect
ADD ./target/favouriteservice-0.0.1-SNAPSHOT.jar /usr/src/favouriteservice-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "favouriteservice-0.0.1-SNAPSHOT.jar"]
