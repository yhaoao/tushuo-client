angular.module('starter', [
  'ionic', 'starter.controllers', 
  'starter.services',
  'starter.filters',
  'LocalForageModule'])

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

    .state('login', {
      url: '/login',
      templateUrl: 'tushuo/auth/login.html',
      controller: 'LoginCtrl'
    })

    .state('registerFirst', {
      url: '/register-first',
      templateUrl: 'tushuo/auth/register-first.html',
      controller: 'RegisterCtrl'
    })

    .state('registerSecond', {
      url: '/register-second',
      templateUrl: 'tushuo/auth/register-second.html',
      controller: 'RegisterCtrl'
    })



    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "tushuo/tabs.html"
    })

    .state('tab.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'tushuo/main/tab-main.html',
          controller: 'MainCtrl'
        }
      }
    })

    .state('tab.pub', {
      url: '/pub',
      views: {
        'tab-pub': {
          templateUrl: 'tushuo/pub/tab-pub.html',
          controller: 'PubCtrl'
        }
      }
    })

    .state('tab.pubPicture', {
      url: '/picture',
      views: {
        'tab-pub': {
          templateUrl: 'tushuo/pub/tab-pub-picture.html',
          controller: 'PubCtrl'
        }
      }
    })

    .state('tab.msg', {
      url: '/msg',
      views: {
        'tab-msg': {
          templateUrl: 'tushuo/msg/tab-msg.html',
          controller: 'MsgCtrl'
        }
      }
    })

    .state('tab.me', {
      url: '/me',
      views: {
        'tab-me': {
          templateUrl: 'tushuo/me/tab-me.html',
          controller: 'MeCtrl'
        }
      }
    })

    .state('tab.editMe', {
      url: '/edit-me',
      views: {
        'tab-me': {
          templateUrl: 'tushuo/me/edit-me.html',
          controller: 'EditMeCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/tab/main');

});

