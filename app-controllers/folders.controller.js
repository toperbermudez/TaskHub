(function () {
    'use strict';

    angular.module('app').controller('FolderController', Controller);

    Controller.$inject = ['FolderService', 'ListService', 'MasterDataService', '$scope', '$filter', '$ngConfirm', 'toastr','$localStorage'];
    function Controller(fs, ls, mds, $scope, $filter, confirm, toastr, storage) {
        //variables

        //scope variables
        $scope.folders = [];
        $scope.folder = {};
        $scope.empname = storage.currentUser.EmpName;
        $scope.listmode = false;
        $scope.lists = [];
        $scope.list = {};
        $scope.listUsersMode = false;
        $scope.listEditMode = false;
        $scope.usersmenu = [];
        $scope.searchUser = '';
        $scope.users = [];
        $scope.statuses = [];
        $scope.status = {};

        //scope functions
        $scope.get = get;
        $scope.add = add;
        $scope.update = update;
        $scope.remove = remove;
        $scope.getLists = getLists;
        $scope.addList = addList;
        $scope.usersList = usersList;
        $scope.updateList = updateList;
        $scope.removeList = removeList;
        $scope.addUser = addUser;
        $scope.removeUser = removeUser;
        $scope.newFolderModal = newFolderModal;
        $scope.editFolderModal = editFolderModal;
        $scope.newListModal = newListModal;
        $scope.editListModal = editListModal;
        $scope.statusModal = statusModal;
        $scope.getStatuses = getStatuses;
        $scope.addStatus = addStatus;
        $scope.updateStatus = updateStatus;
        $scope.removeStatus = removeStatus;
        
        //functions
        init();
        function init() {
            get(); 
            getUsersMenu();
        }

        function get() {
            $scope.listUsersMode = false;
            $scope.listEditMode = false;

            fs.get(function(response) {
                if(response.success) {
                    $scope.folders = response.data;
                }
            })
        }

        function add(foldername) {
            fs.add(foldername, function(response) {
                if(response.success) {
                    get();
                    toastr.success('New folder added successfully.');
                    angular.element('#modal-new-folder').modal('hide');
                }
            });
        }

        function update(folderid, foldername) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Update folder name?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-blue',
                        action: function() {
                            fs.update(folderid, foldername, function(response) {
                                if(response.success) {
                                    get();
                                    toastr.success('Folder name updated successfully.');
                                    angular.element('#modal-edit-folder').modal('hide');
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function remove(folderid) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove folder?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            fs.remove(folderid, function(response) {
                                if(response.success) {
                                    get();
                                    toastr.success('Folder removed successfully.');
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        //////////////////////LIST FUNCTIONS///////////////////////////////

        function getLists(folderid) {
            ls.get(folderid, function(response) {
                if(response.success) {
                    $scope.listUsersMode=false; 
                    $scope.listEditMode=false;
                    $scope.lists = response.data;
                    $scope.folder.FolderId = folderid;
                    $scope.folder.FolderName = $scope.folders.find(x => x.FolderId == folderid).FolderName;
                    $scope.listmode = true;
                }
            })
        }

        function usersList(listid) {
            ls.users(listid, function(response) {
                $scope.users = response.data;

                $scope.list.ListId = listid;
                $scope.list.ListName = $scope.lists.find(x => x.ListId == listid).ListName;
                $scope.listUsersMode = true;
                $scope.listEditMode = false;
            });
        }

        function addList(folderid, listname, type) {
            ls.add(folderid, listname, type, function(response) {
                if(response.success) {
                    get();
                    angular.element('#modal-new-list').modal('hide');
                    getLists($scope.folder.FolderId);
                    toastr.success('New list added successfully.');
                }
            })
        }

        function removeList(listid) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove list?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            ls.remove(listid, function(response) {
                                if(response.success) {
                                    get();
                                    getLists($scope.folder.FolderId);
                                    toastr.success('List removed successfully.');
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function updateList(listid, listname) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Update list name?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-blue',
                        action: function() {
                            ls.update(listid, listname, function(response) {
                                if(response.success) {
                                    var index = $scope.lists.map(function(e) {return e.ListId;}).indexOf(listid);
                                    $scope.lists[index].ListName = listname;
                                    $scope.list.ListName = listname;
                                    toastr.success('List name updated successfully.');
                                    angular.element('#modal-edit-list').modal('hide');
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        ///////////////////////////USERS/////////////////////////////////////
        function getUsers(listid) {
            ls.users(listid, function(response) {
                if(response.success) $scope.users = response.data;
            });
        }

        function addUser($item,$model,$label) {
            ls.addUser($scope.list.ListId, $item.UserId, $item.Typ, function(response) {
                getUsers($scope.list.ListId);
            });
            $scope.searchUser = '';
        }

        function removeUser(listid,userid,typ) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove user access?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            ls.removeUser(listid, userid, typ, function(response) {
                                getUsers(listid);
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function getUsersMenu() {
            mds.users(function(response) {
                $scope.usersmenu = response.data;
            });
        }

        //-------------------------STATUSES---------------------------------//
        function getStatuses(listid) {
            ls.statuses(listid, function(response) {
                $scope.statuses = response.data;
                $scope.list.ListId = listid;
                $scope.list.ListName = $scope.lists.find(x => x.ListId == listid).ListName;
                $scope.listUsersMode = false;
                $scope.listEditMode = true;
            });
        }

        function addStatus(listid, statname, typ) {
            ls.addStatus(listid, statname, typ, function(response) {
                if(response.success) {
                    getStatuses(listid);
                    toastr.success("Status added successfully.");
                    angular.element("#modal-status").modal("hide");
                }
            });
        }

        function updateStatus(listid, statid, statname) {
            ls.updateStatus(listid, statid, statname, function(response) {
                if(response.success) {
                    var ix = $scope.statuses.map(function(e){ return e.StatId }).indexOf(statid);
                    $scope.statuses[ix].StatName = statname;
                    toastr.success("Status updated successfully.");
                    angular.element("#modal-status").modal("hide");
                }
            });
        }

        function removeStatus(listid, statid) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove status?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            ls.removeStatus(listid, statid, function(response) {
                                if(response.success) {
                                    $scope.statuses = $scope.statuses.filter(x => x.StatId != statid);
                                    toastr.success("Status removed successfully.");
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        ///////////////////////////MODALS////////////////////////////////////
        function newFolderModal() {
            $scope.folder.FolderName = '';
            angular.element('#modal-new-folder').modal('show');
        }

        function editFolderModal(folderid) {
            $scope.folder.FolderId = folderid;
            $scope.folder.FolderName = $scope.folders.find(x => x.FolderId == folderid).FolderName;
            angular.element('#modal-edit-folder').modal('show');
        }

        function newListModal() {
            $scope.listEditMode = false;
            $scope.listUsersMode = false;
            $scope.list.ListName = '';
            $scope.list.Type = "TASKS";
            angular.element('#modal-new-list').modal('show');
        }

        function editListModal(listid) {
            $scope.listUsersMode = false;
            $scope.listEditMode = false; 
            $scope.list.ListId = listid;
            $scope.list.ListName = $scope.lists.find(x => x.ListId == listid).ListName;
            angular.element('#modal-edit-list').modal('show');
        }

        function statusModal(statid, type) {            
            $scope.addStatMode = statid == 0 ? true : false;
            $scope.status.StatId = statid;
            $scope.status.Typ = type;
            $scope.status.StatName = statid == 0 ? '' : $scope.statuses.find(x => x.StatId == statid).StatName;
            angular.element('#modal-status').modal('show');
        }
    }
})();