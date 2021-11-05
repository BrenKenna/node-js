/**
 * 
 * Ideal execution:
 *  - Give populate-parser the argv
 *  - Populate parser figures out to instantiate parser
 *  - User defines block-of code to setup object
 *  - Two are compared
 *  - Dis-allow two actions for now
 * 
 * Mild bug fix for no action:
 *  node populate-parser.js --timeout 4 --server localhost --register 1 --username bill --email thomas
 * 
 * Works ok with a single action: 
 *  node .\populate-parser.js --timeout 4 --server localhost register  --username bill --email thomas --password donkey
 * 
 * Alternative is to convert array to string and manage that way with regular expressions
 * 
 */

// Import parser
const Parser = require("./parser.js");
const ParserObj = new Parser();
const args = process.argv.slice(2);

// Print command line arguments
let counter = 0;
let actionCounter = 0;
argData = [];
let globalArguments = [];
let actionArguments = [];
let entry;

for(i of args){
    if(counter != args.length) {

        // Define entry for validation
        entry = i + " = " + args[counter+1];

        // Validate entry before push
        if ( entry.indexOf(" = --") == -1 && entry.indexOf(" = --") == -1 ) {

            // Exclude until action is found
            if ( entry.indexOf("-") == -1 ) {
                actionCounter = 1;
            
            } else if (actionCounter == 0 && entry.indexOf("-") > -1 ) {

                // Otherwise add to global arguments
                globalArguments.push(entry);

            } else {

                // Otherwise figure something else out
                argData.push(entry);
            }

        } else if ( entry.indexOf(" = --") > -1 || entry.indexOf(" = --") > -1 ) {

            actionArguments.push(entry);
        }
        
    }
    counter++
}
console.log("\nGlobal arguments:\n\t" + globalArguments);
console.log("\nActions:\n\t" + actionArguments[1].split(" =")[0]);
console.log("\nAction arguments:\n\t" + argData);

// console.log(actionArguments);