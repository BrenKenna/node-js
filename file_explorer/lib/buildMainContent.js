// Import modules
const fs = require('fs');
const path = require('path');
const caculateSizeDir = require('./calculateSizeDir.js');
const caculateSizeFile = require('./calculateSizeFile.js');


// Build main content
const buildMainContent = (fullStaticPath, pathname) => {

    // Initialize main content
    let mainContent = '';
    let items;

    // Fetch contents
    try{

        // Get an array of directory contents
        items = fs.readdirSync(fullStaticPath);

    // Add stlyized error
    }catch(err){
        console.log(`Read Sync Error: ${err}`);
        return `<div class="alert alert-danger">${err}</div>`;
    }

    // Filter certain files before display
    items = items.filter(element => !['.DS_Store'].includes(element));

    // Hide project_files from home directory
    if(pathname == '/'){
        items = items.filter(element => !['project_files'].includes(element));
    }

    // Iteratively append content
    items.forEach(item => {

        // Set link
        let itemDetails = {};
        let stats, icon;
        itemDetails.name = item;
        const link = path.join(pathname, item);

        // Fetch stats
        const StatItem = path.join(fullStaticPath, item);
        try{
            itemDetails.stats = fs.statSync(StatItem);
        }catch(err){
            console.log(`Read Sync Error: ${err}`);
            return `<div class="alert alert-danger">Internal Server Error</div>`;
        }

        // Set icon by item type
        if(itemDetails.stats.isDirectory()){
            // Set icon
            itemDetails.icon = `<ion-icon name="folder"></ion-icon>`;

            // Calculate size
            [itemDetails.itemDate, itemDetails.ItemSizeBytes, itemDetails.ItemSize] = caculateSizeDir(StatItem);
    
        }else if(itemDetails.stats.isFile()){
            // Set icon
            itemDetails.icon = `<ion-icon name="document"></ion-icon>`;

            // Calculate size
            [itemDetails.itemDate, itemDetails.ItemSizeBytes, itemDetails.ItemSize] = caculateSizeFile(StatItem);
        }

        // Manage mime type time stamp
        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);
        console.log(itemDetails.timeStamp);
        itemDetails.date = new Date(itemDetails.timeStamp);
        itemDetails.date = itemDetails.date.toLocaleDateString();
        console.log(itemDetails.date);


        // Update main content: Open a file in a new tab
        mainContent += `
        <tr data-name="${itemDetails.name}" data-size="${itemDetails.ItemSize}" data-time="${itemDetails.timeStamp}">
            <td>${itemDetails.icon}<a href="${link}" target='${itemDetails.stats.isFile() ? "_blank" : ""}'>${item}</a></td>
            <td>${itemDetails.ItemSizeBytes}</td>
            <td>${itemDetails.date}</td>
        </tr>`;
    });

    // Return main content
    return mainContent;
};


// Export function
module.exports = buildMainContent;