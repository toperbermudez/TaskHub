(function () {
    'use strict';

    angular.module('app').factory('UserService', Service);

    Service.$inject = ['$http', 'serviceBasePath', '$httpParamSerializerJQLike', '$localStorage', 'toastr'];
    function Service($http, base, serialize, $localStorage, toastr) {
        var config = { headers: { 'Content-Type': 'text/plain; charset=utf-8' } };
        var config_post = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;

        var service = {};
        service.get = GetAll;
        service.add = Add;
        service.remove = Remove;

        return service;

        function GetAll(teamid, callback) {
            $http.get(base + 'api/users/get?teamid=' + teamid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function Add(teamid, empcode,callback) {
            $http.post(base + 'api/users/add?' +  serialize({teamid: teamid, empcode: empcode}), {}, config_post)
                .then(function (response) {
                    callback({ success: true});
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function Remove(teamid, empcode,callback) {
            $http.post(base + 'api/users/remove?' + serialize({teamid: teamid, empcode: empcode}), {}, config_post)
                .then(function (response) {
                    callback({ success: true});
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }
    }
})();