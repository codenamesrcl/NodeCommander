(function(){
	'use strict'

	angular
		.module('manager')
		.controller('angularTab', controller);

	controller.$inject = ['lodash', 'appConfig.serverConfig'];

	function controller(_, serverConfig){
		var vm = this;
		
		vm.childProcessList = [];

		function ChildProcessDef(config){
			if(!config.path){
				throw 'path required';
			}
			if(!config.mainTarget){
				throw 'main target required';
			}

			this.name = config.name || '';
			this.path = config.path || '';
			this.mainTarget = config.mainTarget || '';
			this.expectedPort = config.expectedPort || '';
			this.commandConfig = config.commandConfig || {};
			
			this.explicitCommand = config.explicitCommand || null;

			this.displayName = this.name;
			if(config.expectedPort){
				this.displayName += ': ' + config.expectedPort;
			}
		}
		ChildProcessDef.prototype.makeFunc = function(){
			//construct the function to run based on the instance values
			console.log(this.explicitCommand);
			if(!this.explicitCommand){
				var command = "node " + this.mainTarget;

				return command;
			}

			return this.explicitCommand;
		};

		function init(){
			var configkeys = _.keys(serverConfig.config);

			//based on the keys, generate the list of elements
			vm.childProcessList = _.map(configkeys, function(key){
				var setconfig = serverConfig.config[key];

				//ChildProcessDef({config})
				var item = new ChildProcessDef({
					name: key,
					path: setconfig.path,
					mainTarget: setconfig.main,
					expectedPort: setconfig.port,
					explicitCommand: setconfig.explicitCommand,
					commandConfig: {
						cwd: setconfig.path
					}
				});

				return item;
			});
			

			console.log(vm.childProcessList);
		}
		init();

	}

}());