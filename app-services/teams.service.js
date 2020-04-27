(function () {
    'use strict';

    angular.module('app').factory('TeamService', Service);

    Service.$inject = ['$http', 'serviceBasePath', '$httpParamSerializerJQLike', '$localStorage', 'toastr'];
    function Service($http, base, serialize, $localStorage, toastr) {
        var config = { headers: { 'Content-Type': 'text/plain; charset=utf-8' } };
        var config_post = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;

        var service = {};
        service.get = Get;
        service.add = Add;
        service.update = Update;
        service.remove = Remove;

        return service;

        function Get(callback) {
            $http.get(base + 'api/teams/get', {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function Add(teamname,callback) {
            $http.post(base + 'api/teams/add?teamname=' + teamname, {}, config_post)
                .then(function (response) {
                    callback({ success: true});
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function Update(teamid, teamname,callback) {
            $http.post(base + 'api/teams/update?' + serialize({teamid: teamid, teamname: teamname}), {}, config_post)
                .then(function (response) {
                    callback({ success: true});
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function Remove(teamid,callback) {
            $http.post(base + 'api/teams/remove?teamid=' + teamid, {}, config_post)
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