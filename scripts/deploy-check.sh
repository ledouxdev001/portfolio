#!/bin/bash
# ══════════════════════════════════════════════════════════════════════
#  deploy-check.sh
#  Vérifie que le projet est prêt pour le déploiement gratuit
#  Usage : bash scripts/deploy-check.sh
# ══════════════════════════════════════════════════════════════════════
set -euo pipefail

GREEN='\033[0;32m'; RED='\033[0;31m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

ROOT="$(dirname "$0")/.."
PASS=0; WARN=0; FAIL=0

ok()   { echo -e "  ${GREEN}✓${NC} $1"; PASS=$((PASS+1)); }
warn() { echo -e "  ${YELLOW}⚠${NC} $1"; WARN=$((WARN+1)); }
fail() { echo -e "  ${RED}✗${NC} $1"; FAIL=$((FAIL+1)); }

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║   Vérification pré-déploiement               ║${NC}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${NC}"

# ── Git ───────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Git${NC}"
if git -C "$ROOT" rev-parse --git-dir &>/dev/null; then
  ok "Dépôt Git initialisé"
  REMOTE=$(git -C "$ROOT" remote get-url origin 2>/dev/null || echo "")
  if [[ "$REMOTE" == *"github.com"* ]]; then
    ok "Remote GitHub configuré : $REMOTE"
  else
    fail "Remote GitHub non configuré → git remote add origin https://github.com/USER/REPO.git"
  fi
  BRANCH=$(git -C "$ROOT" branch --show-current)
  [[ "$BRANCH" == "main" ]] && ok "Branche : main" || warn "Branche actuelle : $BRANCH (le déploiement se fait depuis main)"
else
  fail "Pas de dépôt Git → git init && git add . && git commit -m 'initial'"
fi

# ── Sécurité ──────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Sécurité${NC}"

if grep -q "^\.env$" "$ROOT/.gitignore" 2>/dev/null; then
  ok ".env dans .gitignore"
else
  fail ".env PAS dans .gitignore → risque d'exposition des secrets !"
fi

if [ -f "$ROOT/.env" ]; then
  warn "Fichier .env présent localement (normal, mais NE PAS pousser sur GitHub)"
fi

# Vérifier qu'aucun secret n'est hardcodé
SECRETS_FOUND=0
for f in "$ROOT/backend/src/main/resources/application.properties" \
         "$ROOT/docker-compose.yml"; do
  if grep -qE "password.*=.*[a-zA-Z0-9]{8,}" "$f" 2>/dev/null; then
    if ! grep -qE "password.*=\\\$\{" "$f" 2>/dev/null; then
      fail "Possible secret hardcodé dans $f"
      SECRETS_FOUND=1
    fi
  fi
done
[ "$SECRETS_FOUND" -eq 0 ] && ok "Aucun secret hardcodé détecté"

# ── Fichiers de déploiement ───────────────────────────────────────────
echo ""
echo -e "${BOLD}Fichiers de déploiement${NC}"

[ -f "$ROOT/frontend/vercel.json" ]       && ok "vercel.json présent"        || fail "vercel.json manquant"
[ -f "$ROOT/backend/railway.json" ]       && ok "railway.json présent"       || fail "railway.json manquant"
[ -f "$ROOT/backend/Dockerfile" ]         && ok "Dockerfile backend présent" || fail "Dockerfile backend manquant"
[ -f "$ROOT/frontend/Dockerfile" ]        && ok "Dockerfile frontend présent"|| fail "Dockerfile frontend manquant"
[ -f "$ROOT/.github/workflows/deploy-frontend.yml" ] && ok "Workflow deploy frontend présent" || warn "Workflow deploy frontend manquant"
[ -f "$ROOT/.github/workflows/deploy-backend.yml" ]  && ok "Workflow deploy backend présent"  || warn "Workflow deploy backend manquant"

# ── Configuration REACT_APP_API_URL ───────────────────────────────────
echo ""
echo -e "${BOLD}Configuration Frontend${NC}"
if grep -q "REACT_APP_API_URL" "$ROOT/frontend/src/services/api.js" 2>/dev/null; then
  ok "api.js supporte REACT_APP_API_URL"
else
  fail "api.js ne supporte pas REACT_APP_API_URL → l'API ne sera pas joignable en production"
fi

# ── Build test rapide ─────────────────────────────────────────────────
echo ""
echo -e "${BOLD}Tests rapides${NC}"

if command -v node &>/dev/null; then
  NODE_V=$(node --version)
  ok "Node.js installé : $NODE_V"
else
  warn "Node.js non installé localement (requis pour tester le build)"
fi

if command -v mvn &>/dev/null; then
  ok "Maven installé"
else
  warn "Maven non installé localement (requis pour tester le build)"
fi

# ── Résumé ────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}══════════════════════════════════════════════${NC}"
echo -e "  ${GREEN}✓ OK${NC}     : $PASS"
echo -e "  ${YELLOW}⚠ Attention${NC}: $WARN"
echo -e "  ${RED}✗ Erreur${NC}  : $FAIL"
echo ""

if [ "$FAIL" -eq 0 ]; then
  echo -e "${BOLD}${GREEN}✅ Projet prêt pour le déploiement !${NC}"
  echo ""
  echo -e "  Prochaine étape : consulter ${CYAN}DEPLOY.md${NC}"
else
  echo -e "${BOLD}${RED}❌ Corrigez les erreurs avant de déployer.${NC}"
  exit 1
fi
echo ""
