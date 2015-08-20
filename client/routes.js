angular.module("podicastie").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
         .state('parties', {
          url: '/subscriptions',
          templateUrl: 'client/subscriptions/views/subscriptions-list.ng.html',
          controller: 'SubsListCtrl',
          resolve: {
            'subscribe': [
              '$meteor', function($meteor) {
                return $meteor.subscribe('parties');
              }
            ]
          }
       })
       .state('search', {
         url: '/subscriptions/search',
          templateUrl: 'client/subscriptions/views/subscriptions-search.ng.html',
          controller: 'SubsSearchCtrl',
          resolve: {
            'subscribe': [
              '$meteor', function($meteor) {
                return $meteor.subscribe('parties');
              }
            ]
          }
       })
        .state('partyDetails', {
          url: '/subscriptions/:partyId',
          templateUrl: 'client/subscriptions/views/subscriptions-details.ng.html',
          controller: 'PartyDetailsCtrl',
          resolve: {
            "currentUser": ["$meteor", function($meteor){
              return $meteor.requireUser();
            }]
          }
        });

      $urlRouterProvider.otherwise("/subscriptions");
    }]);

angular.module("podicastie").run(["$rootScope", "$state", function($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('parties');
    }
  });
}]);
