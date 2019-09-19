
// my API key from the Giphy API
var API_Key = "4JhZrt5joIBhUY2fA3kMRtug4WWhJ13G";

// initial array to be displayed on the webpage
var gif_categories = ['basketball', 'bike', 'cooking', 'summer', 'rollercoaster',
                    'sports', 'swimming', 'beach', 'run', 'skydive'];


// initial loop for displaying gif categories
function DisplayGIFCategories(){

    for (var i = 0; i < gif_categories.length; i++) {

        var button = $("<button>");
    
        button.addClass("gifButton");
    
        button.attr("gif-button", gif_categories[i]);
    
        button.text(gif_categories[i]);
    
        $(".button-list").append(button);
    
    }

}

DisplayGIFCategories();

// add a button to each of the initial categories
$("#add-btn").on('click', function(){

    console.log('clicked');

    $('.button-list').empty();

    // get the text box input and set it to a variable
    var input_text = $('#add-term').val().trim();

    // if the input box is not blank and the search category does not already exist
    if (input_text !== "" && gif_categories.includes(input_text) !== true) {

        // add the category to the gif_categories array
        gif_categories.push(input_text);

        // call display categories function again to add new button
        DisplayGIFCategories();

        // remove the input text from the input box
        $("#add-term").val("");

    }

    else {

        // call display categories function again anyway so you have
        // the latest buttons
        DisplayGIFCategories();

        // remove the input text from the input box
        $("#add-term").val("");

    }

});


// wrap the giphy API call inside a function
function showGif(){

    // standard call to stop the default action of the element from occuring
    event.preventDefault();

    // make sure you clear out the existing images div so list does not
    // continuously append more gifs
    $('.images').empty();

    // grab the text from the button that is clicked and append it 
    // to the queryURL below
    // this will be your giphy API search term
    var clickedButton = $(this).text();

    // url linked to the giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+API_Key+"&q="+clickedButton+"&limit=10&offset=0&rating=G&lang=en"

    // ajax call to get the response from the giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        // loop through the API response 10 times to get 10 gifs
        for (var i = 0; i < 10; i++) {

            // create a new image tag on each loop
            var myImage = $('<img>');

            // set variable equal to the still gif image
            var myImageURL_Still = response.data[i].images.original_still.url;

            // set variable equal to the looping gif image
            var myImageURL_Loop = response.data[i].images.original.url;

            // add the variables to the html attributes
            myImage.attr("src", myImageURL_Still);
            myImage.attr("data-still", myImageURL_Still);
            myImage.attr("data-loop", myImageURL_Loop);
            myImage.attr("data-state", "still");
            myImage.attr("class", "gif-image");

            // append to the div class .images
            $('.images').append(myImage);

            // log out the url for the user
            console.log(response.data[i].images.original_still.url);

        }
        
    });

}

    // call a function to set/change state of the GIF image
    function getState() {

        $(".gif-image").on('click', function() {

            // set initial state to a variable which will begin as 'still'
            var state = $(this).attr("data-state");

            // if state of the image is still the change the image to a looping image
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-loop'));
                $(this).attr('data-state', 'loop')
            } else {

                // change the looped image back to the still image
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }


        });
    };

// when the document loads call showGif function which holds our API call
$(document).on('click', '.gifButton', showGif)


// when the document loads call getState function to determine the state
// of the gif image
$(document).on('click', '.gif-image', getState)




