define("scripts/module-system.js", function(exports){
	/**
	 * Module System
	 * This module provides a simple AMD-like module system for the application
	 */
	
	var modules = {};
	var definitions = {};
	
	/**
	 * Define a module
	 * @param {String} id - The module ID
	 * @param {Function} factory - The factory function that returns the module exports
	 */
	function define(id, factory) {
		definitions[id] = factory;
	}
	
	/**
	 * Require a module
	 * @param {String} id - The module ID
	 * @returns {Object} The module exports
	 */
	function require(id) {
		if (modules[id]) {
			return modules[id];
		}
		
		if (!definitions[id]) {
			throw new Error("Module not found: " + id);
		}
		
		var exports = {};
		modules[id] = exports;
		
		definitions[id](exports);
		
		return exports;
	}
	
	// Export the module system functions
	exports.define = define;
	exports.require = require;
	
	return exports;
});
