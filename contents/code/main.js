/********************************************************************
Copyright (C) 2013 Fabian Homborg <FHomborg@gmail.com>

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*********************************************************************/

function MiniStack() {
	  this.stack = [];
	  try {
		    var self = this;
		    workspace.clientRemoved.connect(function (client) {
			      self.removeClient(client);
		    });
		    workspace.clientMinimized.connect(function (client) {
			      self.addClient(client);
		    });
		    workspace.clientUnminimized.connect(function (client) {
			      self.removeClient(client);
		    });
		    registerShortcut("MINSTACK: Unminimize last minimized Client",
						             "MINSTACK: Unminimize last minimized Client",
						             "Meta+,",
						             function () {
							               self.pop();
						             });
		    registerShortcut("MINSTACK: Unminimize all minimized clients",
						             "MINSTACK: Unminimize all minimized clients",
						             "Meta+.",
						             function () {
							               for(i = 0; i < self.stack.length; i++) {
								                 self.pop();
							               }
						             });
        registerShortcut("MINSTACK: Minimize all clients but selected",
                         "MINSTACK: Minimize all clients but selected",
                         "Meta+W",
                         function() {
                             // NOTE: This function was adapted from https://github.com/karakum/kwin-script-onlyOneActiveWindow/
                             //  Copyright (C) 2015 Andrey Shertsinger <andrey@shertsinger.ru>
                             //  Also distributed under the GNU GPL v2

                             var client = workspace.activeClient;
                             if (!client) return;

	                           if (client.skipTaskbar || client.modal || client.transient){
			                           return;
	                           }
	                           var clients = workspace.clientList();
	                           var transients = [];
	                           for(var i = 0; i < clients.length; i++) {
		                             if(clients[i].transient){
			                               transients[clients[i].transientFor]=1;
		                             }
	                           }
	                           if(client.transient){
		                             transients[client.transientFor]=1;
	                           }
	                           var actives=[];
	                           var ai=0;
	                           for(var i = 0; i < clients.length; i++) {
		                             if(clients[i].minimizable && transients[clients[i]] != 1 &&
				                            clients[i] != client &&
                                    clients[i].screen == client.screen &&
				                            clients[i].desktop == client.desktop &&
				                            !( clients[i].skipTaskbar || clients[i].skipSwitcher || clients[i].skipPager || clients[i].transient || clients[i].modal )){
			                               actives[ai]=clients[i];
			                               ai++;
		                             }
	                           }
	                           for(var i = 0; i < ai; i++) {
		                             actives[i].minimized = true;
	                           }
	                           if(ai==1){
		                             lastActive=actives[0];
	                           }
                         });
	  } catch(err) {
		    print(err, "in ministack");
	  }
}

MiniStack.prototype.addClient = function(client) {
	  this.stack.push(client);
};

MiniStack.prototype.removeClient = function(client) {
	  for (i = 0; i < this.stack.length; i++) {
		    if (this.stack[i] == client) {
			      this.stack.splice(i,1);
		    }
	  }
};

MiniStack.prototype.pop = function() {
	  if (this.stack.length > 0) {
		    var client = this.stack[this.stack.length - 1];
		    client.minimized = false;
		    client.desktop = workspace.currentDesktop;
	  } else {
	  }
};

m = new MiniStack();
