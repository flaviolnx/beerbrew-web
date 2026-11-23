# Stage 1: Build React frontend on Fedora latest
FROM registry.fedoraproject.org/fedora:latest AS ui-builder
RUN dnf install -y nodejs-npm && dnf clean all

WORKDIR /ui
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Spring Boot JAR with embedded React UI on Fedora latest
FROM registry.fedoraproject.org/fedora:latest AS api-builder
RUN dnf install -y java-25-openjdk-devel maven && dnf clean all

WORKDIR /app
COPY backend/pom.xml ./
RUN mvn dependency:go-offline
COPY backend/src ./src
COPY --from=ui-builder /ui/dist ./src/main/resources/static
RUN mvn package -DskipTests

# Stage 3: Minimal Fedora latest Runtime
FROM registry.fedoraproject.org/fedora:latest
RUN dnf install -y java-25-openjdk-headless && dnf clean all && mkdir -p /app/data && useradd -m -u 1000 brewer && chown -R brewer:brewer /app

WORKDIR /app
COPY --from=api-builder /app/target/beerbrew-web-1.0.0.jar app.jar

USER brewer
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
