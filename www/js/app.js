// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.filter('formatTitle', function(){
      return function(text) {
           return text.replace(/SALE OF LAND BY PUBLIC TENDER<br \/>/g, '').replace(/THE CORPORATION OF /g, '').replace(/<br \/>/g, '').replace(/<br>/g, '');
	  }
 })

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
	
	

    // Each tab has its own nav history stack:

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
	
	.state('tab.property', {
      url: '/myproperty/:adata',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-property.html',
          controller: 'MyPropertyItemCtrl'
        }
      }
    })
	
	.state('tab.listings', {
      url: '/listings',
      views: {
        'tab-listings': {
          templateUrl: 'templates/tab-listings.html',
          controller: 'ListingsCtrl'
        }
      }
    })
	
	.state('tab.list-detail', {
      url: '/listing/:adata',
      views: {
        'tab-listings': {
          templateUrl: 'templates/list-detail.html',
          controller: 'ListingsDetailCtrl'
        }
      }
    })
	

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
	
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })
	
	.state('tab.research', {
      url: '/research',
      views: {
        'tab-research': {
          templateUrl: 'templates/tab-research.html',
          controller: 'ResearchCtrl'
        }
      }
    })
	
	.state('tab.ebook', {
      url: '/ebook',
      views: {
        'tab-ebook': {
          controller: 'EbookCtrl'
        }
      }
    })
	
	.state('tab.website', {
      url: '/website',
      views: {
        'tab-website': {
          controller: 'WebsiteCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });
	

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/listings');

});

