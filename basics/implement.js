// Import the person class
const Person = require("./classes.js");


// Instantiate a person
const person = new Person("Bill", "28", "01-05-1990");
console.log(`My name is ${person.getName()}`);


// Rename
person.setName("Tom");
console.log(`My name is now ${person.getName()}`);