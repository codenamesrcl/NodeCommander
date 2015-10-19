(function () {
    'use strict';

    angular.module('appConfig', []);

    angular.module('appConfig')
        .factory('appConfig.baseConfigFactory', baseConfigFactory)
        .factory('appConfig.serverConfig', serverConfig);

    function baseConfigFactory() {

        var service = {
            createWorker: function () { return new baseConfigServiceWorker() }
        }

        function baseConfigServiceWorker(){
            this.customMessage = null;
            this.config = {};
        }
        baseConfigServiceWorker.prototype.getValue = function (name) {
            //console.log(this);
            if (this.config.hasOwnProperty(name)) {
                return this.config[name];
            }
            console.error( (this.customMessage || "Could not find service config for ") + name);
            return null;
        }

        return service;
        
    }

    function ServerDef(path, main, port, explicitCommand){
        this.path = path;
        this.main = main;
        this.port = port;
        this.explicitCommand = null;

        if(explicitCommand){
            this.explicitCommand = explicitCommand;
        }
    }

    serverConfig.$inject = ['appConfig.baseConfigFactory'];
    function serverConfig(baseFactory) {

        var baseService = baseFactory.createWorker();

        //ServerDef(path, main, expectedport)
        baseService.config = {
            example: new ServerDef('base path', 'nodetarget', 'expectedport', 'customcommand'),
        }

        return baseService;
    }

})();