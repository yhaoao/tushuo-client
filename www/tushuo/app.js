angular.module('starter', [
    'ionic', 'starter.controllers',
    'starter.services',
    'starter.filters',
    'LocalForageModule'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
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
                templateUrl: 'tushuo/main/main.html',
                controller: 'MainCtrl'
            }
        }
    })

    .state('tab.postDetail', {
        url: '/post-detail/:id',
        views: {
            'tab-main': {
                templateUrl: 'tushuo/main/post-detail.html',
                controller: 'PostDetailCtrl'
            }
        }
    })

    .state('tab.userInfo', {
        url: '/user/:id',
        views: {
            'tab-main': {
                templateUrl: 'tushuo/main/user-info.html',
                controller: 'UserInfoCtrl'
            }
        }
    })

    .state('tab.pub', {
        url: '/pub',
        views: {
            'tab-pub': {
                templateUrl: 'tushuo/pub/pub.html',
                controller: 'PubCtrl'
            }
        }
    })


    .state('tab.msg', {
        url: '/msg',
        views: {
            'tab-msg': {
                templateUrl: 'tushuo/msg/msg.html',
                controller: 'MsgCtrl'
            }
        }
    })

    .state('tab.userInfoMsg', {
        url: '/msg',
        views: {
            'tab-msg': {
                templateUrl: 'tushuo/main/user-info.html',
                controller: 'UserInfoCtrl'
            }
        }
    })

    .state('tab.me', {
        url: '/me',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/me.html',
                controller: 'MeCtrl'
            }
        }
    })

    .state('tab.myPost', {
        url: '/my-post',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/my-post.html',
                controller: 'MyPostCtrl'
            }
        }
    })

    .state('tab.commentPost', {
        url: '/comment-post',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/comment-post.html',
                controller: 'CommentPostCtrl'
            }
        }
    })

    .state('tab.historyPostDetail',{
        url: '/history-post-detail/:id',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/post-detail.html',
                controller: 'HistoryPostDetailCtrl'
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
    })

    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/settings.html',
                controller: 'EditMeCtrl'
            }
        }
    })

    .state('tab.feedback', {
        url: '/feedback',
        views: {
            'tab-me': {
                templateUrl: 'tushuo/me/feedback.html',
                controller: 'FeedbackCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/tab/main');

});