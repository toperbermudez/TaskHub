(function () {
    'use strict';

    angular.module('app').controller('TeamController', Controller);

    Controller.$inject = ['MasterDataService','TeamService', 'UserService', '$scope', '$filter', '$ngConfirm', 'toastr','$localStorage'];
    function Controller(mds, ts, us, $scope, $filter, confirm, toastr,storage) {
        //variables

        //scope variables
        $scope.teams = [];
        $scope.users = [];
        $scope.teamname = '';
        $scope.teamid = 0;
        $scope.employees = [];
        $scope.employee = {};

        //scope functions
        $scope.get = get;
        $scope.add = add;
        $scope.update = update;
        $scope.remove = remove;
        $scope.getUsers = getUsers;
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.showNewModal = showNewModal;
        $scope.showEditModal = showEditModal;
        $scope.showUsersModal = showUsersModal;
        $scope.resetEmployee = resetEmployee;
        
        //functions
        init();
        function init() {
            get(); 
            getEmployees();
        }

        function resetEmployee($item, $model, $label) {
            addUser($scope.teamid,$model);
            $scope.searchUser = '';
        }

        function showNewModal() {
            $scope.teamname = '';
            angular.element("#modal-new").modal('show');
        }

        function showEditModal(teamid) {
            $scope.teamid = teamid;
            $scope.teamname = $scope.teams.find(x => x.TeamId == teamid).TeamName;
            angular.element("#modal-edit").modal('show');
        }

        function showUsersModal(teamid) {
            $scope.filterUsers = '';
            angular.element("#modal-users").modal('show');
            getUsers(teamid);
        }

        function getEmployees() {
            mds.employees(function(response) {
                $scope.employees = response.data;
            });
        }

        function get() {
            ts.get(function(response) {
                if(response.success) {
                    $scope.teams = response.data;
                }
            });
        }

        function add(teamname) {
            ts.add(teamname, function(response) {
                if(response.success) {
                    ts.get(function(response) {
                        if(response.success) {
                            $scope.teams = response.data;
                            toastr.success('New team added succcessfully.');
                            angular.element("#modal-new").modal('hide');
                            showUsersModal($scope.teams[$scope.teams.length-1].TeamId);
                        }
                    });
                }
            });
        }

        function update(teamid, teamname) {
            ts.update(teamid, teamname, function(response) {
                if(response.success) {
                    angular.element("#modal-edit").modal('hide');
                    get();
                }
            });
        }

        function remove(teamid) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove this team?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            ts.remove(teamid, function(response) {
                                if(response.success) {
                                    get();
                                    toastr.success('Team removed successfully.');
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });            
        }

        function getUsers(teamid) {
            $scope.teamid = teamid;
            $scope.teamname = $scope.teams.find(x => x.TeamId == teamid).TeamName;
            us.get(teamid, function(response) {
                if(response.success) $scope.users = response.data;
            })
        }

        function addUser(teamid, empcode) {
            us.add(teamid, empcode, function(response) {
                if(response.success) {
                    getUsers(teamid);
                    get();
                }
            })
        }
        
        function removeUser(teamid, empcode) {
            us.remove(teamid, empcode, function(response) {
                if(response.success) {
                    getUsers(teamid);
                    get();  
                }
            })
        }
    }
})();