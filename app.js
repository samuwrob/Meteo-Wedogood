/**
 * 
 * The Main function 
 * 
 * It take the input of the User for the choice of city,
 * Send a request into the server,
 * Manage the response errors,
 * And display the response in the DOM.
 * 
 * @param string city the input in the form by User.
 * 
 */

let cityForm = document.getElementById("cityForm")

cityForm.addEventListener("submit", function (e) {



    e.preventDefault();


    let city = new FormData(this);
    let xhr = new XMLHttpRequest();


    // Management of status code

    xhr.onreadystatechange = function () {

        if (this.readyState === 4) {

            switch (this.status) {
                case 500:
                    alert("Le serveur ou l'API est déconnecté.")
                    break

                case 404:
                    alert("Veuillez inscrire une ville existante.")
                    break;

                case 403:
                    alert("Le token a expiré.");
                    break;

                case 200:
                    let weatherInfo = this.response;
                    weathertoHTML(weatherInfo);
                    break;

                default:
                    alert("une erreur inconnue s'est produite.");
                    break;
            }
        }
    }

    //send the city in server in asynchronous, and the result will be json type
    xhr.open("POST", "script.php", true);
    xhr.responseType = "json"
    xhr.send(city);


});

/**
 * Function that send data received in the DOM.
 * 
 * @param json weatherInfo.
 */

function weathertoHTML(weatherInfo) {

    date.innerHTML = "Requete envoyé à " + weatherInfo["hourFRNow"] + ", ";
    cityName.innerHTML = "Pour la ville de  " + weatherInfo["city"] + ".";

    document.getElementById("weatherList").style.display = "flex"

    //Today
    weather0Date.innerHTML = weatherInfo['0']["day"];
    weather0Hour.innerHTML = weatherInfo['0']["hour"];
    weather0Temp.innerHTML = weatherInfo['0']["temp"];
    weather0Temp_min.innerHTML = weatherInfo['0']["temp_min"];
    weather0Temp_max.innerHTML = weatherInfo['0']["temp_max"];
    weather0Pressure.innerHTML = weatherInfo['0']["pressure"];
    weather0FeelLike.innerHTML = weatherInfo['0']["feel_like"];
    weather0Description.innerHTML = weatherInfo['0']["weather"];

    // Tomorrow
    weather1Date.innerHTML = weatherInfo['1']["day"];
    weather1Hour.innerHTML = weatherInfo['1']["hour"];
    weather1Temp.innerHTML = weatherInfo['1']["temp"];
    weather1Temp_min.innerHTML = weatherInfo['1']["temp_min"];
    weather1Temp_max.innerHTML = weatherInfo['1']["temp_max"];
    weather1Pressure.innerHTML = weatherInfo['1']["pressure"];
    weather1FeelLike.innerHTML = weatherInfo['1']["feel_like"];
    weather1Description.innerHTML = weatherInfo['1']["weather"];
    //After Tomorrow
    weather2Date.innerHTML = weatherInfo['2']["day"];
    weather2Hour.innerHTML = weatherInfo['2']["hour"];
    weather2Temp.innerHTML = weatherInfo['2']["temp"];
    weather2Temp_min.innerHTML = weatherInfo['2']["temp_min"];
    weather2Temp_max.innerHTML = weatherInfo['2']["temp_max"];
    weather2Pressure.innerHTML = weatherInfo['2']["pressure"];
    weather2FeelLike.innerHTML = weatherInfo['2']["feel_like"];
    weather2Description.innerHTML = weatherInfo['2']["weather"];
};
