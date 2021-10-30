/* 
 * Utilities to support notes app
*/

// Import modules
// console.log('utils.js')
const fs = require("fs")


// Write to file
function createNotes(notes, note){

    // Only write if file does not exist
    if (fs.existsSync(notes)){
        console.log("Writing to note.txt")
        fs.writeFileSync(notes, note)
    } else{
        console.log("Not writing to existing file")
    }
    
}


// Update note
const appendNotes = (notes, note) => {

    if ( !fs.existsSync(notes)) {
        console.log("Error, can only append an existing file")
    } else{
        console.log("Appending to note.txt")
        fs.appendFileSync(notes, note)
    }
}


// Read notes
const readNotes = (notes) => {
    var note
    if(fs.existsSync(notes)){
        note = fs.readFileSync(notes)
    } else{
        console.log(`Error, could not find notes ${notes}`)
    }
    return note
}

// Exportable variables
const name = "Bill"
module.exports = { name, createNotes, appendNotes, readNotes }