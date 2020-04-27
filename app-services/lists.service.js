(function () {
    'use strict';

    angular.module('app').factory('ListService', Service);

    Service.$inject = ['$http', 'serviceBasePath', '$httpParamSerializerJQLike', '$localStorage', 'toastr'];
    function Service($http, base, serialize, $localStorage, toastr) {
        var config = { headers: { 'Content-Type': 'text/plain; charset=utf-8' } };
        var config_post = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.token;

        var service = {};
        service.get = get;
        service.users = users;
        service.statuses = statuses;
        service.add = add;
        service.remove = remove;
        service.update = update;
        service.addUser = addUser;
        service.removeUser = removeUser;
        service.addStatus = addStatus;
        service.updateStatus = updateStatus;
        service.removeStatus = removeStatus;

        return service;
        // get-------------------------------------------------------------
        function get(folderid, callback) {
            $http.get(base + 'api/lists/get?folderid=' + folderid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function users(listid, callback) {
            $http.get(base + 'api/lists/users?listid=' + listid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function statuses(listid, callback) {
            $http.get(base + 'api/lists/statuses?listid=' + listid, {}, config)
                .then(function (response) {
                    callback({ success: true, data: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        //insert----------------------------------------------------------
        function add(folderid, listname, type, callback) {
            $http.post(base + 'api/lists/add?' + serialize({folderid: folderid, listname: listname, type: type}), {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function addUser(listid, userid, typ, callback) {
            $http.post(base + 'api/lists/users/add?' + serialize({listid: listid, userid: userid, typ: typ}), {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function addStatus(listid, statname, typ, callback) {
            $http.post(base + 'api/lists/statuses/add?' + serialize({listid: listid, statname: statname, typ: typ}), {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        //delete-------------------------------------------------
        function remove(listid, callback) {
            $http.post(base + 'api/lists/remove?listid=' + listid, {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function removeUser(listid, userid, typ, callback) {
            $http.post(base + 'api/lists/users/remove?' + serialize({listid: listid, userid: userid, typ: typ}), {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function removeStatus(listid, statid, callback) {
            $http.post(base + 'api/lists/statuses/remove?' + serialize({listid: listid, statid: statid}), {}, config_post)
                .then(function (response) {
                    callback({ success: true });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        //update-----------------------------------------
        function update(listid, listname, callback) {
            $http.post(base + 'api/lists/update?' + serialize({listid: listid, listname: listname}), {}, config_post)
                .then(function (response) {
                    callback({ success: true, id: response.data });
                },
                function (response) {
                    toastr.error(response.data);
                    callback({ success: false });
                })
        }

        function updateStatus(listid, statid, statname, callback) {
            $http.post(base + 'api/lists/statuses/update?' + serialize({listid:listid, statid: statid, statname: statname}), {}, config_post)
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