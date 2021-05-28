var brewList = document.querySelector("#brew-location")
var button = document.querySelector("#submit");
$(document).ready(function(){
    $("#submit").on("click", function(){
        var text = $("#brew-search").val();
        console.log(text);
        //search history for the places in local storage
        localStorage.setItem("text", text);
        localStorage.getItem(text);
    })
});

var getBreweries = function(){
    var apiUrl = `https://api.openbrewerydb.org/breweries`;
    fetch(apiUrl)
    .then(function (response){
        console.log(response.json());
        getBreweryByCity();
    })  

}

function getBreweryByCity(city, state){
    var breweryApiURL = "https://api.openbrewerydb.org/breweries?by_city=${city}&by_state=${state}";
    fetch(breweryApiURL).then(response => {
       console.log(response);
    });
}

// var displayBreweries = function(breweries){
//     for (var i = 0; i >breweries.length; i++) {

//     }
// }


getBreweries();

button.addEventListener("click", getBreweries);


