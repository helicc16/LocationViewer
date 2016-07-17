//Declaring top-level variables:
var getUpdatesBtn_clicked = false;
//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var socket = io.connect('http://locationviewer-bootstrapps.rhcloud.com:8000');
var socket = io(); // without an argument in the constructor io() , socket object will connect to the server that served it the page

$(document).ready(function () {

    socket.on('message', function (message) {
        $('#serverMessage').text(message);

    });

    socket.on('newUpdates_m', function (message) {
        
        getUpdatesBtn_clicked = false;
        $('#getNewUpdatesBtn').removeClass('disabled');
        socket.emit('newUpdateReq', 'Please send the latest coord set');


    });


    // Sending request for LRF udpates to server when the LRF Updates Button is pressed

    $('#LRFUpdatesBtn').click(function () {
        socket.emit('lrfUpdateReq', 'Please send the latest LRF coords');
    });

    // Once app has received valid response from server, it processes and plots new data
    socket.on('lrfUpdateRes', function (resText) {
        // Using server's response to generate a new Gmap point set 
        var newCoordSet = getPositionUpdates(resText);

        // Plotting new points on map
        drawPath_LRF(newCoordSet);

    });

    // Sending request for GPS updates to server when the GPS Updates Button is pressed

    $('#GPSUpdatesBtn').click(function () {
        socket.emit('gpsUpdateReq', 'Please send the latest GPS coords');
    });

    // Once app has received valid response from server, it processes and plots the new data
    socket.on('gpsUpdateRes', function (resText) {
        // Using server's response to generate a new Gmap point set
        var newCoordSet = getPositionUpdates(resText);

        //Plotting new points on map
        drawPath_GPS(newCoordSet);
    });

    // Sending request for new updates to server when the 'Get New Updates' button is pressed

    $('#getNewUpdatesBtn').on('click', function () {
        if (getUpdatesBtn_clicked == false) {
            socket.emit('newUpdateReq', 'Please send the latest coord set');
            $(this).addClass('disabled');
            getUpdatesBtn_clicked = true;
        }
        else {
            console.log('No updates available');
        }

    });

    //Once app has received valid response from server, it processes and plots the data
    socket.on('newUpdateRes', function (resText) {
        // Using server's response to generate a new Gmap point set
        var newCoordSet = getPositionUpdates(resText);

        //Plotting new points on map
        drawPath(newCoordSet);
    })



});

       