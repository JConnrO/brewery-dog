
$(document).ready(function(){
    $("#submit").on("click", function(){
        var text = $("#brewsearch").val();
        console.log(text);
        //search history for the places in local storage
        localStorage.setItem("text", text);
        localStorage.getItem(text);
    })
});

