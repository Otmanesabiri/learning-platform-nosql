
# API de la Plateforme d'Apprentissage

Une API REST backend basée sur Node.js pour une plateforme d'apprentissage en ligne, construite avec Express.js et utilisant MongoDB et Redis pour une gestion efficace des données et de la mise en cache.

## Structure du Projet

```
learning-platform-nosql/
├── config/
│   ├── db.js         # Gestion des connexions à la base de données
│   └── env.js        # Configuration de l'environnement
├── controllers/
│   ├── courseController.js
│   └── studentController.js
├── routes/
│   ├── courseRoutes.js
│   └── studentRoutes.js
├── services/
│   ├── mongoService.js
│   └── redisService.js
└── app.js            # Fichier principal de l'application
```

## Choix Techniques et Décisions d'Architecture

### 1. Architecture de la Base de Données

Le projet utilise une approche à double base de données :
- **MongoDB** : Base de données principale pour stocker les données des cours et des étudiants
- **Redis** : Couche de cache pour les données fréquemment accédées

Cette architecture a été choisie car :
- MongoDB offre une conception de schéma flexible pour le contenu éducatif
- Le cache Redis réduit la charge de la base de données et améliore les temps de réponse
- La combinaison supporte une haute scalabilité et performance

### 2. Organisation du Code

Le projet suit un modèle d'architecture propre avec une séparation claire des responsabilités :
- **Routes** : Définissent les points d'entrée de l'API et la gestion des routes
- **Contrôleurs** : Gèrent la logique des requêtes/réponses
- **Services** : Contiennent la logique métier principale et les opérations de base de données

Avantages de cette structure :
- Meilleure maintenabilité et testabilité
- Flux de dépendances clair
- Plus facile à étendre et modifier les fonctionnalités

### 3. Configuration de l'Environnement

L'application utilise des variables d'environnement pour la configuration, gérées via `dotenv` :
- Chaînes de connexion aux bases de données
- Paramètres de port
- Secrets de l'application

Cette approche :
- Maintient les informations sensibles sécurisées
- Facilite le déploiement dans différents environnements
- Suit les principes des applications 12-facteurs

### 4. Gestion des Erreurs et Journalisation

L'application implémente :
- Middleware centralisé de gestion des erreurs
- Journalisation des requêtes
- Gestion propre de l'arrêt
- Propagation appropriée des erreurs à travers les couches

## Installation et Configuration

1. Cloner le dépôt :
```bash
git clone https://github.com/Otmanesabiri/learning-platform-nosql
cd learning-platform-nosql
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` dans le répertoire racine avec les variables suivantes :
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.6lgat.mongodb.net/
MONGODB_DB_NAME=learning_platform
REDIS_URI=redis://default:<password>@redis-18396.c228.us-central1-1.gce.redns.redis-cloud.com:18396
PORT=3000
```

4. Démarrer l'application :
```bash
nodemon app.js
```

## Points d'Entrée de l'API

### Cours
- `POST /api/courses` - Créer un nouveau cours
- `GET /api/courses/:id` - Obtenir les détails d'un cours
- `GET /api/courses/stats` - Obtenir les statistiques des cours

### Étudiants
- `POST /api/students` - Créer un nouvel étudiant
- `GET /api/students/:id` - Obtenir les détails d'un étudiant
- `GET /api/students/:id/courses` - Obtenir les cours auxquels un étudiant est inscrit


# Projet de fin de module NoSQL (Réponse sur les questions)
## Questions et Réponses sur l'Architecture

### Architecture de Base de Données

**Q : Pourquoi créer un module séparé pour les connexions aux bases de données ?**
- Centralisation de la logique de connexion à un seul endroit
- Réutilisation facile des connexions dans différentes parties de l'application
- Gestion propre des options de connexion et des erreurs
- Facilitation des tests en permettant le mocking des connexions
- Amélioration de la maintenabilité du code

**Q : Comment gérer proprement la fermeture des connexions ?**
- Implémentation des gestionnaires d'événements pour les signaux de fermeture (SIGTERM, SIGINT)
- Fermeture des connexions dans l'ordre inverse de leur ouverture
- Attente de la fin des requêtes en cours avant la fermeture
- Définition de timeouts pour éviter les blocages
- Journalisation des étapes de fermeture pour le debugging

### Configuration et Variables d'Environnement

**Q : Pourquoi est-il important de valider les variables d'environnement au démarrage ?**
- Détection rapide des erreurs de configuration
- Prévention des erreurs en production dues aux variables manquantes
- Documentation claire des dépendances de l'application
- Facilitation du débogage
- Amélioration de la robustesse globale

**Q : Que se passe-t-il si une variable requise est manquante ?**
- L'application échoue rapidement au démarrage (fail fast)
- Un message d'erreur explicite indique la variable manquante
- Des instructions de résolution sont fournies
- Les logs identifient clairement la source de l'erreur
- L'application ne démarre pas dans un état instable

### Architecture des Routes et Contrôleurs

**Q : Quelle est la différence entre un contrôleur et une route ?**
- Routes : définition des points d'entrée HTTP et leurs méthodes
- Contrôleurs : logique de traitement des requêtes
- Routes : routage vers les bonnes fonctions des contrôleurs
- Contrôleurs : encapsulation de la logique métier et interaction avec les services
- Routes : configuration unique des endpoints

**Q : Pourquoi séparer la logique métier des routes ?**
- Organisation du code selon le principe de responsabilité unique
- Réutilisation facilitée de la logique métier
- Simplification des tests unitaires
- Maintenance facilitée avec des changements localisés
- Meilleure scalabilité de l'application

### Organisation du Code

**Q : Pourquoi séparer les routes dans différents fichiers ?**
- Organisation du code par domaine fonctionnel
- Maintenance facilitée avec un périmètre limité par fichier
- Possibilité de travail en parallèle sur différentes parties
- Meilleure lisibilité du code
- Versioning plus efficace avec moins de conflits

**Q : Comment organiser les routes de manière cohérente ?**
- Regroupement par domaine fonctionnel ou ressource
- Nomenclature cohérente pour les URLs
- Respect des conventions REST
- Documentation claire des paramètres
- Hiérarchie logique dans l'arborescence

### Gestion du Cache Redis

**Q : Comment gérer efficacement le cache avec Redis ?**
- Définition d'une stratégie claire de mise en cache
- Gestion appropriée des erreurs Redis
- Utilisation du pattern cache-aside
- Politique d'expiration adaptée aux données
- Monitoring des performances

**Q : Quelles sont les bonnes pratiques pour les clés Redis ?**
- Utilisation de préfixes pour le groupement logique
- Convention de nommage claire et cohérente
- Évitement des clés trop longues
- Inclusion de la version des données si nécessaire
- Documentation de la structure des clés

### Initialisation de l'Application

**Q : Comment organiser le point d'entrée de l'application ?**
- Initialisation ordonnée des composants
- Validation de la configuration au démarrage
- Mise en place de la gestion d'erreurs globale
- Configuration des middlewares essentiels
- Établissement des connexions aux bases de données

**Q : Quelle est la meilleure façon de gérer le démarrage ?**
- Séquence claire d'initialisation des composants
- Gestion robuste des erreurs de démarrage
- Logs détaillés du processus
- Vérification de l'état des dépendances
- Mécanisme de retry pour les connexions importantes

démarage de serveur après exécution: 
![image](https://github.com/user-attachments/assets/a56edc59-071e-4c3a-ba83-54e31f8ede78)


