angular.module('podicastie',['angular-meteor', 'ui.router']);

function onReady() {
  angular.bootstrap(document, ['podicastie']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);