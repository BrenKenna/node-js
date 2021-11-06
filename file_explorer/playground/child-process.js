// Import child process
const url = require('url');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');


// Test for a file
let input = 'breadcrumb.js';
let testing;
let item = {};
testing = decodeURIComponent(child_process.execSync(`dir /4 /-C /n ${input}`)).split('\n')[5].replace(/\s+/g, ',').replace('\r', '').split(',');
console.log(testing);
item.Date = testing[1] + " " + testing[0]
item.Size = parseFloat(testing[2] / 1000).toFixed(2);
item.SizeBytes = item.Size + 'MB';
console.log(`
 Parsed file for ${item.Date} and ${item.Size} and ${item.SizeBytes} from ${testing}
`);


//////////////////////////////

// Test for a directory

///////////////////////////////


// Fetch data
input = "";
testing2 = decodeURIComponent(child_process.execSync(`dir /4 /-C /n ${input}`)).split('\n')

// Fetch DIR time stamp
var resultArray = testing2.filter( (input) => {
    return /<DIR>/.test(input);
});
resultArray = resultArray[0].replace(/\s+/g, ',').split(',');
item.DateStamp = resultArray[1] + " " + resultArray[0];


// Parse windows dir output
var resultArray = testing2.filter( (input) => {
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
item.SizeKB = sum / 1000.toFixed(2);


// Log results
console.log(`
 Parsed directory for ${item.Date} and ${item.Size} and ${item.SizeKB} from ${testing2}
`);