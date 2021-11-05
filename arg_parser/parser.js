// Class to hold argument data
// - Optional parameters with "arg = None"
class Parser{

    // Constructor
    constructor() {
        this.argData = new Map( [
            [ "description", "" ],
            [ "actions", new Map() ],
            [ "arguments", new Map() ]
        ]);
    }


    /*
    *
    * Setters and droppers for args, actions, action-args
    *  
    */

    // Set description
    setDescription(description) {
        this.argData.set('description', description);
    }

    // Add an argument <= Maybe have thing to manage --Value -V/v
    addArg(arg, arg_descript) {

        // Pass if argument exists
        if ( this.argData.get('arguments').has(arg) ) {
            console.log(`Error, ${arg} already present in object`);

        } else{

            // Otherwise create
            this.argData.get("arguments").set(arg, arg_descript);
        }
        
    }

    // Drop argument
    dropArgument(arg) {
        this.argData.get("arguments").delete(arg);
    }

    // Add action
    addAction(action, arg, arg_descript) {

        // Handle creating first
        if ( this.argData.get('actions').has(action) ) {
            
            // Add argument to action
            this.argData.get("actions").get(action).set(arg, arg_descript);

        } else{
            // Add the action map, then add arg + description to that key
            this.argData.get("actions").set(action, new Map() );
            this.argData.get("actions").get(action).set(arg, arg_descript);
        }
    }

    // Drop action
    dropAction(action) {
        this.argData.get("actions").delete(action);
    }

    // Drop argument from action
    dropArgAction(action, arg) {
        this.argData.get("actions").get(action).delete(arg);
    }


    /*
     * 
     * Getters
     * 
     */

    // Get description
    getDescription() {
        return this.argData.get("description");
    }

    // Get argument
    getArgument(arg) {
        return this.argData.get("arguments").get(arg);
    }

    // Get action
    getAction(action) {
        return this.argData.get("actions").get(action);
    }

    // Get arg in action
    getActionArg(action, arg) {
        return this.argData.get("actions").get(action).get(arg);
    }
}

// Export class
module.exports = Parser ;