Meteor.publish("parties", function () {
  return Parties.find({
    $or:[
      {$and:[
        {"public": true},
        {"public": {$exists: true}}
      ]},
      {$and:[
        {owner: this.userId},
        {owner: {$exists: true}}
      ]}
    ]});
});

Meteor.publish("sites", function () {
  HTTP.get('https://itunes.apple.com/search?media=podcast&term=nerdcast&limit=10', function(error, sitesResponse) {
    var sites = [];
    var entries = sitesResponse.results.entry;
    var sort = 0;
    _.each(entries, function(entry) {
        var site = {};
        site.feedUrl = entry.feedUrl;
        site.artistName = entry.artistName;
        site.collectionName = entry.collectionName;
        site.sort = sort;

        // Add song to list
        sites.push(site);
        // Increase sort
        sort++;
    }, this);
  });
});
