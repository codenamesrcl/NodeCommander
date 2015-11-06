(function () {
    'use strict';

    /**
     *
     * @ngdoc factory
     * @module  __modulename__
     * @name  __factoryname___
     * 
     * @requires  $q
     * 
     * @description
     * A generic angular factory
     */
    angular
        .module('nodetools')
        .factory('nedb', nedb);

    nedb.$inject = ['$q'];

    function nedb($q) {
        var service = {
        	db:{
        		get: dbGet
        	}
        };

        var base = require('nedb');

        function dbGet(name, config){

        	/**
        	 * config variables
        	 * 	- path - path to db file
        	 * 	- inMemory - should the db be in memory only (no persistence)
        	 */

        	//if the inmemory flag is set or filename is undefined
        	if(config.inMemory || !config.path){
        		//return an in-memory only db, effectively a session cache
        		return new DataStore({
        			inMemoryOnly:true,
        		});
        	}

        	var load_config = {
        		filename: config.path,
        		autoload: true
        	};

        	var db = new DataStore(load_config);

        	return db;
        }

        return service;

    }
})();