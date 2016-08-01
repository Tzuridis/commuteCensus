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


    $('#userInput').submit(
        function(event) {
            event.preventDefault();
            var searchTerm = $('#inputBox').val();
            console.log(states[searchTerm])
            var request = {
                "level": "state",
                "state": states[searchTerm],
                "variables": [
                    "commute_time",
                    "population",
                    "income"

                ],
                "api": "acs1",
                "year": "2013"
            };

            console.log(request)



            census.APIRequest(request, function(response) {
                $(".results").html("</p>" +  " " + 
                    "<p>" + 'Population:' + "</p>" + response.data[0].population + "</p>" +  " " + 
                    "</p>" +  " " + 
                    "<p>" + 'Average Income:' + "</p>" + response.data[0].income + "</p>" +  " " +  
                    "<p>" + 'Average Commute Time:' + "</p>" + response.data[0].commute_time_normalized + " " + 'minutes.')

                console.log(response.lat)

                console.log(response.lng)

                function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: response.lat, lng: response.lng},
          zoom: 8
        });
      }
      initMap();
      
            });





        });
});