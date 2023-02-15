// sélectionne l'élément select
var select = document.querySelector('select');

// sélectionne la div response
var response = document.querySelector('.response');

// obtient les noms et les codes iso des pays
fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=countries-codes&q=&rows=249")
    .then(response => response.json())
    .then(data => {
        data.records.forEach(record => {
            var country = record.fields.label_en;
            var iso_code = record.fields.iso2_code;
            // et les injecte dans les balises option de selct
            select.innerHTML += `
                <option value="${iso_code}">${country}</option>
            `;
        });;
    })
    .catch(error => {    console.error("Erreur lors de la récupération des données :", error);
});

// ma clé pour l'api d'open weather
var apiKey = "5bbccc6c983e2172d96f63d9873c9f5a";

// s'active quand la valeur de select change
select.addEventListener("change", function() {
    response.innerHTML = "";
    var value = select.value;
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            var lat = data[0].lat;
            var lon = data[0].lon;
            searchWeather(lat, lon);
        })
        .catch(error => {    console.error("Erreur lors de la récupération des données :", error);
    });
});

// fonction pour obtenir les données météo quand on donne les latitudes et longitudes
function searchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var weather = data.weather[0].description;
            var temperature = data.main.temp;
            var fahrenheit = kToF(temperature);
            var celsius = kToC(temperature);
            var humidity = data.main.humidity;
            response.innerHTML += `
                <p>The weather is ${weather}</p>
                <p>The temperature is ${fahrenheit} °F/ ${celsius} °C</p>
                <p>The humidity level is ${humidity}%</p>
            `;
        })
        .catch(error => {    console.error("Erreur lors de la récupération des données :", error); 
    });
}

// from kelvin to fahrenheit
function kToF(kelvin) {
    var kTemp = kelvin;
    var kToFar = Math.round((kTemp - 273.15) * 9/5 + 32);
    return kToFar;
}

// from kelvin to celsius
function kToC(kelvin) {
    var kTemp = kelvin;
    var kToCel = Math.round((kTemp - 273.15));
    return kToCel;
}