angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "app/tabs.html"
    })

    .state('tab.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'app/main/tab-main.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('tab.pub', {
      url: '/pub',
      views: {
        'tab-pub': {
          templateUrl: 'app/pub/tab-pub.html',
          controller: 'PubCtrl'
        }
      }
    })

    .state('tab.pubPicture', {
      url: '/picture',
      views: {
        'tab-pub': {
          templateUrl: 'app/pub/tab-pub-picture.html',
          controller: 'PubCtrl'
        }
      }
    })

    .state('tab.msg', {
      url: '/msg',
      views: {
        'tab-msg': {
          templateUrl: 'app/msg/tab-msg.html',
          controller: 'MsgCtrl'
        }
      }
    })

    .state('tab.me', {
      url: '/me',
      views: {
        'tab-me': {
          templateUrl: 'app/me/tab-me.html',
          controller: 'MeCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/main');

});

