# Projet NWT 2021
## CHONÉ Thibault
## LIAUD Alexis

Prérequis pour l'installation:
	- Angular
	- Nest.js
	- Webstorm
	- MongoDB
	- Node.js
	- Yarn

Ce projet a été réalisé dans le cadre du cours sur les nouvelles technologies du web  à  _**l'Université de Lorraine de Nancy**_. 

# Installation front 

Afin d'installer la partie _**front-end**_ de l'application il est d'abord nécessaire de créer un dossier et d'y  _**cloner*_ le repository contenant les sources du front :

    git clone https://github.com/thibch/nwt-project-front.git

Il faut ensuite ce rendre dans le dossier créé :

    cd nwt-project-front

Puis  _**installer les dépendances**_ du projet avec :

    yarn install

Enfin, il suffit de  _**lancer**_ le projet directement sur Webstorm ou grâce à la commande :

    ng serve


# Installation back et BDD
## Préparation du back
Afin d'installer la partie _**back-end**_ de l'application il est d'abord nécessaire de créer un dossier et d'y  _**cloner*_ le repository contenant les sources du back :

    git clone https://github.com/liaud1u/nwt-project-back.git

Il faut ensuite ce rendre dans le dossier créée :

    cd nwt-project-back

Puis  _**installer les dépendances**_ du projet avec :

    yarn install
    
## Préparation de la DB
Il faut créer une nouvelle base de donnée MongoDB (avec un outil externe comme Robot 3T par exemple) du nom de _**nwt**_.

Il faudra ensuite executer dans l'ordre les scripts _**nwt-project-back/scripts/init.mongo.js**_ et _**nwt-project-back/scripts/index.mongo.js**_ trouvable dans le dossier _**nwt-project-back/scripts**_.

La base de donnée et des collections ainsi que leurs indexes devraient être créée. 

## Lancement

 Enfin, il suffit de  _**lancer**_ le projet directement sur Webstorm ou grâce à la commande :

    nest start —watch
