(function () {
    'use strict';

    angular.module('app').factory('FolderService', Service);

    Service.$inject = ['$http', 'serviceBasePath', '$httpParamSerializerJQLike', '$localStorage', 'toastr'];
    function Service($http, base, serialize, $localStorage, toastr) {
        var config = { headers: { 'Content-Type': 'text/plain; charset=utf-8' } };
        var config_post = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;

        var service = {};
        service.get = get;
        service.add = add;
        service.remove = remove;
        service.update = update;

        return service;

        function get(callback) {
            $http.get(base + 'api/folders/get', {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function add(foldername, callback) {
            $http.post(base + 'api/folders/add?foldername=' + foldername, {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function update(folderid, foldername, callback) {
            $http.post(base + 'api/folders/update?' + serialize({folderid: folderid, foldername: foldername}), {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function remove(folderid, callback) {
            $http.post(base + 'api/folders/remove?folderid=' + folderid, {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }
    }
})();