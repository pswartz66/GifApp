

var API_Key = "4JhZrt5joIBhUY2fA3kMRtug4WWhJ13G";



var gif_categories = ['basketball', 'bike', 'cooking', 'summer', 'rollercoaster',
                    'sports', 'swimming', 'beach', 'run', 'skydive'];



// initial loop for gif categories

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

$("#add-btn").on('click', function(){

    // event.preventDefault();

    console.log('clicked');

    $('.button-list').empty();


    var input_text = $('#add-term').val().trim();


    if (input_text !== "" && gif_categories.includes(input_text) !== true) {

        console.log(input_text);

        gif_categories.push(input_text);

        console.log(gif_categories);

        DisplayGIFCategories();

        $("#add-term").val("");

    }

    else {

        DisplayGIFCategories();

        $("#add-term").val("");

    }

    
});

function showGif(){

    event.preventDefault();

    var clickedButton = $(this).text();

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+API_Key+"&q="+clickedButton+"&limit=5&offset=0&rating=G&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);
        // console.log(response.data[0].images.downsized);


        for (var i = 0; i < 5; i++) {

            var myImage = $('<img>');

            var myImageURL_Still = response.data[i].images.original_still.url;
            var myImageURL_Loop = response.data[i].images.original.url;

            myImage.attr("src", myImageURL_Still);
            myImage.attr("data-still", myImageURL_Still);
            myImage.attr("data-loop", myImageURL_Loop);
            myImage.attr("data-state", "still");

            myImage.attr("class", "gif-image");

            $('.images').append(myImage);

            console.log(response.data[i].images.original_still.url);

        }

        
        
    });

}


    function getState() {
        $(".gif-image").on('click', function() {
            var state = $(this).attr("data-state");

            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-loop'));
                $(this).attr('data-state', 'loop')
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }


        });
    };

$(document).on('click', '.gifButton', showGif)

$(document).on('click', '.gif-image', getState)




