$(function() {

    var sdk = new CitySDK();
    var censusModule = sdk.modules.census;

    censusModule.enable("5b127cd94e9fa8f7cbf337aa376f4d0be96d5375");

    $('#userInput').submit(function(event) {
        event.preventDeafult();
        var searchTerm = $('#inputBox').val();
        getRequest(searchTerm);
    });
});

function getRequest(searchTerm) {
    var params = {

    };
    url = ''

    $.getJSON(url, params, function(data) {
        showResults(data)
    });
}

function showResults(results) {
    console.log(results)
}