/* 
 * Utilities to support notes app
*/

// Import modules
// console.log('utils.js')
const fs = require("fs");
const notesRoot = "./notes";

// Register user
function registerUser(username, email) {
    let path = notesRoot + "/" + username;
    let out = path + "/" + username + ".txt";
    if ( fs.existsSync(path) ) {
        console.log("User already registerd");
    } else {
        fs.mkdirSync(path);
        note = `Username = ${username}\nEmail = ${email}`;
        fs.writeFileSync(out, note);
        console.log(`User registered under\n${out}`);
    }
    
}

// Write to file
function createNotes(notes, note){

    // Only write if file does not exist
    if ( !fs.existsSync(notes) ){
        console.log(`Writing to ${notes}`);
        fs.writeFileSync(notes, note);
    } else{
        console.log("Not writing to existing file");
    }
    
}


// Update note
const appendNotes = (notes, note) => {

    if ( !fs.existsSync(notes)) {
        console.log("Error, can only append an existing file");
    } else{
        console.log(`Appending to ${notes}`);
        fs.appendFileSync(notes, note);
    }
}


// Read notes
const readNotes = (notes) => {
    let note;
    if(fs.existsSync(notes)){
        note = fs.readFileSync(notes);
    } else{
        console.log(`Error, could not find notes ${notes}`);
    }
    return note;
}

// Exportable variables
module.exports = {notesRoot, registerUser, createNotes, appendNotes, readNotes };