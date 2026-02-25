#!/bin/bash
# ══════════════════════════════════════════════════════════════════════
#  generate-secrets.sh
#  Génère un fichier .env avec des secrets cryptographiquement sûrs.
#  Usage : bash scripts/generate-secrets.sh
# ══════════════════════════════════════════════════════════════════════
set -euo pipefail

ENV_FILE="$(dirname "$0")/../.env"
EXAMPLE_FILE="$(dirname "$0")/../.env.example"

# ── Couleurs ──────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║   Générateur de secrets — Portfolio DLDP     ║${NC}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════╝${NC}"
echo ""

# ── Vérifications préliminaires ───────────────────────────────────────
if ! command -v openssl &>/dev/null; then
  echo -e "${RED}✗ openssl n'est pas installé. Installez-le et réessayez.${NC}"
  exit 1
fi

if [ -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}⚠ Le fichier .env existe déjà.${NC}"
  read -r -p "  Écraser et régénérer tous les secrets ? [o/N] " confirm
  [[ "$confirm" =~ ^[oO]$ ]] || { echo "Annulé."; exit 0; }
  cp "$ENV_FILE" "${ENV_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
  echo -e "${GREEN}  Sauvegarde créée : .env.backup.*${NC}"
fi

# ── Demander les valeurs non-générables ───────────────────────────────
echo ""
echo -e "${BOLD}Paramètres du compte administrateur :${NC}"

read -r -p "  Nom d'utilisateur admin [admin] : " ADMIN_USERNAME_INPUT
ADMIN_USERNAME_INPUT="${ADMIN_USERNAME_INPUT:-admin}"

while true; do
  read -r -s -p "  Mot de passe admin (min 12 car., laissez vide = généré) : " ADMIN_PASSWORD_INPUT
  echo ""
  if [ -z "$ADMIN_PASSWORD_INPUT" ]; then
    ADMIN_PASSWORD_INPUT=$(openssl rand -base64 16 | tr -dc 'A-Za-z0-9!@#$%' | head -c 16)
    echo -e "  ${GREEN}Mot de passe généré automatiquement${NC}"
    break
  fi
  if [ ${#ADMIN_PASSWORD_INPUT} -lt 12 ]; then
    echo -e "  ${RED}✗ Trop court (minimum 12 caractères)${NC}"
  else
    break
  fi
done

read -r -p "  Email admin [admin@portfolio.local] : " ADMIN_EMAIL_INPUT
ADMIN_EMAIL_INPUT="${ADMIN_EMAIL_INPUT:-admin@portfolio.local}"

read -r -p "  URL CORS [http://localhost:3000] : " CORS_INPUT
CORS_INPUT="${CORS_INPUT:-http://localhost:3000}"

read -r -p "  Nom de la base de données [portfolio_db] : " DB_NAME_INPUT
DB_NAME_INPUT="${DB_NAME_INPUT:-portfolio_db}"

# ── Génération des secrets cryptographiques ───────────────────────────
echo ""
echo -e "${BOLD}Génération des secrets...${NC}"

JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')
MYSQL_ROOT_PASSWORD=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 32)
MYSQL_PASSWORD=$(openssl rand -base64 24 | tr -dc 'A-Za-z0-9' | head -c 32)

echo -e "  ${GREEN}✓ JWT_SECRET généré (64 octets / 512 bits)${NC}"
echo -e "  ${GREEN}✓ MYSQL_ROOT_PASSWORD généré${NC}"
echo -e "  ${GREEN}✓ MYSQL_PASSWORD généré${NC}"

# ── Écriture du fichier .env ──────────────────────────────────────────
cat > "$ENV_FILE" << ENV
# ══════════════════════════════════════════════════════════════════════
#  .env — Généré le $(date '+%Y-%m-%d %H:%M:%S')
#  ⚠ NE JAMAIS commiter ce fichier dans Git !
#  ⚠ Gardez une copie sécurisée de ces secrets (gestionnaire de mots de passe).
# ══════════════════════════════════════════════════════════════════════

# ── MySQL ──────────────────────────────────────────────────────────────
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
MYSQL_DATABASE=${DB_NAME_INPUT}
MYSQL_USER=portfolio_user
MYSQL_PASSWORD=${MYSQL_PASSWORD}

# ── JWT ────────────────────────────────────────────────────────────────
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRATION=86400000

# ── Admin ──────────────────────────────────────────────────────────────
ADMIN_USERNAME=${ADMIN_USERNAME_INPUT}
ADMIN_PASSWORD=${ADMIN_PASSWORD_INPUT}
ADMIN_EMAIL=${ADMIN_EMAIL_INPUT}

# ── CORS ────────────────────────────────────────────────────────────────
APP_CORS_ALLOWED_ORIGINS=${CORS_INPUT}
ENV

chmod 600 "$ENV_FILE"

# ── Résumé ────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${GREEN}║  ✅  Fichier .env généré avec succès !       ║${NC}"
echo -e "${BOLD}${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Fichier    : ${CYAN}.env${NC}"
echo -e "  Permissions: ${CYAN}600 (lecture propriétaire uniquement)${NC}"
echo ""
echo -e "${BOLD}  Identifiants admin :${NC}"
echo -e "  Utilisateur : ${CYAN}${ADMIN_USERNAME_INPUT}${NC}"
echo -e "  Mot de passe: ${CYAN}${ADMIN_PASSWORD_INPUT}${NC}"
echo -e "  ${YELLOW}⚠ Notez ces identifiants dans un gestionnaire de mots de passe !${NC}"
echo ""
echo -e "  Prochaine étape :"
echo -e "  ${CYAN}docker compose up --build${NC}"
echo ""
