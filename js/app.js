var input;
$(function() {

    var sdk = new CitySDK();
    var census = sdk.modules.census;
    census.enable("5b127cd94e9fa8f7cbf337aa376f4d0be96d5375");

    $('#userInput').submit(
        function(event) {
            event.preventDeafult();
            var searchTerm = $('#inputBox').val();
            input = searchTerm;
        })

    var request = {
        "level": "state",
        "state": input,
        "variables": [
            "commute_time"
        ],
        "api": "acs5",
        "year": "2013"
    };

    census.APIRequest(request, function(response) {

        $(".results").append(JSON.stringify(response));

    });

})