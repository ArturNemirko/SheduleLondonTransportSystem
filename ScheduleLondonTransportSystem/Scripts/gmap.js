var map = null;
var infowindow;
var setMarker = null
var markerClusterer = null;
var zoomLevel = 10;
var centerX = 51.500576;
var centerY = -0.119661;

function initialize() {
    if (map == null) {
        var latlng = new google.maps.LatLng(centerX, centerY);
        var myOptions = {
            zoom: zoomLevel,
            center: latlng
        };
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(centerX, centerY),
            map: map
        });

        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(centerX, centerY + 0.01),
            map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: "okay"
        });

        var infowindow1 = new google.maps.InfoWindow({
            content: "fuck"
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        google.maps.event.addListener(marker1, 'click', function () {
            infowindow1.open(map, marker1);
        });
    };
};

function addStopPointOnTheMap(listStopPoint) {
    debugger;
    for (var i = 0; i < listStopPoint.length; ++i) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(listStopPoint[i].lat, listStopPoint[i].lon),
            map: map
        });
    }
}

function getJson() {
    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.tfl.gov.uk/line/24/stoppoints');
    request.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = JSON.parse(this.responseText);
                for (var i = 0; i < response.length; ++i) {
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(response[i].lat, response[i].lon),
                        map: map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: response[i].commonName
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow.open(map, marker);
                    });

                }
            }
            else {
                console('bad');
            }
        }
    }
    request.send(null);
};

google.maps.event.addDomListener(window, 'load', initialize);