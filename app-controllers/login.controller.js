(function () {
    'use strict';

    angular.module('app').controller('LoginController', Controller);

    Controller.$inject = ['AuthenticationService', 'toastr', '$scope', '$timeout', '$location'];
    function Controller(as, toastr, $scope, $timeout, $location) {

        //scope variables
        $scope.username = '';
        $scope.password = '';

        //scope functions
        $scope.login = login;

        init();

        function init() {
            // reset login status
            as.Logout();
        };

        function login() {
            $scope.loading = true;
            as.Login($scope.username, $scope.password, function (result) {
                if (result.success == true) {
                    // $location.path('/');
                    $timeout(function () {
                        $location.path('/');
                    }, 300);
                } else {
                    $scope.loading = false;
                    $scope.error = 'Username or password is incorrect';
                }
            });
        };
    }

})();