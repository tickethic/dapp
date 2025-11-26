# 🚀 Déploiement Vercel - Tickethic

## 📋 Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **GitHub Repository** : `tickethic/tickethic`
3. **Variables d'environnement** configurées

## 🔧 Configuration

### Variables d'environnement requises

**IMPORTANT** : Ne pas mettre les variables dans `vercel.json` ! Les configurer dans le dashboard Vercel.

Dans le dashboard Vercel → Project → Settings → Environment Variables, ajoutez :

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_PROJECT_ID` | `48bf2d8d1236d3befa190b22c42ef96b` | Production, Preview, Development |
| `NEXT_PUBLIC_CONTRACT_EVENT_MANAGER` | `0xAcb5552974E02A26B892aA783ac501C0392C2478` | Production, Preview, Development |
| `NEXT_PUBLIC_CONTRACT_ORGANIZATOR` | `0xEd30Dd6AB73718065ceEC941D59f657d7A5FeA82` | Production, Preview, Development |
| `NEXT_PUBLIC_CONTRACT_ARTIST` | `0x1234567890123456789012345678901234567890` | Production, Preview, Development |
| `NEXT_PUBLIC_CONTRACT_TICKET` | `0x0987654321098765432109876543210987654321` | Production, Preview, Development |
| `NEXT_PUBLIC_CONTRACT_NAME` | `Tickethic` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production, Preview, Development |
| `NEXT_TELEMETRY_DISABLED` | `1` | Production, Preview, Development |

## 🚀 Déploiement

### Option 1 : Déploiement automatique (Recommandé)

1. **Connecter le repository GitHub** :
   - Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
   - Cliquer "New Project"
   - Importer `tickethic/tickethic`
   - Sélectionner le dossier `dapp`

2. **Configurer les variables d'environnement** :
   - Dans "Environment Variables"
   - Ajouter toutes les variables ci-dessus
   - Définir pour "Production", "Preview", et "Development"

3. **Déployer** :
   - Cliquer "Deploy"
   - Vercel déploiera automatiquement

### Option 2 : Déploiement via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
cd dapp
vercel

# Suivre les instructions
```

## 🔄 Déploiements automatiques

- **Push sur `main`** → Déploiement en production
- **Pull Request** → Déploiement en preview
- **Push sur `develop`** → Déploiement en preview

## 🌐 Domaines

### Domaine par défaut
- `tickethic-xxx.vercel.app` (généré automatiquement)

### Domaine personnalisé
1. **Ajouter un domaine** :
   - Dashboard Vercel → Project → Settings → Domains
   - Ajouter `tickethic.ch` et `www.tickethic.ch`

2. **Configurer DNS** :
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

## 🔧 Configuration avancée

### Build Settings
- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`

### Fonctions Serverless
- Les API routes sont automatiquement déployées comme fonctions serverless
- Runtime : Node.js 18.x
- Timeout : 10s (par défaut)

## 📊 Monitoring

- **Analytics** : Vercel Analytics inclus
- **Logs** : Dashboard → Functions → Logs
- **Performance** : Core Web Vitals automatiques

## 🆚 Avantages vs Serveur distant

### ✅ Vercel
- **Déploiement automatique** depuis GitHub
- **CDN global** pour de meilleures performances
- **SSL automatique** et renouvellement
- **Scaling automatique**
- **Monitoring intégré**
- **Preview deployments** pour les PR

### ✅ Serveur distant
- **Contrôle total** de l'infrastructure
- **Coût fixe** (pas de limite de bande passante)
- **Accès SSH** pour debugging
- **Configuration personnalisée** (Nginx, etc.)

## 🔄 Migration

Pour migrer complètement vers Vercel :

1. **Tester le déploiement Vercel**
2. **Configurer le domaine personnalisé**
3. **Mettre à jour les DNS**
4. **Arrêter le serveur distant** (optionnel)

## 🆘 Support

- **Documentation Vercel** : [vercel.com/docs](https://vercel.com/docs)
- **Support** : Dashboard → Help
- **Status** : [vercel-status.com](https://vercel-status.com)
