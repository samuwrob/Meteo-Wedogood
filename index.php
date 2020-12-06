<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="style.css" rel="stylesheet">
    <title>Meteo Wedogood</title>
</head>


<body>

    <!-- Titre et présentation du fonctionnement de l'application -->
    <div class="presentation">
        <h1 id="title">Meteo Wedogood !</h1>
        <p>Afin de connaitre la météo d'une ville sur 3 jours, veuillez saisir le nom d'une ville.</p>
    </div>



    <!-- Formulaire pour le choix de ville, gestion des caractères speciaux  -->
    <form id="cityForm">
        <input type="text" placeholder="Entrez votre ville" id="input-city" name="input-city" pattern="[\s áàâäçéèêëîïôöùûüÁÀÂÄÇÉÈÊËÎÏÔÖÛÜ A-Za-z-]+" required>
        <input type="submit">
    </form>


    <!-- Informations sur la ville selectionné et la date de l'envoie  -->
    <div id="requestInfo">
        <div id="date"></div>
        <div id="cityName"></div>
    </div>



    <!-- prévision météo simple -->

    <div id="target0"></div>

    <!-- prévision météo avancée -->
    <div id="weatherList">

        <div id="target1"></div>
        <div id="target2"></div>
        <div id="target3"></div>
    </div>



    <!-- Appel du fichier contenant l'AJAX -->
    <script type="text/javascript" src="app.js"></script>
</body>

</html>