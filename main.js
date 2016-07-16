


var express = require('express');

var app = express();

var fs = require('fs');


app.get('/', function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/html" );
       
        res.end(content);
    });

})

//sending required js files to client browser for initial loading
.get('/jquery-2.2.3.js', function(req,res){
    fs.readFile('./jquery-2.2.3.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})




.get('/gmap.js', function(req,res){ 
    fs.readFile('./gmap.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})
.get('/engine.js', function(req,res){ 
    fs.readFile('./engine.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})

/*
.get('/proj4.js', function(req,res){ 
    fs.readFile('./proj4.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})
.get('/mapScript.js', function(req,res){ 
    fs.readFile('./mapScript.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})

*/


.get('/functions.js', function(req,res){ 
    fs.readFile('./functions.js', 'utf-8', function (error, content) {
        res.setHeader( "Content-Type", "text/plain" );
        res.end(content);
    });
})


.use(function (req, res, next) { //middleware to handle invalid requests
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page cannot be found!');
    next();
});

var server = app.listen(8080, '0.0.0.0', function () { // when 'bind' activity is successful, app.listen(...) returns a HTTP server object
    var host = server.address().address;
    var port = server.address().port;
    console.log("HTTP server listening at http://%s:%s", host, port);

});

var io = require('socket.io').listen(server);

//when client connects, console log it
io.sockets.on('connection', function (socket) {
    console.log('A client is connected');

    socket.emit('message', 'Hello! Please use the control buttons on left to update your position');

    fs.watchFile('./newCoordUpdates_client.txt', function (curr, prev) { // 'current' is a stat object that gives different kinds of info on the file 
        if (curr.mtime != prev.mtime) {
            console.log('file has been modified');
            socket.emit('newUpdates_m', 'new updates available');
        }

        else if (curr.mtime == prev.mtime) {
            console.log('no changes');
        }
        else {
            console.log('There must be a error!');
        }



    });

    socket.on('lrfUpdateReq', function (requestText) {
        //socket.b1 = firstBearing;
        console.log('Client: ' + requestText);
        fs.readFile('./LRF_latlngupdates.txt', 'utf-8', function (error, content) {
            socket.emit('lrfUpdateRes', content);

        });

    });

    socket.on('gpsUpdateReq', function (requestText) {
        console.log('Client: ' + requestText);
        fs.readFile('./GPS_latlngupdates.txt', 'utf-8', function (error, content) {
            socket.emit('gpsUpdateRes', content);
        });
    });


    socket.on('newUpdateReq', function (requestText) {
        console.log('Client: ' + requestText);
        fs.readFile('./newCoordUpdates_client.txt', 'utf-8', function (error, content) {
            socket.emit('newUpdateRes', content);
        });
    });
    /*
    
    socket.on('2ndBearingInput', function (secondBearing) {
    socket.b2 = secondBearing;
    console.log(secondBearing);
    socket.emit('message', 'Great! Now locate the 1st landmark on map then click to set a marker');
    });

    socket.on('message', function (message) {
    console.log('Message from a client: ' + message);

    });
    socket.on('groupChatMessage', function (chatMessage) {

    var chatMessageRelayed = '<b>' + socket.username + '</b> : ' + chatMessage;
    socket.broadcast.emit('relayMessage', chatMessageRelayed);
    });
    socket.on('pokeMessage', function (pokeMessage) {
    console.log(pokeMessage);
    });

    */
});

//Creating a TCP server (local) using Node net module

var net = require('net');
// creating a local TCP server
var localServer = net.createServer(function (socket) {
    //when a TCP client is connected, a net socket instance (net.socket class) is created and pass
    //on to callback function
    console.log('connected to a TCP client');
    socket.write('what z up TCP client');
    socket.on('data', function (data) {
        console.log('Data available at port 8081');
        // Creating a writable stream
        var writeStream = fs.createWriteStream('newCoordUpdates_client.txt');
        // Write received data to output file 'newCoordUpdates_client.txt' with utf-8 encoding

        writeStream.write(data, 'UTF8');

        // Marking end of file
        writeStream.end();

        //Handling stream events: 'finish' and 'error' 


        writeStream.on('finish', function () {
            console.log('Write operation complete');
            
        });

        writeStream.on('error', function (err) {
            console.log(err.stack);
        });

        //Writing the same data to a text file using fs.writeFile() method instead

        fs.writeFile('./newCoords.txt', data, 'UTF8', function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Data written to file successfully');
        });


    });
    socket.on('end', function () {
        console.log('client disconnected');
    });
    socket.pipe(socket);

})

localServer.on('error', function (err) {
    console.log(err);
});

localServer.listen(8081, function () {
    // if binding to port 8081 is successful, log a message on console

    console.log('local server listening at port 8081');
});