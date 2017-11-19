var map;

// Callback function from deferred loading of google maps
function initMap(something) {
    fetch('/testdata/' + window.tripname + '.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (trip) {
            renderMap(trip);
        });
}

function renderMap(trip) {
    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeId: trip.mapType,
        fullscreenControl: true,
        zoom: 0
    });

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < trip.activities.length; i++) {
        var activity = trip.activities[i];
        var line = new google.maps.Polyline({
            clickable: true,
            map: map,
            path: google.maps.geometry.encoding.decodePath(activity.polyline),
            strokeColor: i % 2 === 0 ? '#FF0000' : '#FF8000',
            strokeWeight: 3
        });

        attachPolylineInfoWindow(line, activity.title);

        line.getPath().forEach(function (point, index) {
            bounds.extend(point);
        });
    }

    map.fitBounds(bounds);

    google.maps.event.addDomListener(window, 'resize', resizeMap);
}

function resizeMap() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
}

function attachPolylineInfoWindow(polyline, html) {
    polyline.infoWindow = new google.maps.InfoWindow({
        content: '<div class="mappopup">' + html + '</div>'
    });

    polyline.addListener('click', function (e) {
        polyline.infoWindow.setPosition(e.latLng);
        polyline.infoWindow.open(map);
    });
}