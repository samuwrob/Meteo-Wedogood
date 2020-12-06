<?php

/**
 * Request OpenWeatherApi.
 * 
 * Send a request for OpenWeatherApi, decode the JSON received, filter the useful data and send it into the Web Browser.
 * 
 * @param   string  $cityName       the city selected by User
 * @return  json    $dataFiltered   the useful data for the User
 * 
 */


class ConnectorToAPIOpenWeather
{

    /**
     * An apikey for calling the API.
     * 
     * @access  private
     * @var     string
     */
    private $apiKey = '2ad6f68527b7207aa7ef530150419e93';


    /**
     * The class constructor.
     * 
     * @access  public
     * @var     string   $cityName   value of User form
     */
    public function __construct($cityName)
    {
        $this->cityName =  $cityName;
    }

    /**
     * An URL builder function.
     * 
     * It Build a functional URL for requesting the API, modifying space characters by - characters
     * 
     * @access  private 
     * @var     string     $city cityName modified
     * @return  string      URL
     */
    private function createURL()

    {
        $city = str_replace(" ", "-", $this->cityName);
        return 'api.openweathermap.org/data/2.5/forecast?q=' . $city . '&units=metric&lang=fr&appid=' . $this->apiKey;
    }

    /**
     * The Main Function.
     * 
     * It initialise, send and close, a Curl request,
     * It manage status code errors,
     * The response is  Filtered and sent into the WebBrowser.
     * 
     * @access public
     * 
     * @return json $result send the json data and a status code
     */

    public function getWeather()
    {
        //initialisation of the Curl Request
        $curl = curl_init();
        $opts = [
            CURLOPT_URL => $this->createURL(),
            CURLOPT_TIMEOUT => 1,
            CURLOPT_RETURNTRANSFER => true,
        ];
        curl_setopt_array($curl, $opts);

        // Management of status code
        try {
            $dataAPI = curl_exec($curl);
            $statusCode =  curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if (http_response_code($statusCode) == 200) {
                $result = $this->filterData($dataAPI);
            } else {
                throw new Exception("Récupération de la réponse HTTP", http_response_code($statusCode));
            }
        } catch (Exception $e) {
            $result = $e->getCode();
        } finally {
            echo $result;
            curl_close($curl);
        }
    }

    /**
     * A data Filter Function.
     * 
     * It take and decode the OpenWeatherApi response, and Filter the useful datas.
     * 
     * @access  private
     * @param   json       $dataAPI       API response
     * 
     * @return  json       $dataFiltered  data for the DOM
     */
    private function filterData($dataAPI)
    {

        $response = json_decode($dataAPI);

        $todayNow = date("d.m.y");
        $hourNow = date("H:i:s");

        $dataFiltered = [];

        $dataFiltered["todayFRNow"] = $todayNow;
        $dataFiltered["hourFRNow"] = $hourNow;
        $dataFiltered["city"] = $this->cityName;

        for ($day = 0, $h24 = 0; $day <= 2; $day++, $h24 = $h24 + 8) {
            $dataFiltered[strval($day)] = [
                "day" => $this->formatDate($response->list[$h24]->dt_txt)[0],
                "hour" => $this->formatDate($response->list[$h24]->dt_txt)[1],
                "temp" => $response->list[$h24]->main->temp,
                "temp_min" => $response->list[$h24]->main->temp_min,
                "temp_max" => $response->list[$h24]->main->temp_max,
                "pressure" => $response->list[$h24]->main->pressure,
                "feel_like" => $response->list[$h24]->main->feels_like,
                "weather" => $response->list[$h24]->weather[0]->description,
            ];
        }
        return json_encode($dataFiltered);
    }

    /**
     * A format date function.
     * 
     * It take a US format Date, transform it into EUR date and split the date into day an hour.
     * 
     * @access  private
     * @param   string  $date     a date on bad format
     * 
     * @return  array   $explode  hour and date on good format
     */

    private function formatDate($date)
    {
        $formatUS = DateTime::createFromFormat('Y-m-d H:i:s', $date);
        $dateFR = $formatUS->format('d-m-Y H:i:s');
        $explode = explode(" ", $dateFR);
        return [$explode[0], $explode[1]];
    }
}

// Start of the script.

$weather = new ConnectorToAPIOpenWeather($_POST['input-city']);
$weather->getWeather();
