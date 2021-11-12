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
 *  - User should be able to query value of their argKey
 *          String username;
 *          queryValue(arg, path = globalArg | actionScoped | actionArg | deepSearch);
 *          username = queryValue(username, path = "actionScoped");
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


// Set global arguments
ParserObj.updateGlobalVariables();


// Set action arguments
ParserObj.updateActionArgs();


// Set variables
let server, timeout;
let username, email;
let title, body, heading;

// Global
server = ParserObj.getGlobalArgumentValue("Server");
timeout = ParserObj.getGlobalArgumentValue("Timeout");
portN = ParserObj.getGlobalArgumentValue("Port");

// Registering
username = ParserObj.getActionArgValue("register", "Username");
email = ParserObj.getActionArgValue("register", "Email");

console.log(`
    Server = ${server},
    Timeout = ${timeout},
    Port Number = ${portN},
    Username = ${username},
    Email = ${email},
    Active actions = ${ParserObj.getActiveActions()}
`)


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