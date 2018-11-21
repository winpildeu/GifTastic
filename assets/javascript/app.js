const APIkey = "&api_key=fqmMfG2eW9wEWkZyz6RpzIhI9daBM4Rb&limit=10&rating=g";
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
        
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        pokemon + APIkey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (resp) {
            // Check that data is recieved and log it
            console.log(queryURL);
            console.table(resp);

            // Save the useful data into a variable
            let result = resp.data;
            
            // Display the images
            for (let i = 0; i < result.length; i++) {
                // save the title and URLs of the current image
                let imgURL = result[i].images.fixed_height_still.url;
                let title = result[i].title;
                let rating = result[i].rating

                // Create the card to insert into the HTML page
                let card = $("<div>");
                card.addClass("card m-2").attr("style", "width: 18rem;");
                let cardImg = $("<img>");
                cardImg.addClass("card-img-top").attr("src", imgURL).attr("alt",title).attr("style", "width: 18rem;");
                let cardBody = $("<div>");
                cardBody.addClass("card-body");
                let rated = $("<p>");
                rated.addClass("card-text").text(`Rating: ${rating}`);
                $("#images").prepend(card, cardImg, cardBody, rated);
            }
        });
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