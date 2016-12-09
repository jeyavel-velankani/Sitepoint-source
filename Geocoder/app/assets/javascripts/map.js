jQuery(function() {
  var lat_field, lng_field, markersArray, placeMarkerAndPanTo, updateFields;
  markersArray = [];
  lat_field = $('#place_latitude');
  lng_field = $('#place_longitude');
  
  if (lat_field.val() == "" || lng_field.val() == ""){
    lat_field.val(11.2194);
    lng_field.val(78.1677);
  }
  
  window.initMap = function() {

    var map;
    if ($('#map2').size() > 0) {
      map = new google.maps.Map(document.getElementById('map2'), {
        center: {
          lat: parseInt(lat_field.val(), 10),
          lng: parseInt(lng_field.val(), 10)
        },
        zoom: 10
      });

      map.addListener('click', function(e) {
        placeMarkerAndPanTo(e.latLng, map);
        return updateFields(e.latLng);
      });
      
      return $('#find-on-map').click(function(e) {
        e.preventDefault();
        return placeMarkerAndPanTo({
          lat: parseInt(lat_field.val(), 10),
          lng: parseInt(lng_field.val(), 10)
        }, map);
      });
    }
  };

  placeMarkerAndPanTo = function(latLng, map) {
    var marker;
    while (markersArray.length) {
      markersArray.pop().setMap(null);
    }
    marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    map.panTo(latLng);
    return markersArray.push(marker);
  };

  return updateFields = function(latLng) {
    lat_field.val(latLng.lat());
    return lng_field.val(latLng.lng());
  };
});