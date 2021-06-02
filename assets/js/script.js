var brewList = document.querySelector("#brew-location")
var button = document.querySelector("#submit");
$(document).ready(function () {
    $("#submit").on("click", function () {
        var text = $("#brew-search").val();
        console.log(text);
        getBreweryByCity(text);
        //search history for the places in local storage
        localStorage.setItem("text", text);
        localStorage.getItem(text);
    })
});

function getBreweryByCity(city) {
    var breweryApiURL = `https://api.openbrewerydb.org/breweries?by_city=${city}`;
    fetch(breweryApiURL).then(response => {
        return response.json();
    }).then(function (data) {
        // console.log(data);
        displayBreweries(data);
    });
};

function displayBreweries(breweries) {
    console.log(breweries.length);
    $("#brewery-list").empty();
    for (var i = 0; i < breweries.length; i++) {
        var brewery = breweries[i]
        console.log(brewery);
        var brewEl = document.createElement("a")
        brewEl.innerText = brewery.name
        brewEl.setAttribute("href", brewery.website_url)
        $("#brewery-list").append(brewEl);
    }
};


