(function () {
    'use strict';

    angular.module('app').factory('BlueprintService', Service);

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
        service.sort = sort;

        return service;

        function get(listid, callback) {
            $http.get(base + 'api/blueprints/get?listid=' + listid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function add(model, callback) {
            $http.post(base + 'api/blueprints/add', serialize(model), config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function update(model, callback) {
            $http.post(base + 'api/blueprints/update', serialize(model), config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function remove(taskid, callback) {
            $http.post(base + 'api/blueprints/remove?taskid=' + taskid, {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function sort(bpids, callback) {
            $http.post(base + 'api/blueprints/sort', serialize(bpids), config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }
    }
})();