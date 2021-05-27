
$(document).ready(function(){
    $("#submit").on("click", function(){
        var text = $("#brewsearch").val();
        console.log(text);
        //search history for the places in local storage
        localStorage.setItem("text", text);
        localStorage.getItem(text);
    })
});

var getBreweries = function(){
    var apiUrl = `https://api.openbrewerydb.org/breweries?by_state=new_york`;
    fetch(apiUrl)
    .then(function (response){
        console.log(response.json());
    })  

}

getBreweries();