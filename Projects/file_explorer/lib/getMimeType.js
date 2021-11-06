// Import modules
const https = require('https');
const mimeURL = 'https://gist.githubusercontent.com/AshHeskes/6038140/raw/27c8b1e28ce4c3aff0c0d8d3d7dbcb099a22c889/file-extension-to-mime-types.json';


// Get mime type
const getMimeType = extension => {
    return new Promise( (resolve, reject) => {
        https.get(mimeURL, response => {
            //console.log('statusCode:', res.statusCode);
            //console.log('headers:', res.headers);
            if(response.statusCode < 200 || response.statusCode > 299){
                reject(`Error: Failed to load mime type ${response.statusCode}`);
                return false;
            }


            // Handle data events
            let data = '';
            response.on('data', chunk => {
                data += chunk;
            });


            // Handle completion
            response.on('end', () => {
                resolve(JSON.parse(data)[extension]);
            });

        }).on('error', (e) => {
            console.error(e);
        });
    });
};


// Export module
module.exports = getMimeType;