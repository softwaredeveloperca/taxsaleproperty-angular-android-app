angular.module('starter.controllers', ['ionic', 'ionic.utils'])

.controller('DashCtrl', function($scope, Listings, $localstorage) {
	var properties = $localstorage.getObject('properties');
	
	Listings.myProperties(properties).then(function(listings) {	
		$scope.properties = listings;
	});
	
	 $scope.save = function(TaxSalePropertyID, idx) {
		
		var saved=Listings.save(TaxSalePropertyID);
		$scope.properties.splice(idx, 1);	
	
 	 }; 	
})

.controller('MapCtrl', ['$scope', function($scope) {
$scope.map = {
center: {
latitude: 30,
longitude: -75
},
zoom: 8,
pan: true
};
$scope.marker = {
coords: {
latitude: 31,
longitude: -74
}
}
}])
/*
.controller('MapCtrl', function($scope) {
      function initialize() {
        var site = new google.maps.LatLng(55.9879314,-4.3042387);
        
      
        var mapOptions = {
          streetViewControl:true,
          center: site,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };

	
	var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
	$scope.map = map;

})
*/


.controller('MyPropertyItemCtrl', function($scope, $stateParams, Listings) {
		
		Listings.myProperty($stateParams.adata).then(function(propertyinfo) {
		console.log(propertyinfo);
		$scope.propertyinfo = propertyinfo;
		
		        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;

	}); 	
})

  

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('EbookCtrl', function($scope) {
})

.controller('ResearchCtrl', function($scope, ResearchTypes) {
	$scope.researchtypes = ResearchTypes.all();
})

.controller('WebsiteCtrl', function($scope, $window) {
	$window.open('//www.taxsaleproperty.org');
})


.controller('ListingsDetailCtrl', function($scope, $stateParams, Listings, $localstorage) {

	Listings.get($stateParams.adata).then(function(listings) {
		
		 var properties = $localstorage.getObject('properties');
		console.log(properties);
		 angular.forEach(listings, function(item) {
		 	angular.forEach(item.Properties, function(property) {
		 
				var selected=0;
				if(properties.length > 0){
				if(properties.indexOf(property.TaxSalePropertyID) > -1)
				{
					selected=1;
				}
				}
				property.selected=selected;
			});
  		});
		$scope.cities = listings;
		$scope.title = $stateParams.adata;

	});
	
	$scope.save = function(TaxSalePropertyID) {
		
		var saved=Listings.save(TaxSalePropertyID);
		
		var properties = $localstorage.getObject('properties');
		
		 angular.forEach($scope.cities, function(item) {
		 	angular.forEach(item.Properties, function(property) {
				if(property.TaxSalePropertyID==TaxSalePropertyID)
				{
					property.selected=saved;
				}
			});
  		});
	
 	 };
})
	

.controller('ListingsCtrl', function($scope, Listings) {
	
	Listings.all().then(function(listings){
		//users is an array of user objects
		$scope.listings = listings;
	});

 // $scope.listings = Listings.all();
});

