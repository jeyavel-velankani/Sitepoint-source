// jQuery(function() {
//   window.initMap = function initMap() {
//         var directionsDisplay = new google.maps.DirectionsRenderer;
//         var directionsService = new google.maps.DirectionsService;
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 7,
//           center: {lat: 41.85, lng: -87.65}
//         });
//         directionsDisplay.setMap(map);
        
//         directionsDisplay.setPanel(document.getElementById('right-panel'));

//         var onChangeHandler = function() {
//           calculateAndDisplayRoute(directionsService, directionsDisplay);
//         };
//         document.getElementById('start').addEventListener('change', onChangeHandler);
//         document.getElementById('end').addEventListener('change', onChangeHandler);
//   };

//   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//       var start = document.getElementById('start').value;
//       var end = document.getElementById('end').value;
//       directionsService.route({
//         origin: start,
//         destination: end,
//         travelMode: 'DRIVING'
//       }, function(response, status) {
//         if (status === 'OK') {
//           directionsDisplay.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       });
//     }

// });


// ===DISPLAY MAP Directions==========================
// jQuery(function() {
//       window.initMap = function initMap() {
//         var markerArray = [];

//         // Instantiate a directions service.
//         var directionsService = new google.maps.DirectionsService;

//         // Create a map and center it on Manhattan.
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 13,
//           center: {lat: 40.771, lng: -73.974}
//         });

//         // Create a renderer for directions and bind it to the map.
//         var directionsDisplay = new google.maps.DirectionsRenderer({map: map});

//         // Instantiate an info window to hold step text.
//         var stepDisplay = new google.maps.InfoWindow;

//         // Display the route between the initial start and end selections.
//         calculateAndDisplayRoute(
//             directionsDisplay, directionsService, markerArray, stepDisplay, map);
//         // Listen to change events from the start and end lists.
//         var onChangeHandler = function() {
//           calculateAndDisplayRoute(
//               directionsDisplay, directionsService, markerArray, stepDisplay, map);
//         };
//         document.getElementById('start').addEventListener('change', onChangeHandler);
//         document.getElementById('end').addEventListener('change', onChangeHandler);
//       };

//       function calculateAndDisplayRoute(directionsDisplay, directionsService,
//           markerArray, stepDisplay, map) {
//         // First, remove any existing markers from the map.
//         for (var i = 0; i < markerArray.length; i++) {
//           markerArray[i].setMap(null);
//         }

//         // Retrieve the start and end locations and create a DirectionsRequest using
//         // WALKING directions.
//         directionsService.route({
//           origin: document.getElementById('start').value,
//           destination: document.getElementById('end').value,
//           travelMode: 'DRIVING'
//         }, function(response, status) {
//           // Route the directions and pass the response to a function to create
//           // markers for each step.
//           if (status === 'OK') {
//             document.getElementById('warnings-panel').innerHTML =
//                 '<b>' + response.routes[0].warnings + '</b>';
//             directionsDisplay.setDirections(response);
//             showSteps(response, markerArray, stepDisplay, map);
//           } else {
//             window.alert('Directions request failed due to ' + status);
//           }
//         });
//       }

//       function showSteps(directionResult, markerArray, stepDisplay, map) {
//         // For each step, place a marker, and add the text to the marker's infowindow.
//         // Also attach the marker to an array so we can keep track of it and remove it
//         // when calculating new routes.
//         var myRoute = directionResult.routes[0].legs[0];
//         for (var i = 0; i < myRoute.steps.length; i++) {
//           var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
//           marker.setMap(map);
//           marker.setPosition(myRoute.steps[i].start_location);
//           attachInstructionText(
//               stepDisplay, marker, myRoute.steps[i].instructions, map);
//         }
//       }

//       function attachInstructionText(stepDisplay, marker, text, map) {
//         google.maps.event.addListener(marker, 'click', function() {
//           // Open an info window when the marker is clicked on, containing the text
//           // of the step.
//           stepDisplay.setContent(text);
//           stepDisplay.open(map, marker);
//         });
//       }
// });




=======================ADD Places and display places in the map
jQuery(function() {
  var lat_field, lng_field, markersArray, placeMarkerAndPanTo, updateFields;
  markersArray = [];
  lat_field = $('#place_latitude');
  lng_field = $('#place_longitude');
  window.initMap = function() {

    var map;
    if ($('#map').size() > 0) {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: parseInt(lat_field.val(), 10),
          lng: parseInt(lng_field.val(), 10)
        },
        zoom: 8
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