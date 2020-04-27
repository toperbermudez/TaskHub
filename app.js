(function () {
    //init ag-grid plugin-----------------------
    agGrid.initialiseAgGridWithAngular1(angular);
    angular
        .module("app", ['ui.router', 'datatables', 'ngAnimate', 'ngMessages', 'ngStorage', 'toastr', 'cp.ngConfirm','ui.bootstrap', 'ui.sortable', 'agGrid'])
        .config(config)
        .run(run)
        .constant('serviceBasePath', 'http://localhost:32117/');

    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/");

        // app routes
        $stateProvider
            .state('container', {
                url: '/',
                views: {
                    '': {
                        templateUrl: 'app-views/container.view.html',
                        controller: 'ContainerController',
                    },
                    '@container': {
                        templateUrl: 'app-views/dashboard.view.html',
                        controller: 'DashboardController',
                    }
                }
            })
            .state('container.dashboard', {
                url: 'dashboard',
                templateUrl: 'app-views/dashboard.view.html',
                controller: 'DashboardController',
            })
            .state('container.folders', {
                url: 'folders',
                templateUrl: '/app-views/folders.view.html',
                controller: 'FolderController',
            })
            .state('container.teams', {
                url: 'teams',
                templateUrl: '/app-views/teams.view.html',
                controller: 'TeamController',
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app-views/login.view.html',
                controller: 'LoginController',
            });
    }

    run.$inject = ['$rootScope', '$http', '$location', '$localStorage']
    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$rootScope.loggedIn) {
                $location.path('/login');
            }
        });
    }

})();