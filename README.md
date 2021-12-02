# Projet NWT 2021
## CHONÉ Thibault
## LIAUD Alexis

Prérequis pour l'installation:\
- Angular
- Nest.js
- Webstorm
- MongoDB
- Node.js
- Yarn

Ce projet a été réalisé dans le cadre du cours sur les nouvelles technologies du web  à  _**l'Université de Lorraine de Nancy**_.

# Installation front

Afin d'installer la partie _**front-end**_ de l'application il est d'abord nécessaire de créer un dossier et d'y  _*cloner*_ le repository contenant les sources du front :

    git clone https://github.com/thibch/nwt-project-front.git

Il faut ensuite ce rendre dans le dossier créé :

    cd nwt-project-front

Puis  _**installer les dépendances**_ du projet avec :

    yarn install

Enfin, il suffit de  _**lancer**_ le projet directement sur Webstorm ou grâce à la commande :

    ng serve


# Installation back et BDD
## Préparation du back
Afin d'installer la partie _**back-end**_ de l'application il est d'abord nécessaire de créer un dossier et d'y  _*cloner*_ le repository contenant les sources du back :

    git clone https://github.com/liaud1u/nwt-project-back.git

Il faut ensuite ce rendre dans le dossier créée :

    cd nwt-project-back

Puis  _**installer les dépendances**_ du projet avec :

    yarn install

## Préparation de la DB

La base de donnée mongoDB doit se trouver en localhost:27017.

Il faut créer une nouvelle base de donnée MongoDB (nous utilisons ici **Robot3T**) du nom de _**nwt**_.

Il faudra ensuite executer dans l'ordre les _**nwt-project-back/scripts/init.mongo.js**_ ensuite _**nwt-project-back/scripts/index.mongo.js**_ trouvable dans le dossier _**nwt-project-back/scripts**_.

Pour executer dans robot3T un script vous faites cliques droit sur votre base de données `nwt` et cliquez sur `Open Shell`.\
Dans ce shell vous pouvez copier coller le contenu des scripts.

La base de donnée et des collections ainsi que leurs indexes seront créée.

## Lancement du back

Enfin, dans un autre terminal, il suffit de  _**lancer**_ le projet back-end grâce à la commande :

    nest start —watch

## Acceder au site web

Ouvrez votre navigateur et accédez à `localhost:4200`
