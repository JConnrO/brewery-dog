var brewList = document.querySelector("#brew-location")
var button = document.querySelector("#submit");
var mapHistory = [];
$(document).ready(function () {
    $("#submit").on("click", function () {
        var text = $("#brew-search").val();
        getBreweryByCity(text);
    });
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
    var titleEl = document.createElement("h4");
    titleEl.textContent = "Click a Brewery:";
    $("#brewery-list").append(titleEl);
    for (var i = 0; i < breweries.length; i++) {
        var brewery = breweries[i];
        console.log(brewery);

        var brewEl = document.createElement("p");
        brewEl.innerText = brewery.name;
        brewEl.classList = "brewery-name";
        brewEl.setAttribute("id", "brewery-name");

        //function to make the font-size bigger of the brewery lists
        $("#brewery-list").css("font-size", "20px");

        //function to add cursor when clicked on list
        $("#brewery-list").css("cursor", "pointer");

        //brewEl.setAttribute("iframeSrc",)
        //Onclick: Return BreweryName 
        $("#brewery-list").append(brewEl);
    }


    var saveMapHistory = function () {
        localStorage.setItem("mapHistory", JSON.stringify(mapHistory));
    }

    function loadMapHistory() {
        //If not local storage create local storage
        if (localStorage.getItem("mapHistory") === null) {
            //Set up Array
            localStorage.setItem("mapHistory", mapHistory);
            saveMapHistory();
        }
        return JSON.parse(localStorage.getItem("mapHistory"));
    }

    function renderMapHistory() {
        mapHistory = loadMapHistory();
        console.log(mapHistory);
    }

    //on click, store the clicked brewery name
    //localsetitem. localgetitem .val on click
    $( ".brewery-name" ).click(function() {
        $("#map").empty();
        var breweryName = $(this).text();
        mapHistory = loadMapHistory();
        mapHistory.push(breweryName);
        saveMapHistory(breweryName);
        renderMapHistory();
        renderBreweryDirections(breweryName);
    });
}

function renderBreweryDirections(breweryName) {
    var mapsKey = "AIzaSyD_XHESF0-cQkfMSd2HgoAIeWN6PPRHh0Q";
    var mapHTML = document.querySelector("#map");
    var iframeSrc = `https://www.google.com/maps/embed/v1/search?q=${breweryName}&key=${mapsKey}`;
    var iframeEl = document.createElement("iframe");
    // <iframe width="600" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/search?q=left bank&key=AIzaSyD_XHESF0-cQkfMSd2HgoAIeWN6PPRHh0Q"></iframe>
    iframeEl.setAttribute("width", "100%");
    iframeEl.setAttribute("height", "400");
    iframeEl.setAttribute("style", "border:0");
    iframeEl.setAttribute("loading", "lazy");
    iframeEl.setAttribute("allowfullscreen", "");
    iframeEl.setAttribute("src", iframeSrc);
    mapHTML.append(iframeEl);
};

// function renderApp() {

// }