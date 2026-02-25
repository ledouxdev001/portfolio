# 🚀 Déploiement sur Render.com — Guide étape par étape

## Ce que vous obtenez
```
https://portfolio-frontend-xxxx.onrender.com  ← Votre portfolio (public)
https://portfolio-backend-xxxx.onrender.com   ← API backend
                       ↓
              PostgreSQL gratuit
```
Tout est gratuit. Déploiement en ~10 minutes.

---

## ÉTAPE 1 — Pousser le code sur GitHub

```bash
cd portfolio-project

git init
git add .
git commit -m "Portfolio Dorcel Le Doux Fopa"

# Créer un dépôt sur github.com/new puis :
git remote add origin https://github.com/VOTRE_USERNAME/portfolio-cv.git
git branch -M main
git push -u origin main
```

---

## ÉTAPE 2 — Créer le compte Render

1. Aller sur **[render.com](https://render.com)**
2. Cliquer **Get Started for Free**
3. Cliquer **Continue with GitHub** → autoriser Render

---

## ÉTAPE 3 — Déployer avec Blueprint (1 clic)

Le fichier `render.yaml` à la racine permet à Render de tout créer automatiquement.

1. Dans le dashboard Render → cliquer **New +** → **Blueprint**
2. Cliquer **Connect** sur votre dépôt `portfolio-cv`
3. Render détecte `render.yaml` et affiche 3 services à créer :
   - `portfolio-db` (PostgreSQL)
   - `portfolio-backend` (Spring Boot)
   - `portfolio-frontend` (React)
4. Cliquer **Apply**

---

## ÉTAPE 4 — Renseigner les 3 variables admin

Render a besoin de 3 informations qu'il ne peut pas générer seul.

1. Aller dans **Services** → `portfolio-backend` → onglet **Environment**
2. Trouver les 3 variables marquées "Missing" et les remplir :

| Variable | Valeur |
|---|---|
| `ADMIN_USERNAME` | `admin` (ou votre choix) |
| `ADMIN_PASSWORD` | Un mot de passe fort (min. 12 caractères) |
| `ADMIN_EMAIL` | `ledouxdev001@gmail.com` |

3. Cliquer **Save Changes** → Render redémarre automatiquement

---

## ÉTAPE 5 — Attendre la fin du déploiement

Le premier déploiement prend **5 à 10 minutes** (build Maven + build React).

Vous pouvez suivre la progression dans l'onglet **Logs** de chaque service.

Quand les deux services affichent **Live** en vert → c'est en ligne !

---

## ÉTAPE 6 — Accéder à votre portfolio

Dans le dashboard Render → service `portfolio-frontend` → copier l'URL :

```
https://portfolio-frontend-xxxx.onrender.com
```

Pour vous connecter en admin et modifier votre portfolio :
```
https://portfolio-frontend-xxxx.onrender.com/login

Identifiant : le ADMIN_USERNAME que vous avez saisi
Mot de passe : le ADMIN_PASSWORD que vous avez saisi
```

---

## Déploiement automatique (déjà configuré !)

À chaque `git push` sur `main`, Render redéploie automatiquement.
Aucune configuration supplémentaire nécessaire.

```bash
# Modifier du contenu, puis :
git add .
git commit -m "mise à jour portfolio"
git push
# → Render redéploie en ~3 minutes
```

---

## Points à connaître

**Mise en veille** : les services gratuits Render s'endorment après 15 min sans visite.
Le premier visiteur attend ~30 secondes (cold start). Totalement normal.

**Base de données** : le PostgreSQL gratuit est disponible 90 jours.
Après 90 jours, deux options :
- Passer à Neon.tech (PostgreSQL gratuit à vie, ~5 min de migration)
- Payer $7/mois chez Render

**Logs** : en cas de problème → Services → Logs → lire l'erreur.
La cause la plus fréquente : une variable d'environnement manquante.

---

## Problèmes fréquents

**Le backend affiche "Configuration de sécurité invalide"**
→ Les variables `ADMIN_USERNAME`, `ADMIN_PASSWORD` ou `ADMIN_EMAIL` ne sont pas renseignées.
→ Aller dans Environment → les remplir → Save Changes.

**Le frontend affiche une page blanche**
→ Le backend n'est pas encore démarré. Attendre 1-2 min et rafraîchir.

**Erreur CORS**
→ Vérifier que `APP_CORS_ALLOWED_ORIGINS` contient bien l'URL du frontend.
→ Render la configure automatiquement via `render.yaml`, mais si vous avez modifié manuellement, assurez-vous qu'elle ne contient pas de `/` final.
