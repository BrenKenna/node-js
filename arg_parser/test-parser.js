// Import parser
const Parser = require("./parser.js");


// Instantiate parser
console.log("\nTesting module import and instantation:");
let ParseObj = new Parser();
console.dir(ParseObj);


// Adding arguments and description
console.log("\nTesting setting and getting description");
ParseObj.setDescription("Global descriptor for application");
console.dir(ParseObj);
console.log("App description = \'" + ParseObj.getDescription() + "\'");


// Adding and getting arguments
console.log("\nTesting adding global arguments to the parser object:");
ParseObj.addArg("input", "input file to perform operation on");
console.log(`Argument Type of input =  ${typeof ParseObj.getArgument("input")}`);
console.log(`Input =  ${ParseObj.getArgument("input")}`);

console.log("\nTesting adding second argument:");
ParseObj.addArg("output", "Output file to store results in");
console.log(`Argument Type of Output =  ${typeof ParseObj.getArgument("output")}`);
console.log(`Outnput =  ${ParseObj.getArgument("output")}`);


// Test duplicating argument
console.log("\nTesting duplicating argument:");
ParseObj.addArg("output", "Output file to store results in");


// Add an action such as Create, Read, Update and Delete
console.log("\nTesting adding actions:");
ParseObj.addAction("register", "username", "Register the given username to the application");
ParseObj.addAction("register", "email", "Email address for the user being registered");
ParseObj.addAction("register", "password", "Password for the user being registered (argument to drop)");
// console.dir(ParseObj, { depth: null });
console.log(`Action Type of register =  ${typeof ParseObj.getAction("register")}`);
console.log(`Arguments of the \'register\' action:`);
for(i of ParseObj.getAction("register")) {
    console.log(`\t\'${i[0]}\' = \'${i[1]}\'`)
}


// Test dropping an argument from an action
console.log("\nTesting dropping an argument from an action:");
ParseObj.dropArgAction("register", "password");
console.dir(ParseObj, { depth: null });


// Test dropping an action
console.log("\n\nTesting dropping an action:");
ParseObj.addAction("derp", "silly", "action is being dropped");
ParseObj.addAction("derp", "evenMoreSilly", "action is being dropped");
console.dir(ParseObj, {depth: null});
ParseObj.dropAction("derp");
console.dir(ParseObj, {depth: null});