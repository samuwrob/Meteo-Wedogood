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
        console.log(this)
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

    //erase not necessary element of DOM
    deleteContent("target0");
    deleteContent("target1");
    deleteContent("target2");
    deleteContent("target3");

    // 4 loops  who reads Json response and call HTML modification functions
    for (let index in weatherInfo['0']) {
        addHTML(index, "0", '0');
    }

    for (let index2 in weatherInfo['10']) {
        addHTML(index2, "1", '10')
    }
    for (let index3 in weatherInfo['20']) {
        addHTML(index3, "2", '20')
    }
    for (let index4 in weatherInfo['30']) {
        addHTML(index4, "3", '30')
    }


    /**
     * Function that delete element.
     * 
     * This function delete some element of the DOM in ordre to beeing replaced.
     * 
     * @param  string   childToErase the node which the child will be delete
     */

    function deleteContent(childToErase) {
        let toErase = document.getElementById(childToErase);
        while (toErase.firstChild) {
            toErase.removeChild(toErase.firstChild)
        }
    }

    /**
     * Function that modify the DOM.
     * 
     * This function call another function, in order to build HTML nodes and content.
     * 
     * @param   int     index       the index of the Json responded by server, useful for creating ID attribute
     * @param   string  targetID    the target useful for creating nodes
     * @param   string  indexJson   the target for reading the multipleArray Json
     */


    function addHTML(index, targetID, indexJson) {
        createWeathercard(index, targetID)
        createWeatherInfo2("day", index, indexJson, targetID, "Le ")
        createWeatherInfo2("hour", index, indexJson, targetID, "A ")
        createWeatherInfo2("temp", index, indexJson, targetID, " Temperature : ", "°")
        createWeatherInfo2("temp_min", index, indexJson, targetID, "Température minimale: ", "°")
        createWeatherInfo2("temp_max", index, indexJson, targetID, "Température maximale : ", "°")
        createWeatherInfo2("feel_like", index, indexJson, targetID, "ressentis : ", "°")
        createWeatherInfo2("pressure", index, indexJson, targetID, "Pression atmospherique : ", "hPa")
        createWeatherInfo2("weather", index, indexJson, targetID,)
    }

    /**
     * Function that create HTML container
     * 
     * This Function will create HTML element, give it attribute and link it into the DOM
     * 
     * @param int       index        the index of the Json responded by server, used for making ID Attribut exploitable in loop
     * @param string    targetID     used in ordre to link into existing HTML and for making ID Attribut exploitable in loop
     */


    function createWeathercard(Id, targetID) {
        element = document.createElement("div")
        element.setAttribute("id", "weather" + targetID + Id)
        target = document.getElementById("target" + targetID)
        target.appendChild(element)

    }
    /**
     * Function that create HTML text in DOM
     * 
     * This Function will create HTML element, give it attribute ,  give it content and link it into the DOM
     *  
     * 
     * @param string    name            the Key in the Json Array, in order to get his value
     * @param int       index           the index of the Json file responded by server, useful for Targeting node and searching into Json response    
     * @param string    indexJson       the target for reading the multipleArray Json
     * @param string    targetID        used in ordre to link into existing HTML and for making ID Attribut exploitable in loop
     * @param string    beginString     the start of the TextNode
     * @param string    endString       the end of the textNode
     */


    function createWeatherInfo2(name, index, indexJson, targetID, beginString = "", endString = "") {
        element = document.createElement("div")
        element.setAttribute("id", "weather" + name + index)

        text = document.createTextNode(beginString + weatherInfo[indexJson][index][name] + endString)

        target = document.getElementById("weather" + targetID + index)
        element.appendChild(text)
        target.appendChild(element)
    }


};
