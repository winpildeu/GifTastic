const APIkey = "fqmMfG2eW9wEWkZyz6RpzIhI9daBM4Rb";
let pokedex = ["wartortle", "charizard", "mr. mime", "gengar", "psyduck", "meowth", "caterpie"];

// document ready shorthand
$(function () {

    // Functions ==================================
    function displayButtons() {
        $("#buttons").empty();
        for (let i = 0; i < pokedex.length; i++) {
            let newButton = $("<button>");
            newButton.attr("type", "button").attr("data-name", pokedex[i]).addClass("btn btn-secondary pokeButton").text(`${pokedex[i]}`);
            $("#buttons").append(newButton);
        }
    }

    function giphySearch() {

        // Grab the stored value in the clicked button
        let pokemon = $(this).attr("data-name");
        console.log(`Searching for: ${pokemon}`);

        
    }

    // Events =====================================

    // Add an onclick to all generated elements with a class of pokeButton
    $(document).on("click", ".pokeButton", giphySearch);

    // Adds a pokemon button to the list
    $("#searchButton").on("click", function () {
        event.preventDefault();
        let userInput = $("#searchField").val();
        console.log(`Added button: ${userInput}`);
        pokedex.push(userInput);
        displayButtons();
    });

    // Main code ==================================

    displayButtons();
});