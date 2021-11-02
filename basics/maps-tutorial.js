// Import person
const Person = require("./classes.js")


// Create map of positions these people hold
jobs = new Map([
    ["manager", [ new Person("Jane", "32", "01-01-1997")]],
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
counter = 0;
for(job of jobs.keys() ) {
    console.log(`\nCounting ${job} in data:`);
    for(person of jobs.get(job)) {
        counter++;
    }
    console.log(`${counter} ${job} found in data`);
    counter = 0;
}