(function () {
    'use strict';

    angular.module('app').controller('DashboardController', Controller);

    Controller.$inject = ['UserService','DashboardService','FolderService', 'ListService', 'TaskService', 'BlueprintService', 'MasterDataService', '$scope', '$filter', '$ngConfirm', 'toastr','$localStorage'];
    function Controller(us, dbs, fs, ls, ts, bps, mds, $scope, $filter, confirm, toastr, storage) {
        //variables
        $scope.empname = storage.currentUser.EmpName;

        //scope variables
        $scope.task = {};
        $scope.blueprint = {};

        //scope functions
        $scope.getfolders = getfolders;
        $scope.getlists = getlists;

        $scope.getTasks = getTasks;
        $scope.addTask = addTask;
        $scope.updateTask = updateTask;
        $scope.removeTask = removeTask;
        $scope.completeTask = completeTask;
        $scope.modalNewTask = modalNewTask;
        $scope.modalEditTask = modalEditTask;

        $scope.getBlueprints = getBlueprints;
        $scope.addBlueprint = addBlueprint;
        $scope.updateBlueprint = updateBlueprint;
        $scope.removeBlueprint = removeBlueprint;
        $scope.completeBlueprint = completeBlueprint;
        $scope.modalNewBlueprint = modalNewBlueprint;
        $scope.modalEditBlueprint = modalEditBlueprint;
        $scope.modalMembers = modalMembers;
        
        //functions
        init();
        function init() {
            getteams();
            getfolders(); 
            getpriorities();
        }

        function getteams() {
            dbs.teams(function(response) {
                console.log(response)
                if(response.success) {
                    $scope.teams = response.data;
                }
            })
        }

        function getlists(folderid) {
            $scope.listmode = true;
            $scope.taskMode = false;
            $scope.folder = $scope.folders.find(x => x.FolderId == folderid);
            dbs.lists(folderid, function(response) {
                $scope.lists = response.data;
            });
        }

        function getfolders() {
            dbs.folders(function(response) {
                if(response.success) {
                    $scope.folders = response.data;
                }
            })
        }


        function getpriorities() {
            mds.priorities(function(response) {
                $scope.task.Prio = 'LOW';
                $scope.priorities = response.data;
            })
        }

        function getmembers(teamid) {
            us.get(teamid, function(response) {
                $scope.members = response.data;
            });
        }

        //------------------------TASKS AND BLUEPRINTS FUNCTIONS---------------------//
        function updateStatus(statid) {
            var isChanged = false;
            $scope.statuses.forEach(e => {
                e.Tasks.forEach(t => {
                    if (t.StatId != e.StatId) {
                        isChanged = true;
                        t.StatId = e.StatId;

                        if(e.StatId == 1) {
                            t.DateStarted = null;
                            t.StartedBy = null;
                            t.DateClosed = null;
                            t.ClosedBy = null;
                        }
                        if(e.Typ == 'OPEN' && e.StatId != 1) {
                            t.DateStarted = $filter('date')(new Date(),'yyyy-MM-dd h:mm a');
                            t.StartedBy = $scope.empname;
                            t.DateClosed = null;
                            t.ClosedBy = null;
                        }
                        if(e.Typ == 'CLOSED' && t.DateClosed == null) {
                            t.DateClosed = $filter('date')(new Date(),'yyyy-MM-dd h:mm a');
                            t.ClosedBy = $scope.empname;
                        }
                        
                        if($scope.list.Type == 'TASKS') updateTask(t);
                        if($scope.list.Type == 'BP') updateBlueprint(t);
                    }
                });
            });
            if(!isChanged && $scope.list.Type == 'TASKS') sort(statid);
            if(!isChanged && $scope.list.Type == 'BP') sortBP(statid);
        }

        function getTasksByStat(list, statuses) {
            //get task from db
            if (list.Type == "TASKS") {
                ts.get(list.ListId, function(response) {
                    if(response.success) {
                        var tasks = response.data;
                        tasks = tasks.map(function(e) {
                           e.DateCreated = $filter('date')(e.DateCreated,'yyyy-MM-dd');
                           if(e.DateStarted != null) e.DateStarted = $filter('date')(e.DateStarted,'yyyy-MM-dd h:mm a');
                           if(e.DateClosed != null) e.DateClosed = $filter('date')(e.DateClosed,'yyyy-MM-dd h:mm a');
                           return e; 
                        });
    
                        //set task per status
                        statuses = statuses.map(function(e) {
                            e.sortOption = createSortableOption();
                            e.Tasks = tasks.filter(x => x.StatId == e.StatId);
                            return e;
                        });
                    }
                });
            } else {
                bps.get(list.ListId, function(response) {
                    if(response.success) {
                        var blueprints = response.data;
                        blueprints = blueprints.map(function(e) {
                           e.DateCreated = $filter('date')(e.DateCreated,'yyyy-MM-dd');
                           if(e.DateStarted != null) e.DateStarted = $filter('date')(e.DateStarted,'yyyy-MM-dd h:mm a');
                           if(e.DateClosed != null) e.DateClosed = $filter('date')(e.DateClosed,'yyyy-MM-dd h:mm a');
                           return e; 
                        });
    
                        //set task per status
                        statuses = statuses.map(function(e) {
                            e.sortOption = createBPSortableOption();
                            e.Tasks = blueprints.filter(x => x.StatId == e.StatId);
                            return e;
                        });
                    }
                });
            }
        }

        //-----------------------------BLUEPRINT FUNCTIONS---------------------------//
        function createBPSortableOption() {
            var sortableOption = {
                'ui-floating': true,
                items: '.card-task',
                // placeholder: 'taskitem',
                connectWith: '.blueprints-container',
                stop: function(e, ui) {
                    var statid = ui.item.parents(".stat-container").data("statid");
                    updateStatus(statid);
                },
            };
            return sortableOption;
        }

        function getBlueprints(listid) {
            $scope.sortableOptions = [];
            $scope.taskMode = true;
            $scope.list = $scope.lists.find(x => x.ListId == listid);

            //get status based on active list
            ls.statuses(listid, function(response) {
                if(response.success) {
                    $scope.statuses = response.data;
                    //get tasks
                    getTasksByStat($scope.list, $scope.statuses);
                }
            })
        }

        function addBlueprint() {
            $scope.blueprint.ListId = $scope.list.ListId;
            bps.add($scope.blueprint, function(response) {
                if(response.success) {
                    toastr.success('New blueprint added.');
                    getBlueprints($scope.list.ListId);
                    angular.element('#modal-new-blueprint').modal('hide');
                    getfolders();
                    getlists($scope.folder.FolderId);
                    $scope.listmode = true;
                    $scope.taskMode = true;
                }
            });
        }

        function updateBlueprint(blueprint) {
            bps.update(blueprint, function(response) {
                if(response.success) {
                    sortBP(blueprint.StatId);
                    toastr.success('Blueprint updated.');
                    angular.element('#modal-edit-blueprint').modal('hide');
                    //update blueprint on status set
                    var ixStat = $scope.statuses.map(function(e) {return e.StatId}).indexOf(blueprint.StatId);
                    var ix = $scope.statuses[ixStat].Tasks.map(function(e) {return e.BPId}).indexOf(blueprint.BPId);
                    $scope.statuses[ixStat].Tasks[ix] = blueprint;
                    getfolders();
                    getlists($scope.folder.FolderId);
                    if(blueprint.StatId == 1) {
                        blueprint.DateStarted = null;
                        blueprint.StartedBy = null;
                        blueprint.DateClosed = null;
                        blueprint.ClosedBy = null;
                    }
                    if($scope.statuses[ixStat].Typ == 'CLOSED') {
                        // blueprint.DateClosed = null;
                        // blueprint.ClosedBy = null;
                        var dateclosed = $filter('date')(new Date(),'yyyy-MM-dd h:mm a');
                        console.log(dateclosed)
                    }
                    $scope.listmode = true;
                    $scope.taskMode = true;
                }
            });
        }

        function removeBlueprint(blueprint) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove blueprint?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            bps.remove(blueprint.BPId, function(response) {
                                if(response.success) {
                                    toastr.success('Blueprint removed.');
                                    angular.element('#modal-edit-blueprint').modal('hide');
                                    getfolders();
                                    getlists($scope.folder.FolderId);
                                    $scope.listmode = true;
                                    $scope.taskMode = true;
                                    var ix = $scope.statuses.map(function(e){return e.StatId}).indexOf(blueprint.StatId);
                                    $scope.statuses[ix].Tasks = $scope.statuses[ix].Tasks.filter(x => x.BPId != blueprint.BPId);
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function completeBlueprint(blueprint) {
            confirm({   
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Mark task as complete?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-green',
                        action: function() {
                            blueprint.Completed = true;
                            bps.update(blueprint, function(response) {
                                if(response.success) {
                                    toastr.success('Congratulations for a blueprint completed!');
                                    angular.element('#modal-edit-blueprint').modal('hide');
                                    getfolders();
                                    getlists($scope.folder.FolderId);
                                    $scope.listmode = true;
                                    $scope.taskMode = true;
                                    var ix = $scope.statuses.map(function(e){return e.StatId}).indexOf(blueprint.StatId);
                                    $scope.statuses[ix].Tasks = $scope.statuses[ix].Tasks.filter(x => x.BPId != blueprint.BPId);
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function sortBP(statid) {
            var bpids = $scope.statuses.find(x => x.StatId==statid).Tasks.map(x => x.BPId);
            bps.sort(bpids,function(response){
                console.log("Sorting successfully saved.")
            });
        }

        //-----------------------------TASK FUNCTIONS---------------------------//
        function getTasks(listid) {
            $scope.sortableOptions = [];
            $scope.taskMode = true;
            $scope.list = $scope.lists.find(x => x.ListId == listid);

            //get status based on active list
            ls.statuses(listid, function(response) {
                if(response.success) {
                    $scope.statuses = response.data;
                    //get tasks
                    getTasksByStat($scope.list, $scope.statuses);
                }
            })
        }

        function addTask() {
            $scope.task.ListId = $scope.list.ListId;
            ts.add($scope.task, function(response) {
                if(response.success) {
                    toastr.success('New task added.');
                    getTasks($scope.list.ListId);
                    angular.element('#modal-new-task').modal('hide');
                    getfolders();
                    getlists($scope.folder.FolderId);
                    $scope.listmode = true;
                    $scope.taskMode = true;
                    // $scope.statuses.Tasks.push($scope.task);
                }
            });
        }

        function updateTask(task) {
            ts.update(task, function(response) {
                if(response.success) {
                    sort(task.StatId);
                    toastr.success('Task updated.');
                    angular.element('#modal-edit-task').modal('hide');
                    //update task on status set
                    var ixStat = $scope.statuses.map(function(e) {return e.StatId}).indexOf(task.StatId);
                    var ix = $scope.statuses[ixStat].Tasks.map(function(e) {return e.TaskId}).indexOf(task.TaskId);

                    $scope.statuses[ixStat].Tasks[ix] = task;
                    getfolders();
                    getlists($scope.folder.FolderId);
                    $scope.listmode = true;
                    $scope.taskMode = true;
                }
            });
        }

        function removeTask(task) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Remove task?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-red',
                        action: function() {
                            ts.remove(task.TaskId, function(response) {
                                if(response.success) {
                                    toastr.success('Task removed.');
                                    angular.element('#modal-edit-task').modal('hide');
                                    getfolders();
                                    getlists($scope.folder.FolderId);
                                    $scope.listmode = true;
                                    $scope.taskMode = true;
                                    var ix = $scope.statuses.map(function(e){return e.StatId}).indexOf(task.StatId);
                                    $scope.statuses[ix].Tasks = $scope.statuses[ix].Tasks.filter(x => x.TaskId != taskid);
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function completeTask(task) {
            confirm({
                theme: 'material',
                icon: 'fa fa-question-circle',
                closeIcon: true,
                title: 'Confirmation',
                content: 'Mark task as complete?',
                escapeKey: 'close',
                buttons: {
                    confirm: {
                        keys: ['enter'],
                        btnClass: 'btn-green',
                        action: function() {
                            task.Completed = true;
                            ts.update(task, function(response) {
                                if(response.success) {
                                    toastr.success('Congratulations for a task completed!');
                                    angular.element('#modal-edit-task').modal('hide');
                                    getfolders();
                                    getlists($scope.folder.FolderId);
                                    $scope.listmode = true;
                                    $scope.taskMode = true;
                                    var ix = $scope.statuses.map(function(e){return e.StatId}).indexOf(task.StatId);
                                    $scope.statuses[ix].Tasks = $scope.statuses[ix].Tasks.filter(x => x.TaskId != task.TaskId);
                                }
                            });
                        }
                    },
                    close: function() {}
                }
            });
        }

        function sort(statid) {
            var taskids = $scope.statuses.find(x => x.StatId==statid).Tasks.map(x => x.TaskId);
            ts.sort(taskids,function(response){
                console.log("Sorting successfully saved.")
            });
        }

        // function getTasksByStat(listid, statuses) {
        //     //get task from db
        //     ts.get(listid, function(response) {
        //         if(response.success) {
        //             var tasks = response.data;
        //             tasks = tasks.map(function(e) {
        //                e.DateCreated = $filter('date')(e.DateCreated,'yyyy-MM-dd');
        //                return e; 
        //             });

        //             //set task per status
        //             statuses = statuses.map(function(e) {
        //                 e.sortOption = createSortableOption();
        //                 e.Tasks = tasks.filter(x => x.StatId == e.StatId);
        //                 return e;
        //             });
        //         }
        //     });
        // }

        function createSortableOption() {
            var sortableOption = {
                'ui-floating': true,
                items: '.card-task',
                // placeholder: 'taskitem',
                connectWith: '.tasks-container',
                stop: function(e, ui) {
                    var statid = ui.item.parents(".stat-container").data("statid");
                    updateStatus(statid);
                },
            };
            return sortableOption;
        }
        //------------------------------MODALS-----------------------------------//
        function modalMembers(teamid) {
            getmembers(teamid);
            $scope.teamname = $scope.teams.find(x => x.TeamId == teamid).TeamName;
            angular.element("#modal-members").modal("show");
        }

        function modalNewBlueprint() {
            $scope.blueprint = {};
            $scope.blueprint.Prio = 'LOW';
            angular.element("#modal-new-blueprint").modal("show");
        }

        function modalEditBlueprint(blueprint) {
            $scope.showCompleteBtn = $scope.statuses.find(x => x.StatId == blueprint.StatId).Typ == 'CLOSED';
            $scope.blueprint = angular.copy(blueprint);
            if($scope.blueprint.DateDue != null) $scope.blueprint.DateDue = new Date($filter('date')($scope.blueprint.DateDue,'yyyy-MM-dd'));
            if($scope.blueprint.DateSubmitted != null) $scope.blueprint.DateSubmitted = new Date($filter('date')($scope.blueprint.DateSubmitted,'yyyy-MM-dd'));
            angular.element("#modal-edit-blueprint").modal("show");
        }

        function modalNewTask() {
            $scope.task = {};
            $scope.task.Prio = 'LOW';
            angular.element("#modal-new-task").modal("show");
        }

        function modalEditTask(task) {
            $scope.showCompleteBtn = $scope.statuses.find(x => x.StatId == task.StatId).Typ == 'CLOSED';
            $scope.task = angular.copy(task);
            if($scope.task.DateDue != null) $scope.task.DateDue = new Date($filter('date')($scope.task.DateDue,'yyyy-MM-dd'));
            angular.element("#modal-edit-task").modal("show");
        }
    }
})();