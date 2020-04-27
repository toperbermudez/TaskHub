(function () {
    'use strict';

    angular.module('app').factory('TaskService', Service);

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
            $http.get(base + 'api/tasks/get?listid=' + listid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function add(model, callback) {
            $http.post(base + 'api/tasks/add', serialize(model), config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function update(model, callback) {
            $http.post(base + 'api/tasks/update', serialize(model), config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function remove(taskid, callback) {
            $http.post(base + 'api/tasks/remove?taskid=' + taskid, {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function sort(taskids, callback) {
            $http.post(base + 'api/tasks/sort', serialize(taskids), config_post)
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