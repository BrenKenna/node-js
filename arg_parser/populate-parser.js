/**
 * 
 * Populating object is straight forward:
 *  - Need function for adding value to argument key
 * 
 *  - Separate function for adding "argument key" to an action
 *      => For each action, get search term, and run "addArgumentValue"
 * 
 *  - Drop argv slice
 * 
 *  - Case insensitive search of actions?
 * 
 *  - Assume required argument if not stated?
 *      => Parser.js may not always need the value in its Keys
 * 
 *  - Better expose parser object to user for their own argument checks
 * 
 *  - Print function + helper function:
 *      -> Sectioned into (along with concatenated search terms):
 *          a). Description
 *          b). Global Arguments
 *          c). Actions
 *          d). Action arguments
 * 
 *      -> If user supplies -h/--help then console.log(`${ParserObj.display()}`)
 * 
 *  - In seeing username, title etc actions should have an "ActionScopedArgs"
 *
 */

// Import parser
const Parser = require("./parser.js");
const ParserObj = new Parser();
const args = process.argv.slice(2);


/**
 * 
 * Define expected command line application interaction
 * 
 * */ 


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


/**
 * 
 *  Set values
 * 
 */


// Initialize variables
let argInd;
argv = [
    "--server", "myhostname", "-T", "60",
    "register", "--username", "bkenna", "-E", "hello@donkey.com",
    "update", "-T", "myFirstNote", "--heading", "Section1", "-U", "bkenna", "--body", "myFile.txt"
];


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


/**
 * 
 * Main app code
 * 
 */

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

// Set user path constant
let userPath;
let note;
if ( username != undefined) {
    userPath = `${utils.notesRoot}/${username}`;
}