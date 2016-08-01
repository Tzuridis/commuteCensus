var map;

var states = {
    'Alabama': "AL",
    'Alaska': "AK",
    'Arizona': "AZ",
    'Arkansas': "AR",
    'California': "CA",
    'Colorado': "CO",
    'Connecticut': "CT",
    'Delaware': "DE",
    'DC': "DC",
    'District Of Columbia': "DC",
    'Florida': "FL",
    'Georgia': "GA",
    'Hawaii': "HI",
    'Idaho': "ID",
    'Illinois': "IL",
    'Indiana': "IN",
    'Iowa': "IA",
    'Kansas': "KS",
    'Kentucky': "KY",
    'Louisiana': "LA",
    'Maine': "ME",
    'Maryland': "MD",
    'Massachusetts': "MA",
    'Michigan': "MI",
    'Minnesota': "MN",
    'Mississippi': "MS",
    'Missouri': "MO",
    'Montana': "MT",
    'Nebraska': "NE",
    'Nevada': "NV",
    'New Hampshire': "NH",
    'New Jersey': "NJ",
    'New Mexico': "NM",
    'New York': "NY",
    'North Carolina': "NC",
    'North Dakota': "ND",
    'Ohio': "OH",
    'Oklahoma': "OK",
    'Oregon': "OR",
    'Pennsylvania': "PA",
    'Rhode Island': "RI",
    'South Carolina': "SC",
    'South Dakota': "SD",
    'Tennessee': "TN",
    'Texas': "TX",
    'Utah': "UT",
    'Vermont': "VT",
    'Virginia': "VA",
    'Washington': "WA",
    'West Virginia': "WV",
    'Wisconsin': "WI",
    'Wyoming': "WY",
    'AK': "AK",
    'AL': "AL",
    'AR': "AR",
    'AZ': "AZ",
    'CA': "CA",
    'CO': "CO",
    'CT': "CT",
    'DE': "DE",
    'FL': "FL",
    'GA': "GA",
    'HI': "HI",
    'IA': "IA",
    'ID': "ID",
    'IL': "IL",
    'IN': "IN",
    'KS': "KS",
    'KY': "KY",
    'LA': "LA",
    'MA': "MA",
    'MD': "MD",
    'ME': "ME",
    'MI': "MI",
    'MN': "MN",
    'MO': "MO",
    'MS': "MS",
    'MT': "MT",
    'NC': "NC",
    'ND': "ND",
    'NE': "NE",
    'NH': "NH",
    'NJ': "NJ",
    'NM': "NM",
    'NV': "NV",
    'NY': "NY",
    'OH': "OH",
    'OK': "OK",
    'OR': "OR",
    'PA': "PA",
    'RI': "RI",
    'SC': "SC",
    'SD': "SD",
    'TN': "TN",
    'TX': "TX",
    'UT': "UT",
    'VA': "VA",
    'VT': "VT",
    'WA': "WA",
    'WI': "WI",
    'WV': "WV",
    'WY': "WY"
}


$(function() {


    var sdk = new CitySDK();
    var census = sdk.modules.census;
    census.enable("5b127cd94e9fa8f7cbf337aa376f4d0be96d5375");

    function initialize() {
        var mapOptions = {
            center: {
                lat: 38.91732,
                lng: -77.2211
            },
            zoom: 10
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        map.data.setStyle({
            fillColor: 'green'
        });
    };

    $('#userInput').submit(
        function(event) {
            event.preventDefault();
            var searchTerm = $('#inputBox').val();
            console.log(states[searchTerm])
            var request = {
                "level": "state",
                "state": states[searchTerm],
                "variables": [
                    "commute_time"
                ],
                "api": "acs1",
                "year": "2013"
            };

            console.log(request)


            $.ajax({

                type: 'GET',

                url: 'http://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/tigerWMS_Current/MapServer/84/query',

                contentType: 'text/plain',

                xhrFields: {
                },

                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                },

                success: function() {
                    console.log(Yes)
                },

                error: function() {
                    console.log(No)
                }
            });



            census.APIRequest(request, function(response) {
                $(".results").append(JSON.stringify("<p>" + 'Average Commute Time:' + "</p>" + response.data[0].commute_time_normalized + " " + 'minutes.'));
            });


            census.GEORequest(request, function(response) {

                map.data.addGeoJson(response);

                console.log(response)

            });


        });
});