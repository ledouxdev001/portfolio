-- ============================================================
-- Portfolio CV Manager — Script d'initialisation MySQL
-- Exécuter avant de lancer le backend si nécessaire
-- ============================================================

CREATE DATABASE IF NOT EXISTS portfolio_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- Les tables sont créées automatiquement par Spring Boot (DDL auto=update)
-- Ce script configure juste la base de données

-- Optionnel : créer un utilisateur dédié
-- CREATE USER 'portfolio_user'@'localhost' IDENTIFIED BY 'PortfolioPass2025!';
-- GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Vérification
SELECT 'Base de données portfolio_db prête !' AS status;
