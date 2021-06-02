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

// var getBreweries = function(){
//     var apiUrl = `https://api.openbrewerydb.org/breweries`;
//     fetch(apiUrl)
//     .then(function (response){
//         console.log(response.json());
//         getBreweryByCity();
//     })  

// }
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

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
        var brewery = breweries[i];
        console.log(brewery);
        var brewEl = document.createElement("p");
        brewEl.innerText = brewery.name;
        brewEl.classList = "brewery-name";

        //brewEl.setAttribute("iframeSrc",)
        //Onclick: Return BreweryName 
        $("#brewery-list").append(brewEl);
        
    }
}
function renderBreweryDirections(breweryName){
    var mapsKey = "AIzaSyD_XHESF0-cQkfMSd2HgoAIeWN6PPRHh0Q";
    var mapHTML = document.querySelector("#map");
    var iframeSrc = "https://www.google.com/maps/embed/v1/search?q=" + breweryName + "&key=" + mapsKey;
    var iframeEl = document.createElement("iframe");
    iframeEl.setAttribute("width","600");
    iframeEl.setAttribute("height","450");
    iframeEl.setAttribute("style","border:0");
    iframeEl.setAttribute("loading","lazy");
    iframeEl.setAttribute("allowfullscreen","");
    iframeEl.setAttribute("src", iframeSrc);
    mapHTML.append(iframeEl);
   // <iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/search?q=left bank&key=AIzaSyD_XHESF0-cQkfMSd2HgoAIeWN6PPRHh0Q"></iframe>
}
$(".list-group").on("click","p", function(){
    var text = $(this)
    .console.log("You Clicked this");
  
    /*
    var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
    */
  });
renderBreweryDirections("Cypress Brewing Company");
