// Class to hold argument data
// - Optional parameters with "arg = None"
class Parser{

    // Constructor
    constructor() {
        this.argData = new Map( [
            [ "Description", "" ],
            [ 'Actions', new Map() ],
            [ "Global Arguments", new Map() ]
        ]);
    }


    /*
    *
    * Setters and droppers for args, actions, action-args
    *  
    */

    // Set description
    setDescription(description) {
        this.argData.set('Description', description);
    }

    // Add an argument <= Maybe have thing to manage --Value -V/v
    addArg(arg, arg_descript, argKeys) {

        // Pass if argument exists
        if ( this.argData.get('Global Arguments').has(arg) ) {
            console.log(`Error, ${arg} already present in object`);

        } else{

            // Otherwise create
            this.argData.get("Global Arguments").set(arg, new Map());
            this.argData.get("Global Arguments").get(arg).set("Description", arg_descript);
            this.argData.get("Global Arguments").get(arg).set("Keys", new Map());
            this.argData.get("Global Arguments").get(arg).get("Keys").set("search", argKeys.split(","));
            this.argData.get("Global Arguments").get(arg).get("Keys").set("value", null);
        }
        
    }

    // Drop argument
    dropArgument(arg) {
        this.argData.get("Global Arguments").delete(arg);
    }

    // Add action
    addAction(action, arg, arg_descript, argKeys) {

        // Handle creating first
        if ( this.argData.get('Actions').has(action) ) {
            
            // Add argument to action
            this.argData.get('Actions').get(action).set(arg, new Map());
            this.argData.get('Actions').get(action).get(arg).set("Description", arg_descript);
            this.argData.get('Actions').get(action).get(arg).set("Keys", new Map());
            this.argData.get('Actions').get(action).get(arg).get("Keys").set("search", argKeys.split(","));
            this.argData.get('Actions').get(action).get(arg).get("Keys").set("value", null);

        } else{

            // Add the action map, then add arg + description to that key
            this.argData.get('Actions').set(action, new Map() );
            this.argData.get('Actions').get(action).set(arg, new Map());
            this.argData.get('Actions').get(action).get(arg).set("Description", arg_descript);
            this.argData.get('Actions').get(action).get(arg).set("Keys", new Map());
            this.argData.get('Actions').get(action).get(arg).get("Keys").set("search", argKeys.split(","));
            this.argData.get('Actions').get(action).get(arg).get("Keys").set("value", null);
        }
    }

    // Drop action
    dropAction(action) {
        this.argData.get('Actions').delete(action);
    }

    // Drop argument from action
    dropArgAction(action, arg) {
        this.argData.get('Actions').get(action).delete(arg);
    }


    /*
     * 
     * Getters
     * 
     */

    // Get description
    getDescription() {
        return this.argData.get("Description");
    }

    // Get global arguments
    getGlobalArguments(){
        return this.argData.get("Global Arguments");
    }

    // Get actions
    getActions() {
        return this.argData.get('Actions');
    }

    // Get argument
    getArgument(arg) {
        return this.argData.get("Global Arguments").get(arg);
    }

    // Get action
    getAction(action) {
        return this.argData.get('Actions').get(action);
    }

    // Get arg in action
    getActionArg(action, arg) {
        return this.argData.get('Actions').get(action).get(arg);
    }
}

// Export class
module.exports = Parser ;