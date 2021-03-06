Places = new Mongo.Collection('places');

Meteor.methods({
  'fetchNearbyLocations': function(latitude, longitude) {
    if (Meteor.isServer) {
      //console.log(latitude);
      //console.log(longitude);
      results = HTTP.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&types=food&key=AIzaSyCtfoCAldCEf8hXUlkVUd4UljqKR6W_aF4")
      //console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=500&types=food&key=AIzaSyCtfoCAldCEf8hXUlkVUd4UljqKR6W_aF4")

      _(results.data.results).each(function(loc) {
        _.extend(loc, {loc: {type: "Point", coordinates: [loc.geometry.location.lng, loc.geometry.location.lat]}})

      //  console.log(loc);
        Places.upsert({id: loc.id}, {$set: loc})
      });

    }
  }
});
