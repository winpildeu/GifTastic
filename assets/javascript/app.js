// document ready shorthand
$(function () {
    let pokedex = ["wartortle", "charizard", "mr. mime", "gengar", "psyduck", "meowth", "caterpie"];

    // Functions ==================================
    function displayButtons() {
        for (let i = 0; i < pokedex.length; i++) {
            let newButton = $("<button>");
            newButton.attr("type", "button").attr("data-value", pokedex[i]).addClass("btn btn-secondary").text(`${pokedex[i]}`);
            $("#buttons").append(newButton);
        }
    }

    // Events =====================================
    $("#searchButton").on("click", function () {
        event.preventDefault();
        let userInput = $("#searchField").val();
        console.log("search button clicked.");
        console.log(userInput);
    });

    // Main code ==================================

    displayButtons();
});