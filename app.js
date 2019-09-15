

var API_Key = "4JhZrt5joIBhUY2fA3kMRtug4WWhJ13G";

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+API_Key+"&q=Michael+Phelps&limit=2&offset=0&rating=G&lang=en"


$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response);
    console.log(response.data[0].images.downsized);

    var myImage = $('<img>');

    var myImageURL = response.data[0].images.original.url;
    myImage.attr("src", myImageURL);
    myImage.attr("alt", "phelps image");

    $('.images').append(myImage);

});