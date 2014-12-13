angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

angular.module('starter.services', ['ionic', 'ionic.utils'])


.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})

.factory('ResearchTypes', function() {
	var researchtypes = [
	{ id: 'Counties', name: "Listing by Counties", type: "calm" }, 
	{ id: 'Districts', name: "Listing by Districts", type: "balanced" }, 
	{ id: "Regions", name: "Listing by Regions", type: "energized" }, 
	{ id: "Tier", name: "Listing by Single Tier", type: "assertive" }
	];
	
	return {
		all: function() {
			return researchtypes;
		}
	}
})

.factory('Listings', function($http, $localstorage) {
	var listings = [];

  return {
    all: function() {
		return $http.get('http://www.informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=Dates=1').then(function(resp) {
			console.log(resp.data.Data);
			listings=resp.data.Data;
			return listings;
		});
   
    },
    get: function(listingDate) {
	
      	return $http.get('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=Properties=1&data[]=ADate=' + listingDate).then(function(resp) {
   // console.log('Success', resp);
   		console.log('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=Properties=1&data[]=ADate=' + listingDate);
			console.log(resp.data.Data);		
			items=resp.data.Data;
		
			return items;
		}); 
		
    },
	myProperty: function(propertyid) {
		console.log('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=MyProperty=1&data[]=TaxSalePropertyID=' + propertyid);
		return $http.get('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=MyProperty=1&data[]=TaxSalePropertyID=' + propertyid).then(function(resp) { 		
		console.log(resp);
		console.log(resp.data.Data);
				
			items=resp.data.Data;
		
			return items;
		});
		
	},
	myProperties: function(properties) {
		console.log('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=MyProperties=1&data[]=Properties=' + properties.join('+'));
		return $http.get('http://informational.ca/api/index.php?secret=check&action=site&data[]=SiteAction=GetTaxSales&data[]=MyProperties=1&data[]=Properties=' + properties.join('+')).then(function(resp) { 		
		console.log(resp);
		console.log(resp.data.Data);
				
			items=resp.data.Data;
		
			return items;
		});
	},
	save: function(propertyID) {
	
		var myproperties = [];
		myproperties.push(propertyID);
		post = $localstorage.getObject('properties');
		
		// Check if property exists: if yes remove it or no add it.
		
		var add=1;
		if(post.length > 0){
		if(post.indexOf(propertyID) > -1)
		{
				for(var i = post.length; i--;) {
          			if(post[i] == propertyID) {
              			post.splice(i, 1);
          			}
      			}
				myproperties = post;
				add=0;
		}	
    else  
		{
			myproperties = myproperties.concat(post);
		}
		}
		
		
		// Remove duplicates
		var temp = [];
		for (var i = 0; i < myproperties.length; i++)
  			temp[myproperties[i]] = true;
  		var r = [];
  		for (var k in temp)
  			r.push(k);
		myproperties = r;
		
		$localstorage.setObject('properties', myproperties);
		return add;
	
	},
  }
});
