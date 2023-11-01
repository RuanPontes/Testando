# Use uma imagem base do Java
FROM openjdk:11

# Copie o arquivo war para o contêiner
COPY ./controller/target/treinamento-spring-boot.war /usr/app/

# Mude o diretório de trabalho
WORKDIR /usr/app

# Execute o arquivo war
ENTRYPOINT ["java", "-jar", "treinamento-spring-boot.war"]
