// Import parser
const Parser = require("./parser.js");


// Instantiate parser
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting module import and instantation");
console.log("\n##########################################");
console.log("##########################################\n");
let ParseObj = new Parser();
console.dir(ParseObj);


// Adding arguments and description
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting setting and getting description");
console.log("\n##########################################");
console.log("##########################################\n");
ParseObj.setDescription("Global descriptor for application");
console.dir(ParseObj);
console.log("App description = \'" + ParseObj.getDescription() + "\'");


// Adding and getting arguments
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting adding global arguments to the parser object:");
console.log("\n##########################################");
console.log("##########################################\n");
ParseObj.addArg("input", "input file to perform operation on", "-I,--input");
console.log(`Argument Type of input =  ${typeof ParseObj.getArgument("input")}`);
console.dir(ParseObj.getArgument("input"));

console.log("\nTesting adding second argument:");
ParseObj.addArg("output", "Output file to store results in", "-O,--output");
console.log(`Argument Type of Output =  ${typeof ParseObj.getArgument("output")}`);
console.dir(ParseObj, {depth: null});


// Test duplicating argument
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting duplicating argument:");
console.log("\n##########################################");
console.log("##########################################\n");
ParseObj.addArg("output", "Output file to store results in", "-O,--output");


// Add an action such as Create, Read, Update and Delete
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting adding actions:");
console.log("\n##########################################");
console.log("##########################################\n");
ParseObj.addAction("register", "username", "Register the given username to the application", "-U,--username");
ParseObj.addAction("register", "email", "Email address for the user being registered", "-E,--email-address");
ParseObj.addAction("register", "password", "Password for the user being registered (argument to drop)", "-P,--password");
// console.dir(ParseObj, { depth: null });
console.log(`Action Type of register =  ${typeof ParseObj.getAction("register")}`);
console.log(`Arguments of the \'register\' action:`);
for(i of ParseObj.getAction("register")) {
    console.log(`\t\'${i[0]}\' = \'${i[1]}\'`)
}


// Test dropping an argument from an action
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\nTesting dropping an argument from an action:");
console.log("\n##########################################");
console.log("##########################################\n");
ParseObj.dropArgAction("register", "password");
console.dir(ParseObj, { depth: null });


// Test dropping an action
console.log("\n\n##########################################");
console.log("##########################################");
console.log("\n\nTesting dropping an action:");
console.log("\n##########################################");
console.log("##########################################\n");
console.log("\n\nParser before deletion:\n");
ParseObj.addAction("derp", "silly", "action is being dropped", "-S,--silly");
ParseObj.addAction("derp", "evenMoreSilly", "action is being dropped", "-E,--evenMoreSilly");
console.dir(ParseObj, {depth: null});
ParseObj.dropAction("derp");
console.log("\n\nParser after dropping an action:\n");
console.dir(ParseObj, {depth: null});