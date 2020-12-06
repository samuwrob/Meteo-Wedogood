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



    <!-- Formulaire pour le choix de ville  -->
    <form id="cityForm">
        <input type="text" placeholder="Entrez votre ville" id="input-city" name="input-city" pattern="[\s áàâäçéèêëîïôöùûüÁÀÂÄÇÉÈÊËÎÏÔÖÛÜ A-Za-z-]+" required>
        <input type="submit">
    </form>


    <!-- Informations sur la ville selectionné et la date de l'envoie  -->
    <div id="requestInfo">
        <div id="date"></div>
        <div id="cityName"></div>
    </div>



    <!-- Listes des prévisions météorologiques demandées -->
    <div id="weatherList">
        <!-- Boucle permettant d'afficher la météo sur 3 jours -->
        <?php for ($i = 0; $i <= 2; $i++) {
        ?>

            <div id="weather<?php echo $i ?>">

                <div>Le <span id="weather<?php echo $i ?>Date"> </span></div>
                <div>A <span id="weather<?php echo $i ?>Hour"> </span></div>
                <br>
                <div>Température : <span id="weather<?php echo $i ?>Temp"> </span>°</div>
                <div>Température minimale : <span id="weather<?php echo $i ?>Temp_min"> </span>°</div>
                <div>Température maximale : <span id="weather<?php echo $i ?>Temp_max"> </span>°</div>
                <div>Ressentis : <span id="weather<?php echo $i ?>FeelLike"> </span>°</div>
                <br>
                <div>Pression atmospherique : <span id="weather<?php echo $i ?>Pressure"> </span> hPa</div>
                <br>
                <div><span id="weather<?php echo $i ?>Description"> </span></div>
            </div>

        <?php  } ?>


    </div>
    <!-- Appel du fichier contenant l'AJAX -->
    <script type="text/javascript" src="app.js"></script>
</body>

</html>