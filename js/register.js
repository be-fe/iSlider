var register = (function(root){

	if(typeof factory != 'function') return;

	if(typeof define === 'function' && define.amd) {

	    // [1] AMD anonymous module
		return function(name, dependencies, factory){
	        define(dependencies.unshift('exports'), function() {
        		var args = Array.prototype.slice.call(arguments);
        		args[0] = factory.apply(root, args);
	        });
		};

    } else if(typeof define === 'function' && seajs){
	    
	    // [2] seajs    	
		return function(name, dependencies, factory){
	        define(function(require, exports, module) {
	        	seajs.use(dependencies, function(){
	        		var args = Array.prototype.slice.call(arguments);
	        		module.exports = factory.call(root, args.unshift(exports));	
	        	});
	        });
	    };

    } else if(typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    	return function(name, dependencies, factory){
	    	var args = [];
	    	for(var i = 0; i < dependencies.length; i++){
	    		args[args.length] = require(dependencies[i]);
	    	}
	        
	        factory.apply(root, args);	
    	};
    } else {

        // [4] as a global var
    	return function(name, dependencies, factory){
        	root[name] = factory.apply(this, dependencies);
    	};

    }
})(window);

register('Flow', ['./a','./b'], function(a, b){

})();