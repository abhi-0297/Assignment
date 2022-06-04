const express = require('express');
const server = express();
const path = require('path')
let port = 3900
const http = require('http');
const upload_csv = require('./app')
const myserver = http.createServer(server)
myserver.listen(port)




try {
    upload_csv()
} catch (error) {
    //console.log('Error in uploading csv', error)
}






