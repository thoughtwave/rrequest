/*
 * rrequest
 * http://www.rrequest.com/
 * (C) Copyright Bashton Ltd, 2013
 * 
 * This file is part of rrequest.
 * 
 * rrequest is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * rrequest is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with rrequest.  If not, see <http://www.gnu.org/licenses/>.
 * 
*/
Meteor.subscribe('currentUser');
Meteor.subscribe('allUsers');
Meteor.subscribe('groups');
Meteor.autorun(function() {
	Meteor.subscribe('singleTicket', Session.get('viewticketId'));
});

//ticketsOldest = Meteor.subscribeWithPagination('sortedTickets', {created: 1}, 10);
//ticketsNewest = Meteor.subscribeWithPagination('sortedTickets', {created: -1}, 10);
//ticketsOldestChange = Meteor.subscribeWithPagination('sortedTickets', {modified: 1}, 10);
//ticketsNewestChange = Meteor.subscribeWithPagination('sortedTickets', {modified: -1}, 10);

Meteor.subscribe('ticketstatus', function() {
  var tstatus = TicketStatus.find({});
  tstatus.forEach(function(status) {
    var name = status.name;
	Meteor.subscribe("counts-by-ticketstate", name, function() {
	  Session.set(name + 'ticketcountready', name);
	});
  });
});

Meteor.subscribe('modules', function() {
  EventHorizon.fire('modulescollectionready');
});
Meteor.subscribe('hooks');
