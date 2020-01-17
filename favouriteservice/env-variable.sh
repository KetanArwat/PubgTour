export MYSQL_DATABASE=pubgdb
export MYSQL_USER=root
export MYSQL_PASSWORD=root
export MYSQL_DRIVER=com.mysql.jdbc.Driver
export MYSQL_DIALECT=org.hibernate.dialect.MySQL5InnoDBDialect
if [[ -z "${MYSQL_CI_URL}" ]]; then
export MYSQL_CI_URL=jdbc:mysql://localhost:3306/pubgdb?useSSL=false
fi
