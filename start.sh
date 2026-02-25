#!/bin/bash
# ============================================================
# Script de démarrage — Portfolio CV Manager
# ============================================================

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║     PORTFOLIO CV MANAGER — DÉMARRAGE         ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${YELLOW}1. Démarrage du Backend Spring Boot...${NC}"
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
echo -e "${GREEN}   ✓ Backend en cours de démarrage (PID: $BACKEND_PID)${NC}"
echo -e "${BLUE}   URL: http://localhost:8080${NC}"

echo ""
echo -e "${YELLOW}2. Attente du démarrage du backend (15s)...${NC}"
sleep 15

echo ""
echo -e "${YELLOW}3. Démarrage du Frontend React...${NC}"
cd ../frontend
npm start &
FRONTEND_PID=$!
echo -e "${GREEN}   ✓ Frontend en cours de démarrage (PID: $FRONTEND_PID)${NC}"
echo -e "${BLUE}   URL: http://localhost:3000${NC}"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅ Application démarrée !                   ║"
echo "║                                              ║"
echo "║  🌐 Portfolio:  http://localhost:3000        ║"
echo "║  🔌 API:        http://localhost:8080        ║"
echo "║                                              ║"
echo "║  👤 admin / Admin@2025                       ║"
echo "║                                              ║"
echo "║  Ctrl+C pour arrêter                        ║"
echo "╚══════════════════════════════════════════════╝"

wait
