(function () {
    'use strict';

    angular.module('app').controller('ContainerController', Controller);


    Controller.$inject = ['$scope','$localStorage', 'serviceBasePath'];
    function Controller($scope,$localStorage, serviceBasePath) {
        //scope variables
        $scope.empname = "USER";
        $scope.active_module = 'dashboard';
        $scope.set_active = set_active;

        init();
        function init() {
            if ($localStorage.currentUser != null) $scope.empname = $localStorage.currentUser.EmpName;
        };

        function set_active(module) {
            $scope.active_module = module;
        }
    }

})();