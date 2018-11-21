const APIkey = "&api_key=fqmMfG2eW9wEWkZyz6RpzIhI9daBM4Rb&limit=10&rating=g";
let pokedex = ["wartortle", "charizard", "gengar", "psyduck", "meowth", "caterpie"];

// document ready shorthand
$(function () {

    // Functions ==================================
    function displayButtons() {
        $("#buttons").empty();
        for (let i = 0; i < pokedex.length; i++) {
            let newButton = $("<button>");
            newButton.attr("type", "button").attr("data-name", pokedex[i]).addClass("btn btn-secondary pokeButton m-1 shadow-sm").text(`${pokedex[i]}`);
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
                let stillImgURL = result[i].images.fixed_height_still.url;
                let fluidImgURL = result[i].images.fixed_width.url;
                let title = result[i].title;
                let rating = result[i].rating

                // Create the card to insert into the HTML page
                let card = $("<div>");
                card.addClass("card m-2");
                let cardImg = $("<img>");
                cardImg.addClass("card-img-top gif").attr("src", stillImgURL).attr("alt",title).attr("data-still", stillImgURL).attr("data-animate", fluidImgURL).attr("data-state", "still");
                let cardBody = $("<div>");
                cardBody.addClass("card-body bg-success");
                let rated = $("<p>");
                rated.addClass("card-text").text(`Rating: ${rating}`);
                card.append(cardImg);
                card.append(cardBody);
                cardBody.append(rated);
                $("#images").prepend(card);
            }
        });
    }

    function change() {
        console.log("Gif clicked!");

        // STEP TWO: make a variable named state and then store the image's data-state into it.
        // Use the .attr() method for this.
        let state = $(this).attr("data-state");

        // STEP THREE: Check if the variable state is equal to 'still',
        // then update the src attribute of this image to it's data-animate value,
        // and update the data-state attribute to 'animate'.
        if (state === "still") {
            let animateURL = $(this).attr("data-animate");
            $(this).attr("src", animateURL).attr("data-state", "animate");
        }

        // If state is equal to 'animate', then update the src attribute of this
        // image to it's data-still value and update the data-state attribute to 'still'
        if (state === 'animate') {
            let stillURL = $(this).attr("data-still");
            $(this).attr("src", stillURL).attr("data-state", "still");
        }        
    }
    // Events =====================================

    // Add an onclick to all generated elements with a class of pokeButton and gif
    $(document).on("click", ".pokeButton", giphySearch);
    $(document).on("click", ".gif", change);

    // Adds a pokemon button to the list
    $("#searchButton").on("click", function () {
        event.preventDefault();
        let userInput = $("#searchField").val();
        console.log(`Added button: ${userInput}`);
        pokedex.push(userInput);
        displayButtons();
    });

    $(".gif").on("click", function () {
        console.log("Gif clicked!");
    });
    
    // Main code ==================================

    displayButtons();
});