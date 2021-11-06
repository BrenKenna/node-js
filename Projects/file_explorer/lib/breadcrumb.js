// Import modules
const path = require('path');


// Build breadcrumb
const buildBreadCrumb = pathname => {

    // Initialize breadcrumb
    let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;

    // Split pathname
    const pathChunks = pathname.split('/').filter(element => element != '');
    console.log(pathChunks);

    // Append items to breadcrumb
    let link = '/';
    pathChunks.forEach( (item, index) => {
        link = path.join(link, item);
        if(index != pathChunks.length - 1){
            breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${item}</a></li>`;
        }else{
            breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${item}</li>`;
        }
        
    });

    // Return the breadcrumb
    return breadcrumb;
};


// Export function
module.exports = buildBreadCrumb;