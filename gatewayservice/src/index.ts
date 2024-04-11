import app from './app';

const port = 8000;

const fs = require("fs");
const https = require('https');

let privateKey = fs.readFileSync(__dirname + '/../certificate/certificatekey.key', 'utf8');
let certificate = fs.readFileSync(__dirname+ '/../certificate/certificate.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};
let httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Gateway Service listening at https://localhost:${port}`);
});
