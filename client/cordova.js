Meteor.startup(function() {
   navigator.geolocation.getCurrentPosition(success);
});



success = function(position) {
   Session.set('location', position);
   debugger
   //console.log(position.coords);

   Meteor.call('fetchNearbyLocations', position.coords.latitude,position.coords.longitude )
};
