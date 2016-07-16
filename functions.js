function getPositionUpdates(responseText) {
                var obj = JSON.parse(responseText);

                var positions = [];
                for (i = 0; i < obj.length; i++) {
                    var tempGmapPoint = new google.maps.LatLng(obj[i].lat, obj[i].lng);

                    //console.log("tempPoint Lat is " + tempGmapPoint.lat());
                    positions.push(tempGmapPoint);
                }


                return positions;
}
            
//function to retrace LRF past positions with color blue
function drawPath_LRF(latLngSet) {
                var myPath = new google.maps.Polyline({
                    path: latLngSet,
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });

                

                var StartMarker = new google.maps.Marker({
                position: latLngSet[0],
                label: "S"
                });
            
                StartMarker.setMap(map);
            
          
                var StartInfoWindow = new google.maps.InfoWindow({
                content: 'Start Point'
                });
            
                StartInfoWindow.open(map,StartMarker);

                
                var currentMarker = new google.maps.Marker({
           
                
                position: latLngSet[latLngSet.length-1],
                icon: {
                path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: '#0000FF',
                    fillOpacity: 0.2,
                    scale: 10,
                    strokeColor: '#0000FF',
                    strokeWeight: 2
                }
            
                });
        
                currentMarker.setMap(map);

                myPath.setMap(map);
            
}


//function to draw associated GPS past positions  with orange color
function drawPath_GPS(latLngSet) {
                var myPath = new google.maps.Polyline({
                    path: latLngSet,
                    strokeColor: "#ff3300",
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });

                     var StartMarker = new google.maps.Marker({
                position: latLngSet[0],
                label: "S"
                });
            
                StartMarker.setMap(map);
            
          
                var StartInfoWindow = new google.maps.InfoWindow({
                content: 'Start Point'
                });
            
                StartInfoWindow.open(map,StartMarker);

                console.log(latLngSet.length);
                var currentMarker = new google.maps.Marker({
                           
                    position: latLngSet[latLngSet.length-1],
                    icon: {
                    path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: '#ff3300',
                        fillOpacity: 0.2,
                        scale: 10,
                        strokeColor: '#ff3300',
                        strokeWeight: 2
                    }
            
                });
        
                currentMarker.setMap(map);

                myPath.setMap(map);
}


function drawPath(latLngSet) {
                
                var myPath = new google.maps.Polyline({
                    path: latLngSet,
                    strokeColor: "#ff3300",
                    strokeOpacity: 0.8,
                    strokeWeight: 2
                });

                
                var StartMarker = new google.maps.Marker({
                    position: latLngSet[0],
                    label: "S"
                });
            
                StartMarker.setMap(map);
            
          
                var StartInfoWindow = new google.maps.InfoWindow({
                    content: 'Start Point'
                });
            
                StartInfoWindow.open(map,StartMarker);

                console.log(latLngSet.length);
                var currentMarker = new google.maps.Marker({
                           
                    position: latLngSet[latLngSet.length-1],
                
                    icon: {
                    path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: '#ccff66',
                    fillOpacity: 0.2,
                    scale: 10,
                    strokeColor: '#669900',
                    strokeWeight: 2
                    }
            
                    });
        
                currentMarker.setMap(map);

                myPath.setMap(map);
}


       
     