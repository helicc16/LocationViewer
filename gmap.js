// Creating google map
             var map = null;
        
            function initialize() {
                var mapProp = {
                    center: new google.maps.LatLng(39.823464, -84.127490),
                    zoom: 12,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
        
        
        
        
            }

            google.maps.event.addDomListener(window, 'load', initialize);


            var breadCrumbs = [];

       