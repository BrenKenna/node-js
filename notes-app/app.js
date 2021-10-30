// Import file system module
const utils = require("./utils.js")
const validator = require("validator")
console.log(utils.name)


// Write a file
utils.createNotes('notes-2.txt', 'Hello again :)')


// Read notes
var note
console.log("\nLog 1:\n")
note = utils.readNotes("notes-2.txt")
console.log(`${note}`)


// Read note 2
console.log("\n\nLog 2:\n")
note = utils.readNotes("notes.txt")
console.log(`${note}`)


// Check an emai
console.log("\nValidator Checks:")
console.log(`Hello an email? ${validator.isEmail("Hello")}`)
console.log(`johnnu@gmail.com an email? ${validator.isEmail("johnny@gmail.com")}`)
console.log(`https://www.hello.com a URL? ${validator.isURL("https://www.hello.com")}`)