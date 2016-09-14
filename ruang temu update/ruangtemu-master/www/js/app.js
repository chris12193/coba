angular.module('starter', ['ionic', 'ionic-material', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
    
    // get onesignal id
    window.plugins.OneSignal.getIds(function(ids) {
      did = ids.userId;
      localStorage.setItem("did",JSON.stringify(ids['userId']));
      //alert(JSON.stringify(ids['userId']));
      //alert(did);
    });

    //action for push notif
    var notificationOpenedCallback = function(jsonData) {
      //alert("Notification received:\n" + JSON.stringify(jsonData));
      //alert("Additional Data received:\n" + JSON.stringify(jsonData.additionalData.postId));
      $state.go('app.post', {'dataId': jsonData.additionalData.postId});
    };

    // Update with your OneSignal AppId and googleProjectNumber before running.
    window.plugins.OneSignal.init("0010ee59-1672-4d84-acaf-2256df52939c",{googleProjectNumber: "613316884605"}, notificationOpenedCallback);
    window.plugins.OneSignal.enableInAppAlertNotification(true);
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):|data:image\//);
  // Enable Native Scrolling on Android
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);
  $stateProvider
  
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })
  
  // setup an abstract state for the side menu directive
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller: 'MainCtrl'
  })

  // Each tab has its own nav history stack:
  .state('app.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.homepage', {
    url: '/homepage',
    views: {
      'home': {
        templateUrl: 'templates/homepage.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.post', {
    url: '/post/:dataId',
    views: {
      'home': {
        templateUrl: 'templates/post.html',
        controller: 'PostDetailCtrl'
      }
    }
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'home': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('app.userProfile', {
    url: '/userProfile/:username',
    views: {
      'home': {
        templateUrl: 'templates/userProfile.html',
        controller: 'UserProfileCtrl'
      }
    }
  })
  .state('app.leaderboard', {
    url: '/leaderboard',
    views: {
      'home': {
        templateUrl: 'templates/leaderboard.html',
        controller: 'LeaderboardCtrl'
      }
    }
  })
   .state('app.message', {
    url: '/message',
    views: {
      'home': {
        templateUrl: 'templates/message.html',
        controller: 'MessageCtrl'
      }
    }
  })

  .state('app.message_detail', {
  url: '/message_detail/:username',
  views: {
    'home': {
      templateUrl: 'templates/message_detail.html',
      controller: 'MessageDetailCtrl'
    }
  }
  })
 .state('app.contacts', {
    url: '/contacts',
    views: {
      'home': {
        templateUrl: 'templates/contacts.html',
        controller: 'MessageCtrl'
      }
    }
  })
   .state('app.edit_profile', {
    url: '/edit_profile',
    views: {
      'home': {
        templateUrl: 'templates/edit_profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('app.create_post', {
    url: '/create_post',
    views: {
      'home': {
        templateUrl: 'templates/create_post.html',
        controller: 'Create_postCtrl'
      }
    }
  })
  .state('app.forgot_password', {
    url: '/forgot_password',
    views: {
      'home': {
        templateUrl: 'templates/forgot_password.html',
        controller: 'Forgot_passwordCtrl'
      }
    }
  })
  .state('app.change_password', {
    url: '/change_password',
    views: {
      'home': {
        templateUrl: 'templates/change_password.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
