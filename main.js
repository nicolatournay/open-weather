var select = document.querySelector('select');

fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=countries-codes&q=&rows=249")
    .then(response => response.json())
    .then(data => {
        data.records.forEach(record => {
            var country = record.fields.label_fr;
            var iso_code = record.fields.iso2_code;
            select.innerHTML += `
                <option value="${iso_code}">${country}</option>
            `;
        });;
    })
    .catch(error => {    console.error("Erreur lors de la récupération des données :", error);
});

var apiKey = "5bbccc6c983e2172d96f63d9873c9f5a";

select.addEventListener("change", function() {
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

function searchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {    console.error("Erreur lors de la récupération des données :", error); 
    });
}