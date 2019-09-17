

var API_Key = "4JhZrt5joIBhUY2fA3kMRtug4WWhJ13G";

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+API_Key+"&q=Michael+Phelps&limit=2&offset=0&rating=G&lang=en"


var gif_categories = ['basketball', 'bike', 'cooking', 'summer', 'rollercoaster',
                    'sports', 'swimming', 'beach', 'run', 'skydive'];




for (var i = 0; i < gif_categories.length; i++) {

    var button = $("<button>");

    button.addClass("button-color");

    button.attr("gif-button", gif_categories[i]);

    button.text(gif_categories[i]);

    $(".button-list").append(button);

}


$("#search-btn").on('click', function(){

    event.preventDefault();

    var input_text = $('#search-term').val().trim();


    if (input_text !== "" && gif_categories.includes(input_text) !== true) {

        console.log(input_text);

        gif_categories.push(input_text);

        console.log(gif_categories);

        var newButton = $("<button>");
        newButton.addClass("button-color");
        newButton.attr("gif-button", input_text);
        newButton.text(input_text);
        $(".button-list").append(newButton);

    }
    
    $("#search-term").val("");
    

})


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    // console.log(response);
    // console.log(response.data[0].images.downsized);

    var myImage = $('<img>');

    var myImageURL = response.data[0].images.original_still.url;
    myImage.attr("src", myImageURL);
    myImage.attr("alt", "phelps image");

    $('.images').append(myImage);

});


