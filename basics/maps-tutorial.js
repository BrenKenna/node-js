/*
*
* - Adding to an array
*   -> Map.get('key').push(element);
* 
* - Updating works similar (benefit of pointers)
*   -> data = Map.get('key'); data.setAttribute('foo'); 
*/

// Import person
const Person = require("./classes.js")


// Create map of positions these people hold
jobs = new Map([
    ["manager", [ new Person("Bill", "32", "01-02-1997")]],
    [ "developer", [ 
        new Person("Tom", "30", "01-01-1999"),
        new Person("Rita", "33", "01-01-1996"),
        new Person("Tim", "32", "01-01-1997")
    ] ],
    ["administrator", [new Person("Jane", "32", "01-01-1997")]]
]);


// Get managers + developers
manager = jobs.get("manager");
checker = manager instanceof Person;
console.log(`${manager} instance of Person = ${checker}`);
checker = manager[0] instanceof Person;
console.log(`First element of manager instance of Person = ${checker}`);
// console.log(`${manager[0].getName()}`);


// Pass to loop
console.log("\nChecking for all managers:");
counter= 0;
for(person of jobs.get("manager")) {
    console.log(`${person.getName()} is a manager`);
    counter++;
}
console.log(`${counter} managers were found`);


// Check counts of each job type
console.log("\nScanning all data:");

function scanEmployees(jobs){ 
    counter = 0;
    for(job of jobs.keys() ) {
        console.log(`\nCounting ${job} in data:`);
        for(person of jobs.get(job)) {
          counter++;
        }
        console.log(`${counter} ${job} found in data`);
        counter = 0;
}
}
scanEmployees(jobs);


// Add some new folks
console.log("Adding new hires:");
jobs.get('manager').push( new Person("Roberto", "32", "01-03-1997") );
jobs.get('manager').push( new Person("Margret", "32", "01-05-1997") );
jobs.get('administrator').push( new Person("Graham", "32", "15-11-1997") );
jobs.get('administrator').push( new Person("Sam", "32", "23-04-1997") );


// Scan again
console.log("\nScanning after new hires:");
scanEmployees(jobs);


// Update bills name
for (person of jobs.get('manager')) {
    if (person.getName() == "Bill") {
        person.setName("Tommy");
    }
}
for (person of jobs.get('manager')) {
    console.log(`Name = ${person.getName()}`);
}