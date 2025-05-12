// Main entry point for the modular version of the game
(function(global) {
    // Initialize the global define and require functions
    var modules = {};
    var definitions = {};
    
    // Define a module
    global.define = function(id, factory) {
        definitions[id] = factory;
    };
    
    // Require a module
    global.require = function(id) {
        if (!/\.js$/.test(id))
            id += '.js';
        if (modules[id])
            return modules[id];
        
        if (!definitions[id]) {
            throw new Error("Module not found: " + id);
        }
        
        var exports = {};
        modules[id] = exports;
        
        definitions[id](exports);
        
        return exports;
    };
    
    // Start the game when all modules are loaded
    global.startModule = function(m) {
        require(m).start();
    };
})(this);
