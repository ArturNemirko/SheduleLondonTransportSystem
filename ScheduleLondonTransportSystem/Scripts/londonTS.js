var markers = [];
google.maps.visualRefresh = true;
var London = new google.maps.LatLng(51.4922856, -0.1267886);

var mapOptions = {
    zoom: 10,
    center: London,
    mapTypeId: google.maps.MapTypeId.G_NORMAL_MAP
};
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
$(document).ready(function () {
    Initialize();
});

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

$("#showRoute").click(function () {
    setMapOnAll(null);
    $.ajax({
        url: 'https://api.tfl.gov.uk/Line/' + $("#route").val() + '/StopPoints?app_id=b355a2e1&app_key=05ebe75fa9572e2342a5215058ae8adf',
        dataType: "json",
        success: function (data) {
            $.each(data, function (i, item) {
                var marker = new google.maps.Marker({
                    'position': new google.maps.LatLng(item.lat, item.lon),
                    'map': map,
                    'title': item.commonName
                });

                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
                markers.push(marker);
                var infowindow;
                infowindow = new google.maps.InfoWindow({
                    content: "<div class='infoDiv'><h2>" + item.commonName + "</div></div>"
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });
            });
        }
    });
});

function Initialize() {
    $.ajax({
        url: 'https://api.tfl.gov.uk/Line/Route',
        dataType: "json",
        success: function (data, textStatus) {
            $.each(data, function (i, item) {
                $('#route').append('<option value =' + item.id + '>' + item.name + '</option>');
            });
        }
    });
}