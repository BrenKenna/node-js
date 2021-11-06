// Import child process
const child_process = require('child_process');


// Function
const calculateSizeFile = (StatItem) => {
 
    // Test for a file
    let data;
    let item = {};
    data = decodeURIComponent(child_process.execSync(`dir /4 /-C /n ${StatItem}`)).split('\n')[5].replace(/\s+/g, ',').replace('\r', '').split(',');


    // Parse data
    item.Date = data[1] + " " + data[0]
    item.Size = parseFloat(data[2] / 1000).toFixed(2);
    item.SizeBytes = item.Size + ' KB';
    console.log(`
 Parsed file for ${item.Date} and ${item.Size} and ${item.SizeBytes} from ${data}
`);


    // Ouput
    [ItemDate, ItemSizeBytes, ItmeSize] = [item.Date, item.SizeBytes, item.Size];
    console.log(ItemDate);
    return [ItemDate, ItemSizeBytes, ItmeSize];
}


// Export function
module.exports = calculateSizeFile;