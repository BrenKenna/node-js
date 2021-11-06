/**
 * - Parsing command-line arguments needs some work:
 *      => Need the action scoped arguments + flags
 *      => Simplify retreving argument values
 * 
 * - Registering, creating, reading and updating notes works fine
 * 
 * - Need to add deletion
 * 
 * - Works towards UserDatabase object
 * 
*/

// Import file system module
const utils = require("./notes.js");
const validator = require("validator");

// Import arg parser
const Parser = require("../arg_parser/parser.js");
const ParserObj = new Parser();
const args = process.argv.slice(2);

/**
 * 
 * Parse command line arguments
 * 
 */

// Initialize variables
let argInd;
let actionInd;
let argvSlice;

// Set app descriptor
ParserObj.setDescription("Node based notes application where new userscan register and interact with their own notes\nUsers can register, create, read, update and delete their own notes");

// Set global variables
ParserObj.addArg("Server", "HTTP server listening for requests", "-S,--server");
ParserObj.addArg("Timeout", "Timeout on requests (s)", "-T,--timeout");


// Add actions for registering users:     <= Need descriptor for action
ParserObj.addAction("register", "Username", "Register a new user with username", "-U,--username");
ParserObj.addAction("register", "Email", "Register the username with email address", "-E,--email-address");


// Add actions for CRUD
ParserObj.addAction("create", "Username", "User owning the note", "-U,--username");
ParserObj.addAction("create", "Title", "Title of note", "-T,--title");
ParserObj.addAction("create", "Body", "Body of the note under title, file names are allowed", "-B,--body");

ParserObj.addAction("read", "Username", "User owning the note", "-U,--username");
ParserObj.addAction("read", "Title", "Title of the note to read", "-T,--title");

ParserObj.addAction("update", "Username", "User owning the note", "-U,--username");
ParserObj.addAction("update", "Title", "Title of the note to update", "-T,--title");
ParserObj.addAction("update", "Heading", "Heading of the body to update", "-H,--heading");
ParserObj.addAction("update", "Body", "Body of the body to update", "-B,--body");

ParserObj.addAction("delete", "Username", "User owning the note", "-U,--username");
ParserObj.addAction("delete", "Title", "Title of the note to delete", "-T,--title");
ParserObj.addAction("delete", "Heading", "Heading of the body to delete", "-H,--heading");


// Set global variables
for (i of ParserObj.getGlobalArguments().keys() ){
    if (i != "State") {
        for(j of ParserObj.getArgument(i).get("Keys").get("search")){
            argInd = process.argv.indexOf(j);
            if(argInd >= 0) {
                ParserObj.getArgument(i).get("Keys").set("value", process.argv[argInd+1] );
            }
            
        }
    }
    
}

// Set action variables
for ( action of ParserObj.getActions().keys() ) {
    actionInd = process.argv.indexOf(action);
    if( actionInd != -1 ){

        // Set state
        ParserObj.getAction(action).set("State", 1);

        // Slice argv and search it for arguments
        argvSlice = process.argv.slice(actionInd);
        for (argument of ParserObj.getAction(action).keys()){

            if (argument != "State") {
                for (j of ParserObj.getActionArg(action, argument).get("Keys").get("search")){
                    argInd = argvSlice.indexOf(j);
                    if ( argInd >= 0 ) {
                        ParserObj.getActionArg(action, argument).get("Keys").set("value", argvSlice[argInd+1]);
                    }
                }
            }
        }   
    }
}

// Determine active actions
let actions = [];
let command;
for (action of ParserObj.getActions().keys() ) {
    if (ParserObj.getAction(action).get("State") == 1) {
        actions.push(action);
    }
}

if (actions.length == 1) {
    command = actions[0];
}


// Set variables
let server, timeout;
let username, email;
let title, body, heading;


// Global
server = ParserObj.getArgument("Server").get("Keys").get("value");
timeout = ParserObj.getArgument("Timeout").get("Keys").get("value");


// Registering
// username = ParserObj.getActionArg("register", "Username").get("Keys").get("value");
// email = ParserObj.getActionArg("register", "Email").get("Keys").get("value");

// Creating
// username = ParserObj.getActionArg("create", "Username").get("Keys").get("value");
// title = ParserObj.getActionArg("create", "Title").get("Keys").get("value");
// body = ParserObj.getActionArg("create", "Body").get("Keys").get("value");


// Reading
// username = ParserObj.getActionArg("read", "Username").get("Keys").get("value");
// title = ParserObj.getActionArg("read", "Title").get("Keys").get("value");

// Updating
username = ParserObj.getActionArg("update", "Username").get("Keys").get("value");
title = ParserObj.getActionArg("update", "Title").get("Keys").get("value");
heading = ParserObj.getActionArg("update", "Heading").get("Keys").get("value");
body = ParserObj.getActionArg("update", "Body").get("Keys").get("value");

/**
 * 
 * Main app code
 * 
 */

// Set user path constant
let userPath;
let note;
if ( username != undefined) {
    userPath = `${utils.notesRoot}/${username}`;
}


// Handle registering user
if (command.toLowerCase() == "register") {

    // Make sure username, email are provided
    if (username == undefined || email == undefined) {
        console.log("Error registering new user, both username and email must be provided");

    } else {
        
        // Register user
        utils.registerUser(username, email);
    }

} else if (command.toLowerCase() == "create"){

    // Verify command line arguments
    if (userPath == undefined || title == undefined || body == undefined) {
        console.log("Error creating note, username must be provided");

    } else {
        
        // Handle creating note
        console.log("Attempting to create note");
        out = userPath + "/" + title + ".txt";
        utils.createNotes(out, body);
    }

} else if (command.toLowerCase() == "read"){

    // Handle reading note
    if (username == undefined || title == undefined) {
        console.log("Error both username and title need to be provided");
    } else {
        note = utils.readNotes(`${userPath}/${title}.txt`);
        console.log(`${note}`);
    }

} else if (command.toLowerCase() == "update"){

    if (username == undefined || title == undefined || body == undefined || heading == undefined) {
        console.log("Error username, title, heading and body must all be provided");

    } else {
        
        // Handle appending to a note
        note = utils.appendNotes(`${userPath}/${title}.txt`, `\n\n${heading}\n${body}`);
        console.log(`Finshed adding ${heading} to ${userPath}/${title}.txt`);
    }

} else if (command.toLowerCase() == "delete"){

    // Handle appending to a note
    console.log("Warning not yet implemented");

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


