// Import file system module
const utils = require("./notes.js");
const validator = require("validator");
const notesRoot = "./notes";
// console.log(utils.name)


// Handle creating note
const command = process.argv[2];
if (command.toLowerCase() == "create"){
    console.log("Attempting to create note");
    utils.createNotes('notes-2.txt', 'Hello again :)');

} else if (command.toLowerCase() == "read"){

    // Handle reading note
    note = utils.readNotes(`${notesRoot}/notes-2.txt`);
    console.log(`${note}`);

}else if (command.toLowerCase() == "update"){

    // Handle appending to a note
    note = utils.appendNotes(`${notesRoot}/notes-2.txt`, "Hello");
    console.log(`${note}`);

}else if (command.toLowerCase() == "delete"){

    // Handle appending to a note
    // note = utils.appendNotes(`${notesRoot}/notes-2.txt`, "Hello")
    // console.log(`${note}`)

} else {
    console.log("Error only create, get, update and delete are allowed");
}


// Read note 2
// console.log("\n\nLog 2:\n")
// note = utils.readNotes(`${notesRoot}/notes.txt`)
// console.log(`${note}`)


// Check an email
// console.log("\nValidator Checks:")
// console.log(`Hello an email? ${validator.isEmail("Hello")}`)
// console.log(`johnnu@gmail.com an email? ${validator.isEmail("johnny@gmail.com")}`)
// console.log(`https://www.hello.com a URL? ${validator.isURL("https://www.hello.com")}`)


