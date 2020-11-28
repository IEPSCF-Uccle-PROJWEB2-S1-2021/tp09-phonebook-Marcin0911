# TP09-phonebook

En vous inspirant de la démo vue durant la leçon, créer un répertoire téléphonique.

Chaque entrée de votre annuaire sera caractérisée par les champs suivants :

* `lastName`
  * Requis
  * Espaces au début et à la fin supprimés
  * Min 3 caractères
  * Les caractères dangereux sont remplacés
* `firstName`
  * Requis
  * Espaces au début et à la fin supprimés
  * Min 3 caractères
  * Les caractères dangereux sont remplacés
* `birthDate`
  * Optionnel
  * Espaces au début et à la fin supprimés
  * Format de date YYYY-MM-DD
  * Après 1900-01-01
  * Converti en date JavaScript
* `phoneNumber`
  * Optionnel
  * Espaces au début et à la fin supprimés
  * Format international +32470123456
  * Les espaces et parenthèses sont tolérés mais supprimés avant enregistrement
* `emailAddress`
  * Optionnel
  * Espaces au début et à la fin supprimés
  * Correspond bien à un email
  * Normalisé

Vous trouverez les fonctions de validation et de nettoyage supportées par express-validator dans la [documentation de validator.js](https://github.com/validatorjs/validator.js).

## Tâches

* [ ] Construisez un formulaire pour encoder une nouvelle entrée dans votre répertoire.
      Le serveur doit valider et nettoyer les données du formulaire selon la description donnée ci-dessus.
      En cas d'erreur, une réponse avec un code `400` sera renvoyée.
      Le navigateur doit également valider autant que possible selon les mêmes règles à l'aide des attributs HTML5.
* [ ] Construisez un tableau affichant les entrées déjà encodées dans le répertoire.
      Le tableau sera stocké dans la mémoire du serveur, exactement comme l'exemple présenté durant la leçon.
* [ ] L'envoi du formulaire et la mise à jour du tableau doivent être réalisés avec AJAX et JSON.
* [ ] Le formulaire et le tableau seront présentés sur la même page sur `GET /`.
* [ ] Le formulaire d'encodage répondra sur `POST /api/phonebook`.
* [ ] La liste des entrées du répertoire sera disponible sur `GET /api/phonebook`.
* [ ] Les noms des propriétés JSON respecteront scrupuleusement l'orthographe proposée.

## Remarque

L'évaluation de ce TP vous demandera de tester l'API JSON de l'application à l'aide de l'outil [Postman](https://www.postman.com/downloads/).
Vérifiez que la réception et l'envoi des données JSON est possible avec Postman en respectant les consignes ci-dessus.
