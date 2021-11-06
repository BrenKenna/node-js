// Import child process
const child_process = require('child_process');


// Function
const calculateSizeDir = (StatItem) => {

    // Fetch data
    let item = {};
    var data = decodeURIComponent(child_process.execSync(`dir /4 /-C /n ${StatItem}`)).split('\n')

    // Fetch DIR time stamp
    var resultArray = data.filter( (input) => {
        return /<DIR>/.test(input);
    });
    resultArray = resultArray[0].replace(/\s+/g, ',').split(',');
    item.Date = resultArray[1] + " " + resultArray[0];


    // Parse output for file sizes
    var resultArray = data.filter( (input) => {
        return /^[0-9]+\//.test(input);
    });
    resultArray = resultArray.filter( (input) => {
        return !/<DIR>/.test(input);
    });


    // Sum file sizes
    let sum;
    sum = 0;
    resultArray.forEach(item => {
        sum = sum + parseInt(item.replace(/\s+/g, ',').replace('\r', '').split(',')[2]);
    });


    // Store as KB
    item.Size = sum;
    item.SizeKB = parseFloat(sum / 1000).toFixed(2) + ' KB';

    // Log results
    console.log(`Parsed directory for ${item.Date} and ${item.Size} and ${item.SizeKB} from ${StatItem}`);


    // Return object
    [ItemDate, ItemSizeBytes, ItemSize] = [item.Date, item.SizeKB, item.Size];
    return [ItemDate, ItemSizeBytes, ItemSize];
}


// Export function
module.exports = calculateSizeDir;