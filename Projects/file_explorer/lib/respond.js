// Import modules
const url = require('url');
const path = require('path');
const fs = require('fs');
const buildBreadCrumb = require('./breadcrumb.js');
const buildMainContent = require('./buildMainContent.js');
const getMimeType = require('./getMimeType.js');


// Set key variables
const staticBasePath = path.join(__dirname, '..', 'static');


// Response function
const respond = (request, response) => {

    // Set query
    query = url.parse(request.url, true);

    // Decode path name
    let pathname = decodeURIComponent(query.pathname);
    if(pathname == '/favicon.ico'){
        return false;
    }

    // Get full static path in static folder
    const fullStaticPath = path.join(staticBasePath, pathname);

    
    // Find things in fullStaticPath
    if(!fs.existsSync(fullStaticPath)){
        console.log(`Requested: ${fullStaticPath} not found`);
        response.write('File not found!');
        response.end();
        return false;
    }
    
    // Yes = file or directory
    let DirStats;
    try{
        DirStats = fs.lstatSync(fullStaticPath);
    }catch(err){
        console.log(`lstatSync Error: ${err}`);
    }
    if(DirStats.isDirectory() ){
        // Get content
        let data = fs.readFileSync(path.join(staticBasePath, 'project_files/index.html'), 'utf-8');
        
        // Update page title and breadcrumb
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element != '');
        let folderName = pathElements[0];
        const breadcrumb = buildBreadCrumb(pathname);

        // Handle the home folder
        if(folderName == undefined){
            folderName = "Home";
        }

        // Build main content: table rows
        const MainContent = buildMainContent(fullStaticPath, pathname);


        // Update webpage
        data = data.replace('pathname', breadcrumb);
        data = data.replace('page_title', folderName);
        data = data.replace('mainContent', MainContent);


        // Return data
        response.statusCode = 200;
        response.write(data);
        return response.end();

    }

    // Handle non-files
    if(!DirStats.isFile() ){
        response.statusCode = 401;
        response.write('401: Access denied!');
        console.log('Not a file');
        return response.end();
    }

    // Get file extension
    let fileDetails = {}
    fileDetails.extname = path.extname(fullStaticPath);
    console.log(fileDetails.extname);

    // Fetch size
    let stat;
    try{
        stat = fs.statSync(fullStaticPath); 
    }catch(err){
        console.log(`Error: ${err}`);
    }
    fileDetails.size = stat.size;

    // Get mime type
    getMimeType(fileDetails.extname)
        .then(mime => {

            // Headers object: Content type
            let head = {};
            let statusCode = 200;
            let options = {};

            // Set header parameters
            head['Content-Type'] = mime;
            if(fileDetails.extname == '.pdf'){

                // Add header to view inline
                head['Content-Dispostion'] = 'inline';
    
                // Make downloadable
                // head['Content-Dispostion'] = `attachment; filename = fullStaticPath`;
            }

            // Stream audio / video
            if(RegExp('audio').test(mime) || RegExp('video').test(mime)){

                // Set byte range
                head['Accept-Ranges'] = 'bytes';
                const range = request.headers.range;
                console.log(`range: ${range}`);
                if(range){

                    // Fetch file data
                    const start_end = range.replace(/bytes=/, "").split('-');
                    const start = parseInt(start_end[0]);
                    const end = start_end[1]
                    ? parseInt(start_end[1])
                    : fileDetails.size - 1;

                    // Stream in ranges
                    head['Content-Range'] = `bytes ${start}-${end}/${fileDetails.size}`;
                    head['Content-Length'] = (end - start) + 1;
                    statusCode = 206;
                    options = {start, end};
                }
            }


            //fs.promises.readFile(fullStaticPath, 'utf-8')
            //    .then( data => {
            //        response.writeHead(statusCode, head);
            //        response.write(data);
            //        return response.end();
            //})
            //    .catch(error => {
            //        console.log(error);
            //        response.statusCode = 404;
            //        response.write('404: File reading error!');
            //        return response.end();
            //});

            // Streaming method
            const fileStream = fs.createReadStream(fullStaticPath, options);

            // Stream chunks to response
            response.writeHead(statusCode, head);
            fileStream.pipe(response);

            // Handle file stream events: close and error
            fileStream.on('close', () => {
                return response.end();
            });
            fileStream.on('error', error => {
                console.log(error.code);
                response.statusCode = 404;
                response.write('404: File stream error!');
                return response.end();
            });

        })
        .catch(err => {
            response.statusCode = 500;
            response.write('500: Internal server error!');
            console.log(`Promise error: ${err}`);
            return response.end();
        })
}


// Export
module.exports = respond;