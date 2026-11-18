# Stage 1: Build React frontend on Fedora
FROM registry.fedoraproject.org/fedora:latest AS ui-builder
RUN dnf install -y nodejs-npm && dnf clean all

WORKDIR /ui
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot JAR with embedded React UI on Fedora
FROM registry.fedoraproject.org/fedora:latest AS api-builder
RUN dnf install -y java-21-openjdk-devel maven && dnf clean all

WORKDIR /app
COPY backend/pom.xml ./
RUN mvn dependency:go-offline
COPY backend/src ./src
COPY --from=ui-builder /ui/dist ./src/main/resources/static
RUN mvn package -DskipTests

# Stage 3: Minimal Fedora Runtime
FROM registry.fedoraproject.org/fedora:latest
RUN dnf install -y java-21-openjdk-headless && dnf clean all

WORKDIR /app
COPY --from=api-builder /app/target/brewtarget-web-1.0.0.jar app.jar
RUN mkdir -p /app/data && useradd -m -u 1000 brewer && chown -R brewer:brewer /app

USER brewer
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]