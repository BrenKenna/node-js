// Import node modules
const http = require('http');


// File imports
const respond = require('./lib/respond.js');


// Connection setttings
const port = process.env.PORT || 3000;
// const hostname = '127.0.0.1';



// Create servr
const server = http.createServer(respond);


// Listen for requests
server.listen(port, () => {
    console.log(`listening on port: ${port}`);
});