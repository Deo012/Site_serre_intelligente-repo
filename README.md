**En linux**

Quand vous le telecharger pour fair la partie python marcher fait pip install, pour installer les package python. 

Ou si vous voulez cree un venv:
- pip install pipenv
- pipenv shell(vous aller savoir si vous ete dans le venv si vous avez le nom de votre projet ou fichier en parenthèse sur la gauche de votre cmdPromt
- pipenv install

**Sur windows**

Voici les étapes a faire pour un fonctionnement correct:

1. A partir du dossier frontend:
  a) faire npm install pour installer toutes les librairies utilisées par Nextjs
  b) ajouter manuellement un fichier .env avec DATABASE_URL = "" (svp me demander pour le url elle connecte a Atlas)
  c) avec ca vous devrier etre capable de lancer le frontend avec : npm run dev

3. A partir du dossier backend:
  a) crée un virtual environnement car tensorflow ne supporte pas la dernière version de python : py -3.12 -m venv backend-env
  b) activer le venv avec : backend-env\Scripts\activate
  c) ensuite faire la commande pour installer les librairies necessaire pour faire fonctionner le code DataSendersTest: pip install -r requirements.txt
  d) pour lancer le code : py DataSendersTest.py

Merci
