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
		registerShortcut("Unminimize last minimized Client",
						 "Unminimize last minimized Client",
						 "Meta+,",
						function () {
							self.pop();
						});
		registerShortcut("Unminimize all minimized clients",
						 "Unminimize all minimized clients",
						 "Meta+.",
						 function () {
							 for(i = 0; i < self.stack.length; i++) {
								 self.pop();
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
