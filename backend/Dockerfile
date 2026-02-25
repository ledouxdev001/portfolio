# ─────────────────────────────────────────────
# Stage 1 — Build
# ─────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Cache dependencies first
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Build the app
COPY src ./src
RUN mvn clean package -DskipTests -B

# ─────────────────────────────────────────────
# Stage 2 — Runtime
# ─────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Non-root user for security
RUN addgroup -S portfolio && adduser -S portfolio -G portfolio

COPY --from=builder /app/target/*.jar app.jar

RUN chown portfolio:portfolio app.jar

USER portfolio

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
