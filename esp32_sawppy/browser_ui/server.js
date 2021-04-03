// This NodeJS web server exists to help with developing Sawppy web UI
// elements. This way the HTML/JS/etc. can be developed without having
// to re-upload to the ESP32 upon every change. The goal of this server
// is to be indistinguishable from ESP32 as far as the browser can see.

// References for static file serving:
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/
// https://github.com/cloudhead/node-static

var static = require('node-static');

var fileServer = new static.Server('./static');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (e, res) {
            if (e && (e.status === 404)) {
                // Any other request is treated as valid request for index.html.
                fileServer.serveFile('/index.html', 200, {}, request, response);
            }
        });
    }).resume();
}).listen(8080);
