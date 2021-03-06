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
        displayBreweries(data);
    });
};

var saveMapHistory = function () {
    localStorage.setItem("mapHistory", JSON.stringify(mapHistory));
}

function loadMapHistory() {
    //If not local storage create local storage
    if (localStorage.getItem("mapHistory") === null) {
        //Set up Array
        mapHistory.push("Belford Brewing Company");
        localStorage.setItem("mapHistory", mapHistory);
        saveMapHistory();
    }
    return JSON.parse(localStorage.getItem("mapHistory"));
}
function renderMapHistory() {
    mapHistory = loadMapHistory();
    //console.log("Line 69" + mapHistory);

    $("#brewery-history").empty();
    var breweryListLength = mapHistory.length;

    if (breweryListLength > 5) {
        breweryListLength = 5;
    }

    for (var i = 0; i < breweryListLength; i++) {
        index = mapHistory.length - i - 1;
        var brewEl = document.createElement("p");
        brewEl.innerText = mapHistory[index];
        brewEl.classList = "brewery-name-history";
        brewEl.setAttribute("id", "brewery-name-history");
        $("#brewery-history").append(brewEl);
    }
    $(".brewery-name-history").click(function () {
        $("#map").empty();
        var breweryName = $(this).text();
        mapHistory = loadMapHistory();
        renderMapHistory();
        renderBreweryDirections(breweryName);
    });
}
function displayBreweries(breweries) {
    $("#brewery-list").empty();
    var breweryListLength = breweries.length;
    if (breweryListLength > 8) {
        breweryListLength = 8;
    }
    for (var i = 0; i < breweryListLength; i++) {
        var brewery = breweries[i];
        console.log(brewery);

        var brewEl = document.createElement("p");
        brewEl.innerText = brewery.name;
        brewEl.classList = "brewery-name";
        brewEl.setAttribute("id", "brewery-name");
        $("#brewery-list").append(brewEl);
    }
    $(".brewery-name").click(function () {
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
function renderApp(){

    renderMapHistory();
    renderBreweryDirections(mapHistory[mapHistory.length-1]);

}
renderApp();

